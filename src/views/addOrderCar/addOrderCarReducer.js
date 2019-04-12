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
    addOrderCar:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.addOrderCar.get_transAndInsurePrice_success]: (state, action) => {
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
    [reduxActionTypes.addOrderCar.get_transAndInsurePrice_failed]: (state, action) => {
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
    [reduxActionTypes.addOrderCar.get_transAndInsurePrice_waiting]: (state, action) => {
        return {
            ...state,
            getTransAndInsurePrice: {
                ...state.getTransAndInsurePrice,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.addOrderCar.get_transAndInsurePrice_error]: (state, action) => {
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




    [reduxActionTypes.addOrderCar.add_orderCar_success]: (state, action) => {
        return {
            ...state,
            addOrderCar: {
                ...state.addOrderCar,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.addOrderCar.add_orderCar_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            addOrderCar: {
                ...state.addOrderCar,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.addOrderCar.add_orderCar_waiting]: (state, action) => {
        return {
            ...state,
            addOrderCar: {
                ...state.addOrderCar,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.addOrderCar.add_orderCar_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            addOrderCar: {
                ...state.addOrderCar,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)