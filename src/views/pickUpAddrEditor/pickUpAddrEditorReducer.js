import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data:{
        order:{}
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    savePickUpAddr:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.pickUpAddrEditor.set_orderForPickUpAddr]: (state, action) => {
        const { payload: { order } } = action
        return {
            ...state,
            data:{
                order
            }
        }
    },




    [reduxActionTypes.pickUpAddrEditor.save_pickUpAddr_success]: (state, action) => {
        const { payload: { order } } = action
        return {
            ...state,
            data:{
                order
            },
            savePickUpAddr: {
                ...state.savePickUpAddr,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.pickUpAddrEditor.save_pickUpAddr_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            savePickUpAddr: {
                ...state.savePickUpAddr,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.pickUpAddrEditor.save_pickUpAddr_waiting]: (state, action) => {
        return {
            ...state,
            savePickUpAddr: {
                ...state.savePickUpAddr,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.pickUpAddrEditor.save_pickUpAddr_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            savePickUpAddr: {
                ...state.savePickUpAddr,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)