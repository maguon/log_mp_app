import httpRequest from '../../../util/HttpRequest'
import * as reduxActionTypes from '../../../reduxActionTypes'
import { sleep, ObjectToUrl } from '../../../util/util'

const pageSize = 20

export const getLoadTaskList = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        let searchParam = {}
        if (req) {
            searchParam = {
                loadTaskId: req.loadTaskId,
                transType: req.transType && req.transType.id ? req.transType.id : null,
                routeStartId: req.routeStart && req.routeStart.id ? req.routeStart.id : null,
                routeEndId: req.routeEnd && req.routeEnd.id ? req.routeEnd.id : null,
                createdOnStart: req.createdOnStart,
                createdOnEnd: req.createdOnEnd,
                planDateStart: req.planDateStart,
                planDateEnd: req.planDateEnd
            }
        }
        const url = `${base_host}/admin/${id}/routeLoadTask${ObjectToUrl({
            start: 0,
            size: pageSize,
            ...searchParam
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: reduxActionTypes.loadTaskList.get_loadTaskList_success, payload: {
                    loadTaskList: res.result,
                    isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0),
                    searchParam: req ? req : null
                }
            })
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

export const getLoadTaskListMore = () => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } },
        loginReducer: { data: { user: { id } } },
        loadTaskListReducer: { data: { loadTaskList, isCompleted, searchParam } },
        loadTaskListReducer } = getState()
    let searchReq = {}
    if (searchParam) {
        searchReq = {
            loadTaskId: searchParam.loadTaskId,
            transType: searchParam.transType && searchParam.transType.id ? searchParam.transType.id : null,
            routeStartId: searchParam.routeStart && searchParam.routeStart.id ? searchParam.routeStart.id : null,
            routeEndId: searchParam.routeEnd && searchParam.routeEnd.id ? searchParam.routeEnd.id : null,
            createdOnStart: searchParam.createdOnStart,
            createdOnEnd: searchParam.createdOnEnd,
            planDateStart: searchParam.planDateStart,
            planDateEnd: searchParam.planDateEnd
        }
    }
    if (loadTaskListReducer.getLoadTaskListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getLoadTaskListMore)
    } else {
        if (!isCompleted) {
            dispatch({ type: reduxActionTypes.loadTaskList.get_loadTaskListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/admin/${id}/routeLoadTask${ObjectToUrl({
                    start: loadTaskList.length,
                    size: pageSize,
                    ...searchReq
                })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    dispatch({
                        type: reduxActionTypes.loadTaskList.get_loadTaskListMore_success, payload: {
                            loadTaskList: res.result,
                            isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0),
                        }
                    })
                } else {
                    dispatch({ type: reduxActionTypes.loadTaskList.get_loadTaskListMore_failed, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                dispatch({ type: reduxActionTypes.loadTaskList.get_loadTaskListMore_error, payload: { errorMsg: `${err}` } })
            }
        }
    }
}
