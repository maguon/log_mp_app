import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    consultPrice: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [reduxActionTypes.consult.consultPrice_success]: (state, action) => {
        return {
            ...state,
            consultPrice: {
                ...state.consultPrice,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.consult.consultPrice_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            consultPrice: {
                ...state.consultPrice,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.consult.consultPrice_waiting]: (state, action) => {
        return {
            ...state,
            consultPrice: {
                ...state.consultPrice,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.consult.consultPrice_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            consultPrice: {
                ...state.consultPrice,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)