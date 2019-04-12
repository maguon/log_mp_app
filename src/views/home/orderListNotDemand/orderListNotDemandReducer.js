import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../reduxActionTypes'

const initialState = {
    data: {
        orderListNotDemand: [],
        isCompleted: false
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getOrderListNotDemand: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getOrderListNotDemandMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getOrderNotDemandById: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.orderListNotDemand.get_orderListNotDemand_success]: (state, action) => {
        const { payload: { orderListNotDemand, isCompleted } } = action
        return {
            ...state,
            data: {
                orderListNotDemand,
                isCompleted
            },
            getOrderListNotDemand: {
                ...state.getOrderListNotDemand,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderListNotDemand.get_orderListNotDemand_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getOrderListNotDemand: {
                ...state.getOrderListNotDemand,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderListNotDemand.get_orderListNotDemand_waiting]: (state, action) => {
        return {
            ...state,
            getOrderListNotDemand: {
                ...state.getOrderListNotDemand,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.orderListNotDemand.get_orderListNotDemand_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOrderListNotDemand: {
                ...state.getOrderListNotDemand,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [reduxActionTypes.orderListNotDemand.get_orderListNotDemandMore_success]: (state, action) => {
        const { payload: { orderListNotDemand, isCompleted } } = action
        return {
            ...state,
            data: {
                ...state.data,
                orderListNotDemand: [...state.data.orderListNotDemand, ...orderListNotDemand],
                isCompleted
            },
            getOrderListNotDemandMore: {
                ...initialState.getOrderListNotDemandMore,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderListNotDemand.get_orderListNotDemandMore_waiting]: (state, action) => {
        return {
            ...state,
            getOrderListNotDemandMore: {
                ...initialState.getOrderListNotDemandMore,
                isResultStatus: 1,
            }
        }
    },
    [reduxActionTypes.orderListNotDemand.get_orderListNotDemandMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getOrderListNotDemandMore: {
                ...initialState.getOrderListNotDemandMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderListNotDemand.get_orderListNotDemandMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOrderListNotDemandMore: {
                ...initialState.getOrderListNotDemandMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [reduxActionTypes.orderListNotDemand.get_OrderNotDemandById_success]: (state, action) => {
        const { payload: { orderNotDemand } } = action
        return {
            ...state,
            data: {
                ...state.data,
                orderListNotDemand: state.data.orderListNotDemand.map(item => {
                    if (item.id == orderNotDemand.id) {
                        return orderNotDemand
                    } else {
                        return item
                    }
                })
            },
            getOrderNotDemandById: {
                ...state.getOrderNotDemandById,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderListNotDemand.get_OrderNotDemandById_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getOrderNotDemandById: {
                ...state.getOrderNotDemandById,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderListNotDemand.get_OrderNotDemandById_waiting]: (state, action) => {
        return {
            ...state,
            getOrderNotDemandById: {
                ...state.getOrderNotDemandById,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.orderListNotDemand.get_OrderNotDemandById_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOrderNotDemandById: {
                ...state.getOrderNotDemandById,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)