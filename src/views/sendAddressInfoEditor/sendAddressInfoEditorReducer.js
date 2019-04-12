import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    saveSendAddressInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.sendAddressInfoEditor.save_sendAddressInfo_success]: (state, action) => {
        return {
            ...state,
            saveSendAddressInfo: {
                ...state.saveSendAddressInfo,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.sendAddressInfoEditor.save_sendAddressInfo_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            saveSendAddressInfo: {
                ...state.saveSendAddressInfo,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.sendAddressInfoEditor.save_sendAddressInfo_waiting]: (state, action) => {
        return {
            ...state,
            saveSendAddressInfo: {
                ...state.saveSendAddressInfo,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.sendAddressInfoEditor.save_sendAddressInfo_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            saveSendAddressInfo: {
                ...state.saveSendAddressInfo,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)