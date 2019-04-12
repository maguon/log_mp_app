import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../reduxActionTypes'

const initialState = {
    data: {
        orderListNotPrice: [],
        isCompleted: false
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getOrderListNotPrice: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getOrderListNotPriceMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getOrderNotPriceById: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.orderListNotPrice.get_orderListNotPrice_success]: (state, action) => {
        const { payload: { orderListNotPrice, isCompleted, } } = action
        return {
            ...state,
            data: {
                orderListNotPrice,
                isCompleted
            },
            getOrderListNotPrice: {
                ...state.getOrderListNotPrice,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderListNotPrice.get_orderListNotPrice_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getOrderListNotPrice: {
                ...state.getOrderListNotPrice,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderListNotPrice.get_orderListNotPrice_waiting]: (state, action) => {
        return {
            ...state,
            getOrderListNotPrice: {
                ...state.getOrderListNotPrice,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.orderListNotPrice.get_orderListNotPrice_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOrderListNotPrice: {
                ...state.getOrderListNotPrice,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [reduxActionTypes.orderListNotPrice.get_orderListNotPriceMore_success]: (state, action) => {
        const { payload: { orderListNotPrice, isCompleted } } = action
        return {
            ...state,
            data: {
                ...state.data,
                orderListNotPrice: [...state.data.orderListNotPrice, ...orderListNotPrice],
                isCompleted
            },
            getOrderListNotPriceMore: {
                ...initialState.getOrderListNotPriceMore,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderListNotPrice.get_orderListNotPriceMore_waiting]: (state, action) => {
        return {
            ...state,
            getOrderListNotPriceMore: {
                ...initialState.getOrderListNotPriceMore,
                isResultStatus: 1,
            }
        }
    },
    [reduxActionTypes.orderListNotPrice.get_orderListNotPriceMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getOrderListNotPriceMore: {
                ...initialState.getOrderListNotPriceMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderListNotPrice.get_orderListNotPriceMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOrderListNotPriceMore: {
                ...initialState.getOrderListNotPriceMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [reduxActionTypes.orderListNotPrice.get_orderNotPriceById_success]: (state, action) => {
        const { payload: { orderNotPrice } } = action

        return {
            ...state,
            data: {
                ...state.data,
                orderListNotPrice: state.data.orderListNotPrice.map(item => {
                    if (item.id == orderNotPrice.id) {
                        return orderNotPrice
                    } else {
                        return item
                    }
                })
            },
            getOrderNotPriceById: {
                ...state.getOrderNotPriceById,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderListNotPrice.get_orderNotPriceById_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getOrderNotPriceById: {
                ...state.getOrderNotPriceById,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderListNotPrice.get_orderNotPriceById_waiting]: (state, action) => {
        return {
            ...state,
            getOrderNotPriceById: {
                ...state.getOrderNotPriceById,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.orderListNotPrice.get_orderNotPriceById_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOrderNotPriceById: {
                ...state.getOrderNotPriceById,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)