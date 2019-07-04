import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../util/HttpRequest'

export const getRouteTaskListForOrder = req => (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()

        const requireTaskUrl = `${base_host}/admin/${3}/requireTask?orderId=${req.orderId}`
        console.log('requireTaskUrl', requireTaskUrl)

        const requireTaskRes = httpRequest.get(requireTaskUrl)
        console.log('requireTaskRes', requireTaskRes)
        if (requireTaskRes.success && requireTaskRes.result[0]) {
            const url = `${base_host}/admin/${id}/order/${req.orderId}/require/${requireTaskRes.result[0].id}/loadTask`
            console.log('url', url)
            const res = httpRequest.get(url)
            console.log('res', res)
            if (res.success) {
                dispatch({ type: reduxActionTypes.routeTaskListForOrder.get_routeTaskListForOrder_success, payload: { routeTaskListForOrder: res.result } })
            } else {
                dispatch({ type: reduxActionTypes.routeTaskListForOrder.get_routeTaskListForOrder_failed, payload: { errorMsg: `${res.msg}` } })
            }
        } else {
            dispatch({ type: reduxActionTypes.routeTaskListForOrder.get_routeTaskListForOrder_failed, payload: { errorMsg: `${requireTaskRes.msg}` } })
        }

    } catch (err) {
        dispatch({ type: reduxActionTypes.routeTaskListForOrder.get_routeTaskListForOrder_error, payload: { errorMsg: `${err}` } })
    }
}

export const getRouteTaskListForOrderWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.routeTaskListForOrder.get_routeTaskListForOrder_waiting })
}