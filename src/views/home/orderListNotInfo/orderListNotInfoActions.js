import httpRequest from '../../../util/HttpRequest'
import * as reduxActionTypes from '../../../reduxActionTypes'
import { sleep, ObjectToUrl } from '../../../util/util'
import { Actions } from 'react-native-router-flux'
import { InteractionManager, ToastAndroid } from 'react-native'

const pageSize = 20

export const getOrderListNotInfo = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order${ObjectToUrl({
            status: 0,
            start: 0,
            size: pageSize
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: reduxActionTypes.orderListNotInfo.get_orderListNotInfo_success, payload: {
                    orderListNotInfo: res.result,
                    isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: reduxActionTypes.orderListNotInfo.get_orderListNotInfo_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.orderListNotInfo.get_orderListNotInfo_error, payload: { errorMsg: `${err}` } })
    }
}

export const getOrderListNotInfoWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.orderListNotInfo.get_orderListNotInfo_waiting, payload: {} })
}

export const getOrderListNotInfoMore = () => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } },
        loginReducer: { data: { user: { id } } },
        orderListNotInfoReducer: { data: { orderListNotInfo, isCompleted } },
        orderListNotInfoReducer } = getState()
    if (orderListNotInfoReducer.getOrderListNotInfoMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getOrderListNotInfoMore)
    } else {
        if (!isCompleted) {
            dispatch({ type: reduxActionTypes.orderListNotInfo.get_orderListNotInfoMore_waiting, payload: {} })
            try {
                const url = `${base_host}/admin/${id}/order${ObjectToUrl({
                    status: 0,
                    start: orderListNotInfo.length,
                    size: pageSize
                })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    dispatch({
                        type: reduxActionTypes.orderListNotInfo.get_orderListNotInfoMore_success, payload: {
                            orderListNotInfo: res.result,
                            isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0),
                        }
                    })
                } else {
                    dispatch({ type: reduxActionTypes.orderListNotInfo.get_orderListNotInfoMore_failed, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                dispatch({ type: reduxActionTypes.orderListNotInfo.get_orderListNotInfoMore_error, payload: { errorMsg: `${err}` } })
            }
        }
    }
}

export const getOrderNotInfoById = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order?orderId=${req.orderId}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.orderListNotInfo.get_orderNotInfoById_success, payload: { order: res.result[0] } })

        } else {
            dispatch({ type: reduxActionTypes.orderListNotInfo.get_orderNotInfoById_failed, payload: { errorMsg: `${res.msg}` } })

        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.orderListNotInfo.get_orderNotInfoById_error, payload: { errorMsg: `${err}` } })
    }
}


export const changeOrderStatus = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.orderListNotInfo.change_orderStatusForNotInfo_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getstate()
        const url = `${base_host}/admin/${id}/order/${req.orderId}/status/0`
        const res = await httpRequest.put(url, {})
        if (res.success) {

        } else {
            dispatch({ type: reduxActionTypes.orderListNotInfo.change_orderStatusForNotInfo_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.orderListNotInfo.change_orderStatusForNotInfo_error, payload: { errorMsg: `${err}` } })
    }
}
