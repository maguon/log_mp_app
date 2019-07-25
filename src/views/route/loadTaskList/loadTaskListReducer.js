import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../reduxActionTypes'

const initialState = {
    data: {
        loadTaskList: [],
        searchParam: {},
        isCompleted: false
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getLoadTaskList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getLoadTaskListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getLoadTaskById: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


export default handleActions({
    [reduxActionTypes.loadTaskList.get_loadTaskList_success]: (state, action) => {
        const { payload: { loadTaskList, searchParam, isCompleted } } = action
        return {
            ...state,
            data: {
                ...state.data,
                loadTaskList,
                searchParam,
                isCompleted
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
    },







    [reduxActionTypes.loadTaskList.get_loadTaskListMore_success]: (state, action) => {
        const { payload: { loadTaskList, isCompleted } } = action
        return {
            ...state,
            data: {
                ...state.data,
                loadTaskList: [...state.data.loadTaskList, ...loadTaskList],
                isCompleted
            },
            getLoadTaskListMore: {
                ...initialState.getLoadTaskListMore,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.loadTaskList.get_loadTaskListMore_waiting]: (state, action) => {
        return {
            ...state,
            getLoadTaskListMore: {
                ...initialState.getLoadTaskListMore,
                isResultStatus: 1,
            }
        }
    },
    [reduxActionTypes.loadTaskList.get_loadTaskListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getLoadTaskListMore: {
                ...initialState.getLoadTaskListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.loadTaskList.get_loadTaskListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getLoadTaskListMore: {
                ...initialState.getLoadTaskListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [reduxActionTypes.loadTaskList.get_loadTaskById_success]: (state, action) => {
        const { payload: { loadTaskInfo } } = action
        return {
            ...state,
            data: {
                ...state.data,
                loadTaskList: state.data.loadTaskList.map(item => {
                    if (item.id == loadTaskInfo.id) {
                        return loadTaskInfo
                    } else {
                        return item
                    }
                })
            },
            getLoadTaskById: {
                ...initialState.getLoadTaskById,
                isResultStatus: 2
            }
        }
    },



}, initialState)