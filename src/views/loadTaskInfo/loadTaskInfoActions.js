import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'
import { Actions } from 'react-native-router-flux'

export const changeLoadTaskStatus = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.loadTaskInfo.change_loadTaskInfoStatus_waiting })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/loadTask/${req.loadTaskId}/status/${req.status}`
        const res = await httpRequest.put(url, {})
        if (res.success) {
            const loadTaskInfoUrl = `${base_host}/admin/${id}/routeLoadTask?loadTaskId=${req.loadTaskId}`
            const loadTaskInfoRes = await httpRequest.get(loadTaskInfoUrl)
            if (loadTaskInfoRes.success) {
                dispatch({ type: reduxActionTypes.loadTaskInfo.change_loadTaskInfoStatus_success, payload: { loadTaskInfo: loadTaskInfoRes.result[0] } })
                dispatch({ type: reduxActionTypes.loadTaskList.get_loadTaskById_success, payload: { loadTaskInfo: loadTaskInfoRes.result[0] } })
                dispatch({ type: reduxActionTypes.routeTaskListForOrder.get_routeTaskListForOrderById_success, payload: { loadTaskInfo: loadTaskInfoRes.result[0] } })
            } else {
                dispatch({ type: reduxActionTypes.loadTaskInfo.change_loadTaskInfoStatus_failed, payload: { failedMsg: `${loadTaskInfoRes.msg}` } })
            }
        } else {
            dispatch({ type: reduxActionTypes.loadTaskInfo.change_loadTaskInfoStatus_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.loadTaskInfo.change_loadTaskInfoStatus_error, payload: { errorMsg: `${err}` } })
    }
}

export const syncLoadTaskInfo = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.loadTaskInfo.sync_loadTaskInfo_waiting })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/loadTask/${req.loadTaskId}/supplier`
        // console.log('url', url)
        const res = await httpRequest.post(url, {})
        // console.log('res', res)
        if (res.success) {
            const loadTaskInfoUrl = `${base_host}/admin/${id}/routeLoadTask?loadTaskId=${req.loadTaskId}`
            // console.log('loadTaskInfoUrl', loadTaskInfoUrl)
            const loadTaskInfoRes = await httpRequest.get(loadTaskInfoUrl)
            // console.log('loadTaskInfoRes', loadTaskInfoRes)
            if (loadTaskInfoRes.success) {
                dispatch({ type: reduxActionTypes.loadTaskList.get_loadTaskById_success, payload: { loadTaskInfo: loadTaskInfoRes.result[0] } })
                dispatch({ type: reduxActionTypes.routeTaskListForOrder.get_routeTaskListForOrderById_success, payload: { loadTaskInfo: loadTaskInfoRes.result[0] } })
                dispatch({ type: reduxActionTypes.loadTaskInfo.sync_loadTaskInfo_success, payload: { loadTaskInfo: loadTaskInfoRes.result[0] } })
            } else {
                dispatch({ type: reduxActionTypes.loadTaskInfo.sync_loadTaskInfo_failed, payload: { failedMsg: `${loadTaskInfoRes.msg}` } })
            }
        } else {
            dispatch({ type: reduxActionTypes.loadTaskInfo.sync_loadTaskInfo_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.loadTaskInfo.sync_loadTaskInfo_error, payload: { errorMsg: `${err}` } })
    }
}

export const setLoadTaskInfo = param => (dispatch) => {
    dispatch({ type: reduxActionTypes.loadTaskInfo.set_loadTaskInfo, payload: { loadTaskInfo: param } })
}

export const cancelLoadTaskInfo = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.loadTaskInfo.cancel_loadTaskInfo_waiting })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/loadTask/${req.loadTaskId}`
        const res = await httpRequest.del(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.routeTaskListForOrder.del_routeTaskInfo, payload: { loadTaskId } })
            dispatch({ type: reduxActionTypes.loadTaskInfo.cancel_loadTaskInfo_success })
            Actions.pop()
        } else {
            dispatch({ type: reduxActionTypes.loadTaskInfo.cancel_loadTaskInfo_failed, payload: { failedMsg: `${err}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.loadTaskInfo.cancel_loadTaskInfo_error, payload: { errorMsg: `${err}` } })
    }
}