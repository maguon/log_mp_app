import httpRequest from '../../../util/HttpRequest'
import * as reduxActionTypes from '../../../reduxActionTypes'
import * as reduxActions from '../../../reduxActions'
import { ToastAndroid } from 'react-native'

export const receiveAddressInfo = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.recAddrEditorForNotPrice.save_recAddrForNotPrice_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order/${req.orderId}/receiveInfo`
        const res = await httpRequest.put(url, {
            recvName: req.receiver,
            recvPhone: req.receivePhone,
            recvAddress: req.receiveAddress
        })
        if (res.success) {
            dispatch(reduxActions.orderListNotPrice.getOrderNotPriceById({ orderId: req.orderId }))
            dispatch({ type: reduxActionTypes.recAddrEditorForNotPrice.save_recAddrForNotPrice_success, payload: {} })
            ToastAndroid.show('保存成功！', 10)
        } else {
            dispatch({ type: reduxActionTypes.recAddrEditorForNotPrice.save_recAddrForNotPrice_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.recAddrEditorForNotPrice.save_recAddrForNotPrice_error, payload: { errorMsg: `${err}` } })
    }
}