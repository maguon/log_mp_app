import * as reduxActionTypes from '../../../reduxActionTypes'
import httpRequest from '../../../util/HttpRequest'

export const getCarListForRoute = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order/${req.orderId}/loadTask/${req.loadTaskId}/loadTaskDetail?arrangeFlag=1`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.carListForRoute.get_carListForRoute_success, payload: { carList: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.carListForRoute.get_carListForRoute_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.carListForRoute.get_carListForRoute_error, payload: { errorMsg: `${err}` } })
    }
}


export const getCarListForRouteWaiting = () => async (dispatch) => {
    dispatch({ type: reduxActionTypes.carListForRoute.get_carListForRoute_waiting })
}