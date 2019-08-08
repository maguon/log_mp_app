import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../util/HttpRequest'

export const getSyncedRoute = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/loadTask/${req.loadTaskId}/syncLoadTask`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.syncedRoute.get_syncedRoute_success, payload: { syncedRouteInfo: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.syncedRoute.get_syncedRoute_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.syncedRoute.get_syncedRoute_error, payload: { errorMsg: `${err}` } })
    }
}

export const getSyncedRouteWaiting = req => (dispatch) => {
    dispatch({ type: reduxActionTypes.syncedRoute.get_syncedRoute_waiting })
}