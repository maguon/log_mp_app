import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'
import { objectExceptNull } from '../../util/util'
import { ToastAndroid } from 'react-native'

export const savePickUpAddr = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.pickUpAddrEditor.save_pickUpAddr_waiting })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } },
            pickUpAddrEditorReducer: { data: { order } } } = getState()
        const url = `${base_host}/admin/${id}/order/${order.id}/selfMentionAddress`
        const res = await httpRequest.put(url, objectExceptNull({
            sendAddressPointId: req.values.sendAddressPoint.id,
            sendAddressPoint: req.values.sendAddressPoint.value,
            recvAddressPointId: req.values.recvAddressPoint.id,
            recvAddressPoint: req.values.recvAddressPoint.value
        }))
        if (res.success) {
            const orderUrl = `${base_host}/admin/${id}/order?orderId=${order.id}`
            const orderRes = await httpRequest.get(orderUrl)
            if (orderRes.success) {
                dispatch({ type: reduxActionTypes.pickUpAddrEditor.save_pickUpAddr_success, payload: { order: orderRes.result[0] } })
                dispatch({ type: reduxActionTypes.orderInfo.set_orderInfo, payload: { order: orderRes.result[0] } })
                dispatch({ type: reduxActionTypes.orderList.set_orderForOrderList, payload: { order: orderRes.result[0] } })
                ToastAndroid.show('保存成功！', 10)
            } else {
                dispatch({ type: reduxActionTypes.pickUpAddrEditor.save_pickUpAddr_failed, payload: { failedMsg: `${orderRes.msg}` } })
            }
        } else {
            dispatch({ type: reduxActionTypes.pickUpAddrEditor.save_pickUpAddr_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.pickUpAddrEditor.save_pickUpAddr_error, payload: { errorMsg: `${err}` } })
    }
}

export const setOrderForpickUpAddr = req => (dispatch) => {
    dispatch({ type: reduxActionTypes.pickUpAddrEditor.set_orderForPickUpAddr, payload: { order: req.order } })
}