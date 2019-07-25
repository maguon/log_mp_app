import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'
import * as reduxActions from '../../reduxActions'
import { ToastAndroid, InteractionManager } from 'react-native'
import { Actions } from 'react-native-router-flux'


export const getOrder = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order?orderId=${req.orderId}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.order.get_order_success, payload: { order: res.result[0] } })
            const { status } = res.result[0]
            if (status == 0) {
                //更新orderListForNotInfo
            }
            else if (status == 1) {
                //更新orderListForNotPrice
            } else if (status == 2) {
                //更新orderListForNotDemand
            } else if (status == 3) {
                //更新orderListForNotRoute
            }

        } else {
            dispatch({ type: reduxActionTypes.order.get_order_failed, payload: { failedMsg: `${res, msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.order.get_order_error, payload: { errorMsg: `${err}` } })
    }
}

export const getOrderWating = req => (dispatch) => {
    dispatch({ type: reduxActionTypes.order.get_order_waiting })
}

export const initOrder = req => (dispatch) => {
    const { order } = req
    dispatch({ type: reduxActionTypes.order.init_order, payload: { order } })

}


export const cancelOrder = req => async (dispatch, getState) => {
    try {
        const { order } = req
        dispatch({ type: reduxActionTypes.order.cancel_order_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order/${order.id}/cancel`
        const res = await httpRequest.put(url, {})
        if (res.success) {
            if (order.status == 0) {
                dispatch({ type: reduxActionTypes.orderListNotInfo.remove_orderForNotInfo, payload: { order } })
            } else if (order.status == 1) {
                dispatch({ type: reduxActionTypes.orderListNotPrice.remove_orderForNotPrice, payload: { order } })
            } else if (order.status == 2) {
                dispatch({ type: reduxActionTypes.orderListNotDemand.remove_orderForNotDemand, payload: { order } })
            } else if (order.status == 3) {
                dispatch({ type: reduxActionTypes.orderListNotRoute.remove_orderForNotRoute, payload: { order } })
            }
            dispatch({ type: reduxActionTypes.order.cancel_order_success, payload: { orderId: req.orderId } })
            Actions.pop()
        } else {
            dispatch({ type: reduxActionTypes.order.cancel_order_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.order.cancel_order_error, payload: { errorMsg: `${err}` } })
    }
}


export const modifyOrderRemark = req => async (dispatch, getstate) => {
    try {
        const { order } = req
        dispatch({ type: reduxActionTypes.order.modify_orderRemark_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getstate()
        const url = `${base_host}/admin/${id}/order/${order.id}/adminMark`
        const res = await httpRequest.put(url, {
            adminMark: req.formValues.remark ? req.formValues.remark : ''
        })
        if (res.success) {
            dispatch({ type: reduxActionTypes.order.modify_orderRemark_success, payload: { orderId: order.id, remark: req.formValues.remark } })
            if (order.status == 0) {
                dispatch({ type: reduxActionTypes.orderListNotInfo.modify_orderRemarkForNotInfo, payload: { orderId: order.id, remark: req.formValues.remark } })
            } else if (order.status == 1) {
                dispatch({ type: reduxActionTypes.orderListNotPrice.modify_orderRemarkForNotPrice, payload: { orderId: order.id, remark: req.formValues.remark } })
            } else if (order.status == 2) {
                dispatch({ type: reduxActionTypes.orderListNotDemand.modify_orderRemarkForNotDemand, payload: { orderId: order.id, remark: req.formValues.remark } })
            } else if (order.status == 3) {
                dispatch({ type: reduxActionTypes.orderListNotRoute.modify_orderRemarkForNotRoute, payload: { orderId: order.id, remark: req.formValues.remark } })
            }

            ToastAndroid.show('修改成功！', 10)
        } else {
            dispatch({ type: reduxActionTypes.order.modify_orderRemark_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.order.modify_orderRemark_error, payload: { errorMsg: `${err}` } })
    }
}


export const changeOrderStatus = req => async (dispatch, getState) => {
    try {
        const { order, targetStatus } = req
        dispatch({ type: reduxActionTypes.order.cancel_order_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order/${order.id}/status/${targetStatus}`
        const res = await httpRequest.put(url, {})
        if (res.success) {
            const orderUrl = `${base_host}/admin/${id}/order?orderId=${order.id}`
            const orderRes = await httpRequest.get(orderUrl)
            if (orderRes.success) {
                dispatch({ type: reduxActionTypes.order.init_order, payload: { order: orderRes.result[0] } })
                if (targetStatus == 0) {
                    dispatch({ type: reduxActionTypes.orderListNotInfo.set_orderForNotInfo, payload: { order: orderRes.result[0] } })
                } else if (targetStatus == 1) {
                    dispatch({ type: reduxActionTypes.orderListNotPrice.set_orderForNotPrice, payload: { order: orderRes.result[0] } })
                } else if (targetStatus == 2) {
                    dispatch({ type: reduxActionTypes.orderListNotDemand.set_orderForNotDemand, payload: { order: orderRes.result[0] } })
                }

                // else if (targetStatus == 3) {
                //     dispatch({ type: reduxActionTypes.orderListNotRoute.set_orderForNotRoute, payload: { order: orderRes.result[0] } })
                // }

                if (order.status == 0) {
                    dispatch({ type: reduxActionTypes.orderListNotInfo.remove_orderForNotInfo, payload: { order } })
                } else if (order.status == 1) {
                    dispatch({ type: reduxActionTypes.orderListNotPrice.remove_orderForNotPrice, payload: { order } })
                } else if (order.status == 2) {
                    dispatch({ type: reduxActionTypes.orderListNotDemand.remove_orderForNotDemand, payload: { order } })
                }
                // else if (order.status == 3) {
                //     dispatch({ type: reduxActionTypes.orderListNotRoute.remove_orderForNotRoute, payload: { order } })
                // }

            } else {
                dispatch({ type: reduxActionTypes.order.change_orderStatus_failed, payload: { failedMsg: `${orderRes.msg}` } })
            }
        } else {
            dispatch({ type: reduxActionTypes.order.change_orderStatus_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.order.change_orderStatus_error, payload: { errorMsg: `${err}` } })
    }
}

export const createRequireTask = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.order.change_orderStatus_waiting })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order/${req.order.id}/requireTask`
        const res = await httpRequest.post(url, {})
        if (res.success) {
            const orderUrl = `${base_host}/admin/${id}/order?orderId=${req.order.id}`
            const orderRes = await httpRequest.get(orderUrl)
            if (orderRes.success) {
                dispatch({ type: reduxActionTypes.order.init_order, payload: { order: orderRes.result[0] } })
                dispatch({ type: reduxActionTypes.order.change_orderStatus_success })
                dispatch({ type: reduxActionTypes.orderListNotRoute.set_orderForNotRoute, payload: { order: orderRes.result[0] } })
                dispatch({ type: reduxActionTypes.orderListNotDemand.remove_orderForNotDemand, payload: { order: req.order } })
            } else {
                dispatch({ type: reduxActionTypes.order.change_orderStatus_failed, failedMsg: `${orderRes.msg}` })
            }
        } else {
            dispatch({ type: reduxActionTypes.order.change_orderStatus_failed, failedMsg: `${res.msg}` })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.order.change_orderStatus_error, errorMsg: `${err}` })
    }
}


export const getRequireTask = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/requireTask?orderId=${req.orderId}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.order.get_requireTaskForOrder_success, payload: { requireTaskInfo: res.result[0] } })
        } else {
            dispatch({ type: reduxActionTypes.order.get_requireTaskForOrder_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.order.get_requireTaskForOrder_error, payload: { errorMsg: `${err}` } })
    }
}

export const getRequireTaskWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.order.get_requireTaskForOrder_waiting })
}