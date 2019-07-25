import httpRequest from '../../../util/HttpRequest'
import * as reduxActionTypes from '../../../reduxActionTypes'
import { sleep, ObjectToUrl } from '../../../util/util'

const pageSize = 20

export const getRequireTaskList = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        let searchReq = {}
        if (req) {
            searchReq = {
                orderId: req.orderId,
                createdOnStart: req.createdOnStart,
                createdOnEnd: req.createdOnEnd,
                routeStartId: req.routeStart && req.routeStart.id ? req.routeStart.id : null,
                routeEndId: req.routeEnd && req.routeEnd.id ? req.routeEnd.id : null,
                serviceType: req.serviceType && req.serviceType.id ? req.serviceType.id : null
            }
        }
        const url = `${base_host}/admin/${id}/requireTask${ObjectToUrl({
            start: 0,
            size: pageSize,
            ...searchReq
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: reduxActionTypes.requireTaskList.get_requireTaskList_success, payload: {
                    requireTaskList: res.result,
                    isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0),
                    searchParam: req ? req : null
                }
            })
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

export const getRequireTaskListMore = () => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } },
        loginReducer: { data: { user: { id } } },
        requireTaskListReducer: { data: { requireTaskList, searchParam, isCompleted } },
        requireTaskListReducer } = getState()

    let searchReq = {}
    if (searchParam) {
        searchReq = {
            orderId: searchParam.orderId,
            createdOnStart: searchParam.createdOnStart,
            createdOnEnd: searchParam.createdOnEnd,
            routeStartId: searchParam.routeStart && searchParam.routeStart.id ? searchParam.routeStart.id : null,
            routeEndId: searchParam.routeEnd && searchParam.routeEnd.id ? searchParam.routeEnd.id : null,
            serviceType: searchParam.serviceType && searchParam.serviceType.id ? searchParam.serviceType.id : null
        }
    }
    if (requireTaskListReducer.getRequireTaskListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getRequireTaskListMore)
    } else {
        if (!isCompleted) {
            dispatch({ type: reduxActionTypes.requireTaskList.get_requireTaskListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/admin/${id}/requireTask${ObjectToUrl({
                    start: requireTaskList.length,
                    size: pageSize,
                    ...searchReq
                })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    dispatch({
                        type: reduxActionTypes.requireTaskList.get_requireTaskListMore_success, payload: {
                            requireTaskList: res.result,
                            isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0),
                        }
                    })
                } else {
                    dispatch({ type: reduxActionTypes.requireTaskList.get_requireTaskListMore_failed, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                dispatch({ type: reduxActionTypes.requireTaskList.get_requireTaskListMore_error, payload: { errorMsg: `${err}` } })
            }
        }
    }
}

