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
    },
    cancelOrder: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    saveOrderRemark: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    changeOrderStatus: {
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
    },





    [reduxActionTypes.orderListNotInfo.put_orderRemarkForNotInfo_success]: (state, action) => {
        const { payload: { orderId, remark } } = action
        return {
            ...state,
            data: {
                ...state.data,
                orderListNotInfo: state.data.orderListNotInfo.map(item => {
                    if (item.id == orderId) {
                        return {
                            ...item,
                            admin_mark: remark
                        }
                    } else {
                        return item
                    }
                })
            },
            saveOrderRemark: {
                ...state.saveOrderRemark,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderListNotInfo.put_orderRemarkForNotInfo_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            saveOrderRemark: {
                ...state.saveOrderRemark,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderListNotInfo.put_orderRemarkForNotInfo_waiting]: (state, action) => {
        return {
            ...state,
            saveOrderRemark: {
                ...state.saveOrderRemark,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.orderListNotInfo.put_orderRemarkForNotInfo_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            saveOrderRemark: {
                ...state.saveOrderRemark,
                isResultStatus: 3,
                errorMsg
            }
        }
    },







    [reduxActionTypes.orderListNotInfo.change_orderStatusForNotInfo_success]: (state, action) => {
        const { payload: { orderId, remark } } = action
        return {
            ...state,
            changeOrderStatus: {
                ...state.changeOrderStatus,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderListNotInfo.change_orderStatusForNotInfo_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            changeOrderStatus: {
                ...state.changeOrderStatus,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderListNotInfo.change_orderStatusForNotInfo_waiting]: (state, action) => {
        return {
            ...state,
            changeOrderStatus: {
                ...state.changeOrderStatus,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.orderListNotInfo.change_orderStatusForNotInfo_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            changeOrderStatus: {
                ...state.changeOrderStatus,
                isResultStatus: 3,
                errorMsg
            }
        }
    },




    [reduxActionTypes.orderListNotInfo.remove_orderForNotInfo]: (state, action) => {
        const { payload: { order } } = action
        return {
            ...state,
            data: {
                orderListNotInfo: state.data.orderListNotInfo.filter(item => item.id != order.id)
            }
        }
    },

    [reduxActionTypes.orderListNotInfo.modify_orderRemarkForNotInfo]: (state, action) => {
        const { payload: { orderId, remark } } = action
        return {
            ...state,
            data: {
                orderListNotInfo: state.data.orderListNotInfo.map(item => {
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


    [reduxActionTypes.orderListNotInfo.set_orderForNotInfo]: (state, action) => {
        const { payload: { order } } = action
        // console.log('order',order)
        return {
            ...state,
            data: {
                orderListNotInfo: state.data.orderListNotInfo.map(item => {
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