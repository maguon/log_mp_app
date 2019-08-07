import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../util/HttpRequest'

export const getRouteTaskListForOrder = req =>async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
            const url = `${base_host}/admin/${id}/routeLoadTask?orderId=${req.orderId}`
            const res = await httpRequest.get(url)
            if (res.success) {
                dispatch({ type: reduxActionTypes.routeTaskListForOrder.get_routeTaskListForOrder_success, payload: { routeTaskListForOrder: res.result } })
            } else {
                dispatch({ type: reduxActionTypes.routeTaskListForOrder.get_routeTaskListForOrder_failed, payload: { errorMsg: `${res.msg}` } })
            }
    } catch (err) {
        dispatch({ type: reduxActionTypes.routeTaskListForOrder.get_routeTaskListForOrder_error, payload: { errorMsg: `${err}` } })
    }
}

export const getRouteTaskListForOrderWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.routeTaskListForOrder.get_routeTaskListForOrder_waiting })
}