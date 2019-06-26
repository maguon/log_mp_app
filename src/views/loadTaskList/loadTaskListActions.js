import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'

export const getRouteTaskInfo = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/requireTask?orderId=${req.order.id}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.loadTaskList.get_routeTaskInfo_success, payload: { routeTaskInfo: res.result[0] } })
        } else {
            dispatch({ type: reduxActionTypes.loadTaskList.get_routeTaskInfo_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: reduxActionTypes.loadTaskList.get_routeTaskInfo_error, payload: { errorMsg: `${err}` } })
    }
}

export const getRouteTaskInfoWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.loadTaskList.get_routeTaskInfo_waiting })
}

export const getLoadTaskList = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } },
            loadTaskListReducer: { data: { routeTaskInfo } } } = getState()
        const url = `${base_host}/admin/${id}/order/${req.order.id}/require/${routeTaskInfo.id}/loadTask`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.loadTaskList.get_loadTaskList_success, payload: { loadTaskList: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.loadTaskList.get_loadTaskList_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.loadTaskList.get_loadTaskList_error, payload: { errorMsg: `${err}` } })
    }
}

export const getLoadTaskListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.loadTaskList.get_loadTaskList_waiting })
}