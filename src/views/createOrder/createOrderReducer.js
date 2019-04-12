import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    createOrder: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [reduxActionTypes.createOrder.createOrder_success]: (state, action) => {
        return {
            ...state,
            createOrder: {
                ...state.createOrder,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.createOrder.createOrder_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            createOrder: {
                ...state.createOrder,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.createOrder.createOrder_waiting]: (state, action) => {
        return {
            ...state,
            createOrder: {
                ...state.createOrder,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.createOrder.createOrder_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            createOrder: {
                ...state.createOrder,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)