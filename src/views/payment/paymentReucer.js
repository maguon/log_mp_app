import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data: {
        paymentList: []
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getPaymentList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }

}

export default handleActions({
    [reduxActionTypes.payment.get_paymentList_success]: (state, action) => {
        const { payload: { paymentList } } = action
        return {
            ...state,
            data: {
                paymentList
            },
            getPaymentList: {
                ...state.getPaymentList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.payment.get_paymentList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getPaymentList: {
                ...state.getPaymentList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.payment.get_paymentList_waiting]: (state, action) => {
        return {
            ...state,
            getPaymentList: {
                ...state.getPaymentList,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.payment.get_paymentList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getPaymentList: {
                ...state.getPaymentList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)