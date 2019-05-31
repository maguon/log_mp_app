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
    [reduxActionTypes.recAddrEditorForNotDemand.save_recAddrForNotDemand_success]: (state, action) => {
        return {
            ...state,
            receiveAddressInfo: {
                ...state.receiveAddressInfo,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.recAddrEditorForNotDemand.save_recAddrForNotDemand_failed]: (state, action) => {
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
    [reduxActionTypes.recAddrEditorForNotDemand.save_recAddrForNotDemand_waiting]: (state, action) => {
        return {
            ...state,
            receiveAddressInfo: {
                ...state.receiveAddressInfo,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.recAddrEditorForNotDemand.save_recAddrForNotDemand_error]: (state, action) => {
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