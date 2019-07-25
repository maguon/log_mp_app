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



    [reduxActionTypes.orderListNotDemand.get_orderNotDemandById_success]: (state, action) => {
        const { payload: { order } } = action
        return {
            ...state,
            data: {
                ...state.data,
                orderListNotDemand: state.data.orderListNotDemand.map(item => {
                    if (item.id == order.id) {
                        return order
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
    [reduxActionTypes.orderListNotDemand.get_orderNotDemandById_failed]: (state, action) => {
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
    [reduxActionTypes.orderListNotDemand.get_orderNotDemandById_waiting]: (state, action) => {
        return {
            ...state,
            getOrderNotDemandById: {
                ...state.getOrderNotDemandById,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.orderListNotDemand.get_orderNotDemandById_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOrderNotDemandById: {
                ...state.getOrderNotDemandById,
                isResultStatus: 3,
                errorMsg
            }
        }
    },






    [reduxActionTypes.orderListNotDemand.remove_orderForNotDemand]: (state, action) => {
        const { payload: { order } } = action
        return {
            ...state,
            data: {
                orderListNotDemand: state.data.orderListNotDemand.filter(item => item.id != order.id)
            }
        }
    },




    [reduxActionTypes.orderListNotDemand.modify_orderRemarkForNotDemand]: (state, action) => {
        const { payload: { orderId, remark } } = action
        return {
            ...state,
            data: {
                orderListNotDemand: state.data.orderListNotDemand.map(item => {
                    if (item.id == orderId) {
                        return {
                            ...item,
                            admin_mark: remark
                        }
                    } else {
                        return item
                    }
                })
            }
        }
    },



    [reduxActionTypes.orderListNotDemand.set_orderForNotDemand]: (state, action) => {
        const { payload: { order } } = action
        return {
            ...state,
            data: {
                orderListNotDemand: state.data.orderListNotDemand.map(item => {
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