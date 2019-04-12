import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'
import * as reduxActions from '../../reduxActions'
import { ToastAndroid } from 'react-native'


export const saveSendAddressInfo = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.sendAddressInfoEditor.save_sendAddressInfo_waiting, payload: {} })

        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order/${req.orderId}/sendInfo`
        const res = await httpRequest.put(url, {
            sendName: req.sender,
            sendPhone: req.sendPhone,
            sendAddress: req.sendAddress
        })
        if (res.success) {
            dispatch(reduxActions.orderListNotInfo.getOrderNotInfoById({ orderId: req.orderId }))
            dispatch({ type: reduxActionTypes.sendAddressInfoEditor.save_sendAddressInfo_success, payload: {} })
            ToastAndroid.show('保存成功！', 10)
        } else {
            dispatch({ type: reduxActionTypes.sendAddressInfoEditor.save_sendAddressInfo_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.sendAddressInfoEditor.save_sendAddressInfo_error, payload: { errorMsg: `${err}` } })
    }
}