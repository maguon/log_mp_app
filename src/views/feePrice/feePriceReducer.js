import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data:{
        transAndInsurePrice:{}
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getTransAndInsurePrice: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    validatRoute:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.feePrice.get_transAndInsurePriceForFee_success]: (state, action) => {
        const { payload: { transAndInsurePrice } } = action
        return {
            ...state,
            data:{
                transAndInsurePrice
            },
            getTransAndInsurePrice: {
                ...state.getTransAndInsurePrice,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.feePrice.get_transAndInsurePriceForFee_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getTransAndInsurePrice: {
                ...state.getTransAndInsurePrice,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.feePrice.get_transAndInsurePriceForFee_waiting]: (state, action) => {
        return {
            ...state,
            getTransAndInsurePrice: {
                ...state.getTransAndInsurePrice,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.feePrice.get_transAndInsurePriceForFee_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getTransAndInsurePrice: {
                ...state.getTransAndInsurePrice,
                isResultStatus: 3,
                errorMsg
            }
        }
    },




    [reduxActionTypes.feePrice.get_validatRoute_success]: (state, action) => {
        const { payload: { transAndInsurePrice } } = action
        return {
            ...state,
            data:{
                transAndInsurePrice
            },
            getTransAndInsurePrice: {
                ...state.getTransAndInsurePrice,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.feePrice.get_validatRoute_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getTransAndInsurePrice: {
                ...state.getTransAndInsurePrice,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.feePrice.get_validatRoute_waiting]: (state, action) => {
        return {
            ...state,
            getTransAndInsurePrice: {
                ...state.getTransAndInsurePrice,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.feePrice.get_validatRoute_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getTransAndInsurePrice: {
                ...state.getTransAndInsurePrice,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)