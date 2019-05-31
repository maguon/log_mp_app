import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../reduxActionTypes'

const initialState = {
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    receiveAddressInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.recAddrEditorForNotPrice.save_recAddrForNotPrice_success]: (state, action) => {
        return {
            ...state,
            receiveAddressInfo: {
                ...state.receiveAddressInfo,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.recAddrEditorForNotPrice.save_recAddrForNotPrice_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            receiveAddressInfo: {
                ...state.receiveAddressInfo,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.recAddrEditorForNotPrice.save_recAddrForNotPrice_waiting]: (state, action) => {
        return {
            ...state,
            receiveAddressInfo: {
                ...state.receiveAddressInfo,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.recAddrEditorForNotPrice.save_recAddrForNotPrice_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            receiveAddressInfo: {
                ...state.receiveAddressInfo,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)