import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../util/HttpRequest'

export const getCarListForSyncedRoute = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/loadTask/${req.loadTaskId}/syncLoadTaskDetail/${req.syncLoadTaskDetailId}`
        // console.log('url', url)
        const res =await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.carListForSyncedRoute.get_carListForSyncedRoute_success, payload: { carList: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.carListForSyncedRoute.get_carListForSyncedRoute_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.carListForSyncedRoute.get_carListForSyncedRoute_error, payload: { errorMsg: `${err}` } })
    }
}

export const getCarListForSyncedRouteWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.carListForSyncedRoute.get_carListForSyncedRoute_waiting })
}