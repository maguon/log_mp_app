import httpRequest from '../../../util/HttpRequest'
import * as reduxActionTypes from '../../../reduxActionTypes'

const pageSize = 20

export const getRequireTaskList = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/requireTask?start=0&size=${pageSize}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.requireTaskList.get_requireTaskList_success, payload: { requireTaskList: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.requireTaskList.get_requireTaskList_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.requireTaskList.get_requireTaskList_error, payload: { errorMsg: `${err}` } })
    }
}

export const getRequireTaskListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.requireTaskList.get_requireTaskList_waiting })
}

export const getRequireTaskListMore = req => async (dispatch, getState) => {

}

