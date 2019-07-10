import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data: {
        order: {}
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    saveRecAddr: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    saveSendAddr: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.addrEditor.save_recAddr_success]: (state, action) => {
        const { payload: { order } } = action
        return {
            ...state,
            data:{
                order
            },
            saveRecAddr: {
                ...state.saveRecAddr,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.addrEditor.save_recAddr_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            saveRecAddr: {
                ...state.saveRecAddr,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.addrEditor.save_recAddr_waiting]: (state, action) => {
        return {
            ...state,
            saveRecAddr: {
                ...state.saveRecAddr,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.addrEditor.save_recAddr_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            saveRecAddr: {
                ...state.saveRecAddr,
                isResultStatus: 3,
                errorMsg
            }
        }
    },





    [reduxActionTypes.addrEditor.save_sendAddr_success]: (state, action) => {
        const { payload: { order } } = action
        return {
            ...state,
            data:{
                order
            },
            saveSendAddr: {
                ...state.saveSendAddr,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.addrEditor.save_sendAddr_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            saveSendAddr: {
                ...state.saveSendAddr,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.addrEditor.save_sendAddr_waiting]: (state, action) => {
        return {
            ...state,
            saveSendAddr: {
                ...state.saveSendAddr,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.addrEditor.save_sendAddr_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            saveSendAddr: {
                ...state.saveSendAddr,
                isResultStatus: 3,
                errorMsg
            }
        }
    },




    [reduxActionTypes.addrEditor.set_orderForAddrEditor]: (state, action) => {
        const { payload: { order } } = action
        return {
            ...state,
            data: {
                order
            }
        }
    }
}, initialState)