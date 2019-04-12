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
    updateOrderCar:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.orderCarEditor.get_transAndInsurePriceForEditor_success]: (state, action) => {
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
    [reduxActionTypes.orderCarEditor.get_transAndInsurePriceForEditor_failed]: (state, action) => {
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
    [reduxActionTypes.orderCarEditor.get_transAndInsurePriceForEditor_waiting]: (state, action) => {
        return {
            ...state,
            getTransAndInsurePrice: {
                ...state.getTransAndInsurePrice,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.orderCarEditor.get_transAndInsurePriceForEditor_error]: (state, action) => {
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




    [reduxActionTypes.orderCarEditor.update_orderCar_success]: (state, action) => {
        return {
            ...state,
            updateOrderCar: {
                ...state.updateOrderCar,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderCarEditor.update_orderCar_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            updateOrderCar: {
                ...state.updateOrderCar,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderCarEditor.update_orderCar_waiting]: (state, action) => {
        return {
            ...state,
            updateOrderCar: {
                ...state.updateOrderCar,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.orderCarEditor.update_orderCar_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            updateOrderCar: {
                ...state.updateOrderCar,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)