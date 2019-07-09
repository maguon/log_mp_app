import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'
import * as reduxActions from '../../reduxActions'
import { ToastAndroid } from 'react-native'


export const saveSendAddr = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.sendAddrEditorForNotDemand.save_sendAddrForNotDemand_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order/${req.orderId}/sendInfo`
        const res = await httpRequest.put(url, {
            sendName: req.sender,
            sendPhone: req.sendPhone,
            sendAddress: req.sendAddress
        })
        if (res.success) {
            // dispatch(reduxActions.orderListNotDemand.getOrderNotDemandById({ orderId: req.orderId }))
            dispatch({ type: reduxActionTypes.sendAddrEditorForNotDemand.save_sendAddrForNotDemand_success, payload: {} })
            ToastAndroid.show('保存成功！', 10)
        } else {
            dispatch({ type: reduxActionTypes.sendAddrEditorForNotDemand.save_sendAddrForNotDemand_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.sendAddrEditorForNotDemand.save_sendAddrForNotDemand_error, payload: { errorMsg: `${err}` } })
    }
}


export const receiveAddressInfo = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.recAddrEditorForNotDemand.save_recAddrForNotDemand_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order/${req.orderId}/receiveInfo`
        const res = await httpRequest.put(url, {
            recvName: req.receiver,
            recvPhone: req.receivePhone,
            recvAddress: req.receiveAddress
        })
        if (res.success) {
            // dispatch(reduxActions.orderListNotDemand.getOrderNotDemandById({ orderId: req.orderId }))
            dispatch({ type: reduxActionTypes.recAddrEditorForNotDemand.save_recAddrForNotDemand_success, payload: {} })
            ToastAndroid.show('保存成功！', 10)
        } else {
            dispatch({ type: reduxActionTypes.recAddrEditorForNotDemand.save_recAddrForNotDemand_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.recAddrEditorForNotDemand.save_recAddrForNotDemand_error, payload: { errorMsg: `${err}` } })
    }
}