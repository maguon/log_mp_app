import httpRequest from '../../../util/HttpRequest'
import * as reduxActionTypes from '../../../reduxActionTypes'
import { sleep, ObjectToUrl } from '../../../util/util'
import { ToastAndroid,InteractionManager } from 'react-native'
import { Actions } from 'react-native-router-flux'

const pageSize = 20

export const getOrderListNotDemand = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order${ObjectToUrl({
            status: 2,
            start: 0,
            size: pageSize
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: reduxActionTypes.orderListNotDemand.get_orderListNotDemand_success, payload: {
                    orderListNotDemand: res.result,
                    isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: reduxActionTypes.orderListNotDemand.get_orderListNotDemand_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.orderListNotDemand.get_orderListNotDemand_error, payload: { errorMsg: `${err}` } })
    }
}

export const getOrderListNotDemandWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.orderListNotDemand.get_orderListNotDemand_waiting, payload: {} })
}

export const getOrderListNotDemandMore = () => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } },
        loginReducer: { data: { user: { id } } },
        orderListNotDemandReducer: { data: { orderListNotDemand, isCompleted } },
        orderListNotDemandReducer } = getState()
    if (orderListNotDemandReducer.getOrderListNotDemandMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getOrderListNotDemandMore)
    } else {
        if (!isCompleted) {
            dispatch({ type: reduxActionTypes.orderListNotDemand.get_orderListNotDemandMore_waiting, payload: {} })
            try {
                const url = `${base_host}/admin/${id}/order${ObjectToUrl({
                    status: 2,
                    start: orderListNotDemand.length,
                    size: pageSize
                })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    dispatch({
                        type: reduxActionTypes.orderListNotDemand.get_orderListNotDemandMore_success, payload: {
                            orderListNotDemand: res.result,
                            isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0),
                        }
                    })
                } else {
                    dispatch({ type: reduxActionTypes.orderListNotDemand.get_orderListNotDemandMore_failed, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                dispatch({ type: reduxActionTypes.orderListNotDemand.get_orderListNotDemandMore_error, payload: { errorMsg: `${err}` } })
            }
        }
    }
}

export const getOrderNotDemandById = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order?orderId=${req.orderId}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.orderListNotDemand.get_orderNotDemandById_success, payload: { order: res.result[0] } })

        } else {
            dispatch({ type: reduxActionTypes.orderListNotDemand.get_orderNotDemandById_failed, payload: { errorMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.orderListNotDemand.get_orderNotDemandById_error, payload: { errorMsg: `${err}` } })
    }
}

export const cancelOrder = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.orderListNotDemand.put_orderCancelNotDemandById_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order/${req.orderId}/cancel`
        const res = await httpRequest.put(url, {})
        if (res.success) {
            Actions.pop()
            InteractionManager.runAfterInteractions(() => dispatch({ type: reduxActionTypes.orderListNotDemand.put_orderCancelNotDemandById_success, payload: { orderId: req.orderId } }))
        } else {
            dispatch({ type: reduxActionTypes.orderListNotDemand.put_orderCancelNotDemandById_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.orderListNotDemand.put_orderCancelNotDemandById_error, payload: { errorMsg: `${err}` } })
    }
}

export const saveOrderRemark = req => async (dispatch, getstate) => {
    try {
        dispatch({ type: reduxActionTypes.orderListNotDemand.put_orderRemarkForNotDemand_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getstate()
        const url = `${base_host}/admin/${id}/order/${req.orderId}/adminMark`
        const res = await httpRequest.put(url, {
            adminMark: req.formValues.remark ? req.formValues.remark : ''
        })
        if (res.success) {
            dispatch({
                type: reduxActionTypes.orderListNotDemand.put_orderRemarkForNotDemand_success, payload: {
                    orderId: req.orderId,
                    remark: req.formValues.remark
                }
            })
            ToastAndroid.show('修改成功！', 10)
        } else {
            dispatch({ type: reduxActionTypes.orderListNotDemand.put_orderRemarkForNotDemand_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.orderListNotDemand.put_orderRemarkForNotDemand_error, payload: { errorMsg: `${err}` } })
    }
}