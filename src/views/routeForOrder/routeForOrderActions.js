import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../util/HttpRequest'
import * as reduxActions from '../../reduxActions'


export const changeRouteStatus = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.routeForOrder.change_routeStatus_waiting })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/requireTask/${req.requireTaskId}/status/${req.status}`
        const res = await httpRequest.put(url, {})
        if (res.success) {
            const routeTaskUrl = `${base_host}/admin/${id}/requireTask?requireId=${req.requireTaskId}`
            const routeTaskRes = await httpRequest.get(routeTaskUrl)
            if (routeTaskRes.success) {
                const orderUrl = `${base_host}/admin/${id}/order?orderId=${req.orderId}`
                console.log('orderUrl', orderUrl)
                const orderRes = await httpRequest.get(orderUrl)
                console.log('orderRes', orderRes)
                if (orderRes.success) {    
                    dispatch(reduxActions.routeTaskListForOrder.getRouteTaskListForOrderWaiting())
                    dispatch(reduxActions.routeTaskListForOrder.getRouteTaskListForOrder({ orderId: req.orderId }))
                    dispatch(reduxActions.orderInfo.setOrderInfo(orderRes.result[0]))
                    dispatch({type:reduxActionTypes.orderInfo.get_requireTaskInfoForOrderInfo_success,payload: { requireTaskInfo: routeTaskRes.result[0] } })
                    dispatch({ type: reduxActionTypes.order.init_order, payload: { order: orderRes.result[0] } })
                    dispatch({ type: reduxActionTypes.routeForOrder.change_routeStatus_success, payload: { requireTaskInfo: routeTaskRes.result[0] } })
                } else {
                    dispatch({ type: reduxActionTypes.routeForOrder.change_routeStatus_failed, payload: { failedMsg: `${orderRes.msg}` } })
                }
            } else {
                dispatch({ type: reduxActionTypes.routeForOrder.change_routeStatus_failed, payload: { failedMsg: `${routeTaskRes.msg}` } })
            }
        } else {
            dispatch({ type: reduxActionTypes.routeForOrder.change_routeStatus_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        console.log('err',err)
        dispatch({ type: reduxActionTypes.routeForOrder.change_routeStatus_waiting, payload: { errorMsg: `${err}` } })
    }
}


export const setRequireTaskInfo = req => (dispatch) => {
    dispatch({ type: reduxActionTypes.routeForOrder.set_requireTaskInfoForRoute, payload: { requireTaskInfo: req } })
}
