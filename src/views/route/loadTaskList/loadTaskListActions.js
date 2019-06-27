import httpRequest from '../../../util/HttpRequest'
import * as reduxActionTypes from '../../../reduxActionTypes'

const pageSize = 20

export const getLoadTaskList = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/routeLoadTask?start=0&size=${pageSize}`
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

export const getLoadTaskListMore = () => (dispatch, getState) => {

}
