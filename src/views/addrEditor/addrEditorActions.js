import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'
import * as reduxActions from '../../reduxActions'
import { ToastAndroid } from 'react-native'


export const saveSendAddr = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.addrEditor.save_sendAddr_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order/${req.orderId}/sendInfo`
        const res = await httpRequest.put(url, {
            sendName: req.sender,
            sendPhone: req.sendPhone,
            sendAddress: req.sendAddress
        })
        if (res.success) {
            const orderUrl = `${base_host}/admin/${id}/order?orderId=${req.orderId}`
            const orderRes = await httpRequest.get(orderUrl)
            if (orderRes.success) {
                // console.log('req', req)
                if (req.sceneName == 'notInfo') {
                    dispatch({ type: reduxActionTypes.orderListNotInfo.set_orderForNotInfo, payload: { order: orderRes.result[0] } })
                    dispatch({ type: reduxActionTypes.order.init_order, payload: { order: orderRes.result[0] } })
                } else if (req.sceneName == 'notDemand') {
                    dispatch({ type: reduxActionTypes.orderListNotDemand.set_orderForNotDemand, payload: { order: orderRes.result[0] } })
                    dispatch({ type: reduxActionTypes.order.init_order, payload: { order: orderRes.result[0] } })
                } else if (req.sceneName == 'notPrice') {
                    dispatch({ type: reduxActionTypes.orderListNotPrice.set_orderForNotPrice, payload: { order: orderRes.result[0] } })
                    dispatch({ type: reduxActionTypes.order.init_order, payload: { order: orderRes.result[0] } })
                }
                dispatch({ type: reduxActionTypes.addrEditor.save_sendAddr_success, payload: { order: orderRes.result[0] } })
                ToastAndroid.show('保存成功！', 10)
            } else {
                dispatch({ type: reduxActionTypes.addrEditor.save_sendAddr_failed, payload: { failedMsg: `${orderRes.msg}` } })
            }
        } else {
            dispatch({ type: reduxActionTypes.addrEditor.save_sendAddr_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.addrEditor.save_sendAddr_error, payload: { errorMsg: `${err}` } })
    }
}


export const saveRecAddr = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.addrEditor.save_recAddr_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order/${req.orderId}/receiveInfo`
        const res = await httpRequest.put(url, {
            recvName: req.receiver,
            recvPhone: req.receivePhone,
            recvAddress: req.receiveAddress
        })
        if (res.success) {
            const orderUrl = `${base_host}/admin/${id}/order?orderId=${req.orderId}`
            const orderRes = await httpRequest.get(orderUrl)
            if (orderRes.success) {
                // console.log('req', req)
                if (req.sceneName == 'notInfo') {
                    dispatch({ type: reduxActionTypes.orderListNotInfo.set_orderForNotInfo, payload: { order: orderRes.result[0] } })
                    dispatch({ type: reduxActionTypes.order.init_order, payload: { order: orderRes.result[0] } })
                } else if (req.sceneName == 'notDemand') {
                    dispatch({ type: reduxActionTypes.orderListNotDemand.set_orderForNotDemand, payload: { order: orderRes.result[0] } })
                    dispatch({ type: reduxActionTypes.order.init_order, payload: { order: orderRes.result[0] } })
                } else if (req.sceneName == 'notPrice') {
                    dispatch({ type: reduxActionTypes.orderListNotPrice.set_orderForNotPrice, payload: { order: orderRes.result[0] } })
                    dispatch({ type: reduxActionTypes.order.init_order, payload: { order: orderRes.result[0] } })
                }
                dispatch({ type: reduxActionTypes.addrEditor.save_recAddr_success, payload: { order: orderRes.result[0] } })
                ToastAndroid.show('保存成功！', 10)
            } else {
                dispatch({ type: reduxActionTypes.addrEditor.save_recAddr_failed, payload: { failedMsg: `${orderRes.msg}` } })
            }
        } else {
            dispatch({ type: reduxActionTypes.addrEditor.save_recAddr_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.addrEditor.save_recAddr_error, payload: { errorMsg: `${err}` } })
    }
}


export const setOrder = req => (dispatch) => {
    dispatch({ type: reduxActionTypes.addrEditor.set_orderForAddrEditor, payload: { order: req.order } })
}