import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data:{
        requireTaskInfo:{},
        order:{}
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    cancelRequire:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getOrder:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''   
    }
}

export default handleActions({
    [reduxActionTypes.requireTaskInfo.set_requireTaskInfo]: (state, action) => {
        const { payload: { requireTaskInfo } } = action
        return {
            ...state,
            data:{
                ...state.data,
                requireTaskInfo
            }
        }
    },




    [reduxActionTypes.requireTaskInfo.cancel_require_success]: (state, action) => {
        const { payload: { requireTaskInfo } } = action
        return {
            ...state,
            data:{
                requireTaskInfo
            },
            cancelRequire: {
                ...state.cancelRequire,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.requireTaskInfo.cancel_require_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            cancelRequire: {
                ...state.cancelRequire,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.requireTaskInfo.cancel_require_waiting]: (state, action) => {
        return {
            ...state,
            cancelRequire: {
                ...state.cancelRequire,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.requireTaskInfo.cancel_require_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            cancelRequire: {
                ...state.cancelRequire,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [reduxActionTypes.requireTaskInfo.get_orderForRequireTaskInfo_success]: (state, action) => {
        const { payload: { order } } = action
        return {
            ...state,
            data:{
                ...state.data,
                order
            },
            getOrder: {
                ...state.getOrder,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.requireTaskInfo.get_orderForRequireTaskInfo_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getOrder: {
                ...state.getOrder,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.requireTaskInfo.get_orderForRequireTaskInfo_waiting]: (state, action) => {
        return {
            ...state,
            getOrder: {
                ...state.getOrder,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.requireTaskInfo.get_orderForRequireTaskInfo_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOrder: {
                ...state.getOrder,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)