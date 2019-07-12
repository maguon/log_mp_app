import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data: {
        orderList: [],
        searchParam: {},
        isCompleted: false
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getOrderList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getOrderListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


export default handleActions({
    [reduxActionTypes.orderList.get_orderList_success]: (state, action) => {
        const { payload: { orderList, searchParam, isCompleted } } = action
        return {
            ...state,
            data: {
                ...state.data,
                orderList,
                searchParam,
                isCompleted
            },
            getOrderList: {
                ...state.getOrderList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderList.get_orderList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getOrderList: {
                ...state.getOrderList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderList.get_orderList_waiting]: (state, action) => {
        return {
            ...state,
            getOrderList: {
                ...state.getOrderList,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.orderList.get_orderList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOrderList: {
                ...state.getOrderList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },







    [reduxActionTypes.orderList.get_orderListMore_success]: (state, action) => {
        const { payload: { orderList, isCompleted } } = action
        return {
            ...state,
            data: {
                ...state.data,
                orderList: [...state.data.orderList, ...orderList],
                isCompleted
            },
            getOrderListMore: {
                ...initialState.getOrderListMore,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderList.get_orderListMore_waiting]: (state, action) => {
        return {
            ...state,
            getOrderListMore: {
                ...initialState.getOrderListMore,
                isResultStatus: 1,
            }
        }
    },
    [reduxActionTypes.orderList.get_orderListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getOrderListMore: {
                ...initialState.getOrderListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderList.get_orderListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOrderListMore: {
                ...initialState.getOrderListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [reduxActionTypes.orderList.set_orderForOrderList]: (state, action) => {
        const { payload: { order } } = action
        // console.log('order',order)
        return {
            ...state,
            data: {
                orderList: state.data.orderList.map(item => {
                    if (item.id == order.id) {
                        return order
                    } else {
                        return item
                    }
                })
            }
        }
    }


}, initialState)