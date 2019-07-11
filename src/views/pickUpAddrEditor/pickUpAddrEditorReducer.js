import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data:{
        order:{}
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    savePickUpRecAddr:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    savePickUpSendAddr:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.pickUpAddrEditor.set_orderForpickUpAddr]: (state, action) => {
        const { payload: { order } } = action
        return {
            ...state,
            data:{
                order
            }
        }
    },




    [reduxActionTypes.pickUpAddrEditor.save_pickUpRecAddr_success]: (state, action) => {
        const { payload: { requireTaskInfo } } = action
        return {
            ...state,
            data:{
                requireTaskInfo
            },
            savePickUpRecAddr: {
                ...state.savePickUpRecAddr,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.pickUpAddrEditor.save_pickUpRecAddr_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            savePickUpRecAddr: {
                ...state.savePickUpRecAddr,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.pickUpAddrEditor.save_pickUpRecAddr_waiting]: (state, action) => {
        return {
            ...state,
            savePickUpRecAddr: {
                ...state.savePickUpRecAddr,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.pickUpAddrEditor.save_pickUpRecAddr_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            savePickUpRecAddr: {
                ...state.savePickUpRecAddr,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [reduxActionTypes.pickUpAddrEditor.save_pickUpSendAddr_success]: (state, action) => {
        const { payload: { requireTaskInfo } } = action
        return {
            ...state,
            data:{
                requireTaskInfo
            },
            savePickUpSendAddr: {
                ...state.savePickUpSendAddr,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.pickUpAddrEditor.save_pickUpSendAddr_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            savePickUpSendAddr: {
                ...state.savePickUpSendAddr,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.pickUpAddrEditor.save_pickUpSendAddr_waiting]: (state, action) => {
        return {
            ...state,
            savePickUpSendAddr: {
                ...state.savePickUpSendAddr,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.pickUpAddrEditor.save_pickUpSendAddr_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            savePickUpSendAddr: {
                ...state.savePickUpSendAddr,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
}, initialState)