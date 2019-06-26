import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data: {
        routeTaskInfo: {},
        loadTaskList: []
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getRouteTaskInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getLoadTaskList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.loadTaskList.get_routeTaskInfo_success]: (state, action) => {
        const { payload: { routeTaskInfo } } = action
        return {
            ...state,
            data: {
                ...state.data,
                routeTaskInfo
            },
            getRouteTaskInfo: {
                ...state.getRouteTaskInfo,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.loadTaskList.get_routeTaskInfo_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getRouteTaskInfo: {
                ...state.getRouteTaskInfo,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.loadTaskList.get_routeTaskInfo_waiting]: (state, action) => {
        return {
            ...state,
            getRouteTaskInfo: {
                ...state.getRouteTaskInfo,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.loadTaskList.get_routeTaskInfo_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getRouteTaskInfo: {
                ...state.getRouteTaskInfo,
                isResultStatus: 3,
                errorMsg
            }
        }
    },








    [reduxActionTypes.loadTaskList.get_loadTaskList_success]: (state, action) => {
        const { payload: { loadTaskList } } = action
        return {
            ...state,
            data: {
                ...state.data,
                loadTaskList
            },
            getLoadTaskList: {
                ...state.getLoadTaskList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.loadTaskList.get_loadTaskList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getLoadTaskList: {
                ...state.getLoadTaskList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.loadTaskList.get_loadTaskList_waiting]: (state, action) => {
        return {
            ...state,
            getLoadTaskList: {
                ...state.getLoadTaskList,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.loadTaskList.get_loadTaskList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getLoadTaskList: {
                ...state.getLoadTaskList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)