import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../reduxActionTypes'

const initialState = {
    data: {
        orderListNotRoute: [],
        isCompleted: false
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getOrderListNotRoute: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getOrderListNotRouteMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getOrderNotRouteById: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.orderListNotRoute.get_orderListNotRoute_success]: (state, action) => {
        const { payload: { orderListNotRoute, isCompleted } } = action
        return {
            ...state,
            data: {
                orderListNotRoute,
                isCompleted
            },
            getOrderListNotRoute: {
                ...state.getOrderListNotRoute,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderListNotRoute.get_orderListNotRoute_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getOrderListNotRoute: {
                ...state.getOrderListNotRoute,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderListNotRoute.get_orderListNotRoute_waiting]: (state, action) => {
        return {
            ...state,
            getOrderListNotRoute: {
                ...state.getOrderListNotRoute,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.orderListNotRoute.get_orderListNotRoute_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOrderListNotRoute: {
                ...state.getOrderListNotRoute,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [reduxActionTypes.orderListNotRoute.get_orderListNotRouteMore_success]: (state, action) => {
        const { payload: { orderListNotRoute, isCompleted } } = action
        return {
            ...state,
            data: {
                ...state.data,
                orderListNotRoute: [...state.data.orderListNotRoute, ...orderListNotRoute],
                isCompleted
            },
            getOrderListNotRouteMore: {
                ...initialState.getOrderListNotRouteMore,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderListNotRoute.get_orderListNotRouteMore_waiting]: (state, action) => {
        return {
            ...state,
            getOrderListNotRouteMore: {
                ...initialState.getOrderListNotRouteMore,
                isResultStatus: 1,
            }
        }
    },
    [reduxActionTypes.orderListNotRoute.get_orderListNotRouteMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getOrderListNotRouteMore: {
                ...initialState.getOrderListNotRouteMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderListNotRoute.get_orderListNotRouteMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOrderListNotRouteMore: {
                ...initialState.getOrderListNotRouteMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [reduxActionTypes.orderListNotRoute.get_orderNotRouteById_success]: (state, action) => {
        const { payload: { orderNotRoute } } = action
        return {
            ...state,
            data: {
                ...state.data,
                orderListNotRoute: state.data.orderListNotRoute.map(item => {
                    if (item.id == orderNotRoute.id) {
                        return orderNotRoute
                    } else {
                        return item
                    }
                })
            },
            getOrderNotRouteById: {
                ...state.getOrderNotRouteById,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderListNotRoute.get_orderNotRouteById_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getOrderNotRouteById: {
                ...state.getOrderNotRouteById,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderListNotRoute.get_orderNotRouteById_waiting]: (state, action) => {
        return {
            ...state,
            getOrderNotRouteById: {
                ...state.getOrderNotRouteById,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.orderListNotRoute.get_orderNotRouteById_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOrderNotRouteById: {
                ...state.getOrderNotRouteById,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)