import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'
import * as reduxActions from '../../reduxActions'
import { ToastAndroid } from 'react-native'

export const receiveSendAddressInfo = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.receiveAddressInfoEditor.save_receiveAddressInfo_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order/${req.orderId}/receiveInfo`
        const res = await httpRequest.put(url, {
            recvName: req.receiver,
            recvPhone: req.receivePhone,
            recvAddress: req.receiveAddress
        })
        if (res.success) {
            dispatch(reduxActions.orderListNotInfo.getOrderNotInfoById({ orderId: req.orderId }))
            dispatch({ type: reduxActionTypes.receiveAddressInfoEditor.save_receiveAddressInfo_success, payload: {} })
            ToastAndroid.show('保存成功！', 10)
        } else {
            dispatch({ type: reduxActionTypes.receiveAddressInfoEditor.save_receiveAddressInfo_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.receiveAddressInfoEditor.save_receiveAddressInfo_error, payload: { errorMsg: `${err}` } })
    }
}