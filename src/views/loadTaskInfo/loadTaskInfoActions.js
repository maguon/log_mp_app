import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'

export const changeLoadTaskStatus = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.loadTaskInfo.change_loadTaskInfoStatus_waiting})
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/loadTask/${req.loadTaskId}/status/${req.status}`
        // console.log('url', url)
        const res = await httpRequest.put(url, {})
        // console.log('res', res)
        if (res.success) {
            const loadTaskInfoUrl = `${base_host}/admin/${id}/routeLoadTask?loadTaskId=${req.loadTaskId}`
            // console.log('loadTaskInfoUrl', loadTaskInfoUrl)
            const loadTaskInfoRes = await httpRequest.get(loadTaskInfoUrl)
            // console.log('loadTaskInfoRes', loadTaskInfoRes)
            if (loadTaskInfoRes.success) {
                dispatch({ type: reduxActionTypes.loadTaskInfo.change_loadTaskInfoStatus_success, payload: { loadTaskInfo: loadTaskInfoRes.result[0] } })
                dispatch({ type: reduxActionTypes.loadTaskList.get_loadTaskById_success, payload: { loadTaskInfo: loadTaskInfoRes.result[0] } })
            } else {
                dispatch({ type: reduxActionTypes.loadTaskInfo.change_loadTaskInfoStatus_failed, payload: { errorMsg: `${loadTaskInfoRes.msg}` } })
            }
        } else {
            dispatch({ type: reduxActionTypes.loadTaskInfo.change_loadTaskInfoStatus_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err',err)
        dispatch({ type: reduxActionTypes.loadTaskInfo.change_loadTaskInfoStatus_error, payload: { errorMsg: `${err}` } })
    }
}


export const syncLoadTaskInfo = req = async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()

    } catch (err) {
        dispatch({ type: reduxActionTypes.loadTaskInfo.sync_loadTaskInfo_error, payload: { errorMsg: `${err}` } })
    }
}


export const setLoadTaskInfo = param => (dispatch) => {
    dispatch({ type: reduxActionTypes.loadTaskInfo.set_loadTaskInfo, payload: { loadTaskInfo: param } })
}


