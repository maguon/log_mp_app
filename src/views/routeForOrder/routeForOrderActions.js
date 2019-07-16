import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../util/HttpRequest'

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
            console.log('routeTaskRes', routeTaskRes)
            if (routeTaskRes.success) {
                dispatch({ type: reduxActionTypes.routeForOrder.change_routeStatus_success, payload: { requireTaskInfo: routeTaskRes.result[0] } })
            } else {
                dispatch({ type: reduxActionTypes.routeForOrder.change_routeStatus_failed, payload: { failedMsg: `${routeTaskRes.msg}` } })
            }
        } else {
            dispatch({ type: reduxActionTypes.routeForOrder.change_routeStatus_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: reduxActionTypes.routeForOrder.change_routeStatus_waiting, payload: { errorMsg: `${err}` } })
    }
}


export const setRequireTaskInfo = req => (dispatch) => {
    dispatch({ type: reduxActionTypes.routeForOrder.set_requireTaskInfoForRoute, payload: { requireTaskInfo: req } })
}
