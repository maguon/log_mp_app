import * as reduxActionTypes from '../../../reduxActionTypes'
import httpRequest from '../../../util/HttpRequest'

export const getCarListForRoute = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order/${req.orderId}/loadTask/${req.loadTaskId}/loadTaskDetail?arrangeFlag=1`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.carListForRoute.get_arListForRoute_success, payload: { carList: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.carListForRoute.get_arListForRoute_failed, payload: { failedMsg: `${err}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.carListForRoute.get_arListForRoute_error, payload: { errorMsg: `${err}` } })
    }
}


export const getCarListForRouteWaiting = req => async (dispatch) => {
    dispatch({ type: reduxActionTypes.carListForRoute.get_carListForRoute_waiting })
}