import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    receiveSendAddressInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.receiveAddressInfoEditor.save_receiveAddressInfo_success]: (state, action) => {
        return {
            ...state,
            receiveSendAddressInfo: {
                ...state.receiveSendAddressInfo,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.receiveAddressInfoEditor.save_receiveAddressInfo_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            receiveSendAddressInfo: {
                ...state.receiveSendAddressInfo,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.receiveAddressInfoEditor.save_receiveAddressInfo_waiting]: (state, action) => {
        return {
            ...state,
            receiveSendAddressInfo: {
                ...state.receiveSendAddressInfo,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.receiveAddressInfoEditor.save_receiveAddressInfo_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            receiveSendAddressInfo: {
                ...state.receiveSendAddressInfo,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)