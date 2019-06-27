import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../reduxActionTypes'

const initialState = {
    data: {
        loadTaskList:[],
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
    }
}


export default handleActions({
    [reduxActionTypes.loadTaskList.get_loadTaskList_success]: (state, action) => {
        const { payload: { loadTaskList, searchParam, isCompleted } } = action
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
    },













   

}, initialState)