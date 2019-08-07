import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'
import { ToastAndroid } from 'react-native'

export const setRequireTaskInfo = param => (dispatch) => {
    dispatch({ type: reduxActionTypes.requireTaskInfo.set_requireTaskInfo, payload: { requireTaskInfo: param } })
}

export const getOrder = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order?orderId=${req.orderId}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.requireTaskInfo.get_orderForRequireTaskInfo_success, payload: { order: res.result[0] } })
        } else {
            dispatch({ type: reduxActionTypes.requireTaskInfo.get_orderForRequireTaskInfo_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.requireTaskInfo.get_orderForRequireTaskInfo_error, payload: { errorMsg: `${err}` } })
    }
}

export const getOrderWaiting = req => (dispatch) => {
    dispatch({ type: reduxActionTypes.requireTaskInfo.get_orderForRequireTaskInfo_waiting })
}

export const finishRequire = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.requireTaskInfo.finish_require_waiting })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/requireTask/${req.requireId}/status/${req.status}`
        const res = await httpRequest.put(url, {})
        if (res.success) {
            const requireUrl = `${base_host}/admin/${id}/requireTask?requireId=${req.requireId}`
            const requireRes = await httpRequest.get(requireUrl)
            if (requireRes.success) {
                const orderUrl = `${base_host}/admin/${id}/order?orderId=${req.orderId}`
                const orderRes = await httpRequest.get(orderUrl)
                if(orderRes.success){
                    dispatch({ type: reduxActionTypes.requireTaskInfo.finish_require_success, payload: { requireTaskInfo: requireRes.result[0] } })
                    dispatch({ type: reduxActionTypes.requireTaskList.set_requireTaskInfoForList, payload: { requireTaskInfo: requireRes.result[0] } })
                    dispatch({ type: reduxActionTypes.orderInfo.get_requireTaskInfoForOrderInfo_success, payload: { requireTaskInfo: requireRes.result[0] } })
                    dispatch({ type: reduxActionTypes.orderInfo.set_orderInfo, payload: { order: orderRes.result[0] } })
                    dispatch({ type: reduxActionTypes.orderList.set_orderForOrderList, payload: { order: orderRes.result[0] } })
                }else{
                    ToastAndroid.show(`${orderRes.msg}`, 15)
                    dispatch({ type: reduxActionTypes.requireTaskInfo.finish_require_failed, payload: { failedMsg: `${orderRes.msg}` } })
                }
            } else {
                ToastAndroid.show(`${requireRes.msg}`, 15)
                dispatch({ type: reduxActionTypes.requireTaskInfo.finish_require_failed, payload: { failedMsg: `${requireRes.msg}` } })
            }
        } else {
            ToastAndroid.show(`${res.msg}`, 15)
            dispatch({ type: reduxActionTypes.requireTaskInfo.finish_require_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.requireTaskInfo.finish_require_error, payload: { errorMsg: `${err}` } })
    }
}