import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../reduxActionTypes'

const initialState = {
    data: {
        orderListNotInfo: [],
        isCompleted: false
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getOrderListNotInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getOrderListNotInfoMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getOrderNotInfoById: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.orderListNotInfo.get_orderListNotInfo_success]: (state, action) => {
        const { payload: { orderListNotInfo, isCompleted } } = action
        return {
            ...state,
            data: {
                orderListNotInfo,
                isCompleted
            },
            getOrderListNotInfo: {
                ...state.getOrderListNotInfo,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderListNotInfo.get_orderListNotInfo_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getOrderListNotInfo: {
                ...state.getOrderListNotInfo,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderListNotInfo.get_orderListNotInfo_waiting]: (state, action) => {
        return {
            ...state,
            getOrderListNotInfo: {
                ...state.getOrderListNotInfo,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.orderListNotInfo.get_orderListNotInfo_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOrderListNotInfo: {
                ...state.getOrderListNotInfo,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [reduxActionTypes.orderListNotInfo.get_orderListNotInfoMore_success]: (state, action) => {
        const { payload: { orderListNotInfo, isCompleted } } = action
        return {
            ...state,
            data: {
                ...state.data,
                orderListNotInfo: [...state.data.orderListNotInfo, ...orderListNotInfo],
                isCompleted
            },
            getOrderListNotInfoMore: {
                ...initialState.getOrderListNotInfoMore,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderListNotInfo.get_orderListNotInfoMore_waiting]: (state, action) => {
        return {
            ...state,
            getOrderListNotInfoMore: {
                ...initialState.getOrderListNotInfoMore,
                isResultStatus: 1,
            }
        }
    },
    [reduxActionTypes.orderListNotInfo.get_orderListNotInfoMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getOrderListNotInfoMore: {
                ...initialState.getOrderListNotInfoMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderListNotInfo.get_orderListNotInfoMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOrderListNotInfoMore: {
                ...initialState.getOrderListNotInfoMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [reduxActionTypes.orderListNotInfo.get_orderNotInfoById_success]: (state, action) => {
        const { payload: { order } } = action
        return {
            ...state,
            data: {
                ...state.data,
                orderListNotInfo: state.data.orderListNotInfo.map(item => {
                    if (item.id == order.id) {
                        return order
                    } else {
                        return item
                    }
                })
            },
            getOrderNotInfoById: {
                ...state.getOrderNotInfoById,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderListNotInfo.get_orderNotInfoById_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getOrderNotInfoById: {
                ...state.getOrderNotInfoById,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderListNotInfo.get_orderNotInfoById_waiting]: (state, action) => {
        return {
            ...state,
            getOrderNotInfoById: {
                ...state.getOrderNotInfoById,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.orderListNotInfo.get_orderNotInfoById_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOrderNotInfoById: {
                ...state.getOrderNotInfoById,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)