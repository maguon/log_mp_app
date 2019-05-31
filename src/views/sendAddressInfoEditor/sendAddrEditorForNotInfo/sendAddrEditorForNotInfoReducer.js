import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../reduxActionTypes'

const initialState = {
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    saveSendAddr: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.sendAddrEditorForNotInfo.save_sendAddrForNotInfo_success]: (state, action) => {
        return {
            ...state,
            saveSendAddr: {
                ...state.saveSendAddr,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.sendAddrEditorForNotInfo.save_sendAddrForNotInfo_failed]: (state, action) => {
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
    [reduxActionTypes.sendAddrEditorForNotInfo.save_sendAddrForNotInfo_waiting]: (state, action) => {
        return {
            ...state,
            saveSendAddr: {
                ...state.saveSendAddr,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.sendAddrEditorForNotInfo.save_sendAddrForNotInfo_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            saveSendAddr: {
                ...state.saveSendAddr,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)