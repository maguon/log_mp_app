import httpRequest from '../../../util/HttpRequest'
import * as reduxActionTypes from '../../../reduxActionTypes'
import { sleep, ObjectToUrl } from '../../../util/util'
import { ToastAndroid, InteractionManager } from 'react-native'
import { Actions } from 'react-native-router-flux'

const pageSize = 20

export const getOrderListNotPrice = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order${ObjectToUrl({
            status: 1,
            start: 0,
            size: pageSize
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: reduxActionTypes.orderListNotPrice.get_orderListNotPrice_success, payload: {
                    orderListNotPrice: res.result,
                    isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: reduxActionTypes.orderListNotPrice.get_orderListNotPrice_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.orderListNotPrice.get_orderListNotPrice_error, payload: { errorMsg: `${err}` } })
    }
}

export const getOrderListNotPriceWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.orderListNotPrice.get_orderListNotPrice_waiting, payload: {} })
}

export const getOrderListNotPriceMore = () => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } },
        loginReducer: { data: { user: { id } } },
        orderListNotPriceReducer: { data: { orderListNotPrice, isCompleted } },
        orderListNotPriceReducer } = getState()
    if (orderListNotPriceReducer.getOrderListNotPriceMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getOrderListNotPriceMore)
    } else {
        if (!isCompleted) {
            dispatch({ type: reduxActionTypes.orderListNotPrice.get_orderListNotPriceMore_waiting, payload: {} })
            try {
                const url = `${base_host}/admin/${id}/order${ObjectToUrl({
                    status: 1,
                    start: orderListNotPrice.length,
                    size: pageSize
                })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    dispatch({
                        type: reduxActionTypes.orderListNotPrice.get_orderListNotPriceMore_success, payload: {
                            orderListNotPrice: res.result,
                            isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0),
                        }
                    })
                } else {
                    dispatch({ type: reduxActionTypes.orderListNotPrice.get_orderListNotPriceMore_failed, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                dispatch({ type: reduxActionTypes.orderListNotPrice.get_orderListNotPriceMore_error, payload: { errorMsg: `${err}` } })
            }
        }
    }
}

export const getOrderNotPriceById = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order?orderId=${req.orderId}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.orderListNotPrice.get_orderNotPriceById_success, payload: { order: res.result[0] } })

        } else {
            dispatch({ type: reduxActionTypes.orderListNotPrice.get_orderNotPriceById_failed, payload: { errorMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.orderListNotPrice.get_orderNotPriceById_error, payload: { errorMsg: `${err}` } })
    }
}

export const cancelOrder = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.orderListNotPrice.put_orderCancelNotPriceById_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order/${req.orderId}/cancel`
        const res = await httpRequest.put(url, {})
        if (res.success) {
            Actions.pop()
            InteractionManager.runAfterInteractions(() => dispatch({ type: reduxActionTypes.orderListNotPrice.put_orderCancelNotPriceById_success, payload: { orderId: req.orderId } }))
        } else {
            dispatch({ type: reduxActionTypes.orderListNotPrice.put_orderCancelNotPriceById_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.orderListNotPrice.put_orderCancelNotPriceById_error, payload: { errorMsg: `${err}` } })
    }
}

export const saveOrderRemark = req => async (dispatch, getstate) => {
    try {
        dispatch({ type: reduxActionTypes.orderListNotPrice.put_orderRemarkForNotPrice_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getstate()
        const url = `${base_host}/admin/${id}/order/${req.orderId}/adminMark`
        const res = await httpRequest.put(url, {
            adminMark: req.formValues.remark ? req.formValues.remark : ''
        })
        if (res.success) {
            dispatch({
                type: reduxActionTypes.orderListNotPrice.put_orderRemarkForNotPrice_success, payload: {
                    orderId: req.orderId,
                    remark: req.formValues.remark
                }
            })
            ToastAndroid.show('修改成功！', 10)
        } else {
            dispatch({ type: reduxActionTypes.orderListNotPrice.put_orderRemarkForNotPrice_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.orderListNotPrice.put_orderRemarkForNotPrice_error, payload: { errorMsg: `${err}` } })
    }
}