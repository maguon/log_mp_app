import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data:{
        loadTaskInfo:{}
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    changeLoadTaskInfoStatus: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    syncLoadTaskInfo:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''  
    },
    cancelLoadTaskInfo:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''  
    }
}

export default handleActions({
    [reduxActionTypes.loadTaskInfo.set_loadTaskInfo]: (state, action) => {
        const { payload: { loadTaskInfo } } = action
        return {
            ...state,
            data:{
                loadTaskInfo
            }
        }
    },




    [reduxActionTypes.loadTaskInfo.change_loadTaskInfoStatus_success]: (state, action) => {
        const { payload: { loadTaskInfo } } = action
        return {
            ...state,
            data:{
                loadTaskInfo
            },
            changeLoadTaskInfoStatus: {
                ...state.changeLoadTaskInfoStatus,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.loadTaskInfo.change_loadTaskInfoStatus_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            changeLoadTaskInfoStatus: {
                ...state.changeLoadTaskInfoStatus,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.loadTaskInfo.change_loadTaskInfoStatus_waiting]: (state, action) => {
        return {
            ...state,
            changeLoadTaskInfoStatus: {
                ...state.changeLoadTaskInfoStatus,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.loadTaskInfo.change_loadTaskInfoStatus_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            changeLoadTaskInfoStatus: {
                ...state.changeLoadTaskInfoStatus,
                isResultStatus: 3,
                errorMsg
            }
        }
    },







    [reduxActionTypes.loadTaskInfo.sync_loadTaskInfo_success]: (state, action) => {
        const { payload: { loadTaskInfo } } = action
        return {
            ...state,
            data:{
                loadTaskInfo
            },
            syncLoadTaskInfo: {
                ...state.syncLoadTaskInfo,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.loadTaskInfo.sync_loadTaskInfo_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            syncLoadTaskInfo: {
                ...state.syncLoadTaskInfo,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.loadTaskInfo.sync_loadTaskInfo_waiting]: (state, action) => {
        return {
            ...state,
            syncLoadTaskInfo: {
                ...state.syncLoadTaskInfo,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.loadTaskInfo.sync_loadTaskInfo_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            syncLoadTaskInfo: {
                ...state.syncLoadTaskInfo,
                isResultStatus: 3,
                errorMsg
            }
        }
    },






    [reduxActionTypes.loadTaskInfo.cancel_loadTaskInfo_success]: (state, action) => {
        return {
            ...state,
            cancelLoadTaskInfo: {
                ...state.cancelLoadTaskInfo,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.loadTaskInfo.cancel_loadTaskInfo_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            cancelLoadTaskInfo: {
                ...state.cancelLoadTaskInfo,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.loadTaskInfo.cancel_loadTaskInfo_waiting]: (state, action) => {
        return {
            ...state,
            cancelLoadTaskInfo: {
                ...state.cancelLoadTaskInfo,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.loadTaskInfo.cancel_loadTaskInfo_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            cancelLoadTaskInfo: {
                ...state.cancelLoadTaskInfo,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)