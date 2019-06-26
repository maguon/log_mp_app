import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../reduxActionTypes'

const initialState = {
    data: {
        requireTaskList: [],
        searchParam: {},
        isCompleted: false

    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getRequireTaskList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getRequireTaskListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


export default handleActions({
    [reduxActionTypes.requireTaskList.get_requireTaskList_success]: (state, action) => {
        const { payload: { requireTaskList, searchParam, isCompleted } } = action
        return {
            ...state,
            data: {
                ...state.data,
                requireTaskList
            },
            getRequireTaskList: {
                ...state.getRequireTaskList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.requireTaskList.get_requireTaskList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getRequireTaskList: {
                ...state.getRequireTaskList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.requireTaskList.get_requireTaskList_waiting]: (state, action) => {
        return {
            ...state,
            getRequireTaskList: {
                ...state.getRequireTaskList,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.requireTaskList.get_requireTaskList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getRequireTaskList: {
                ...state.getRequireTaskList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

}, initialState)