import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'


const initialState = {
    data: {
        order: {},
        requireTaskInfo: {}
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getOrder: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    modifyOrderRemark: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getRequireTaskForOrder: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.order.modify_orderRemark_success]: (state, action) => {
        const { payload: { remark } } = action
        return {
            ...state,
            data: {
                ...state.data,
                order: {
                    ...state.data.order,
                    admin_mark: remark
                }
            },
            modifyOrderRemark: {
                ...state.modifyOrderRemark,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.order.modify_orderRemark_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            modifyOrderRemark: {
                ...state.modifyOrderRemark,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.order.modify_orderRemark_waiting]: (state, action) => {
        return {
            ...state,
            modifyOrderRemark: {
                ...state.modifyOrderRemark,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.order.modify_orderRemark_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            modifyOrderRemark: {
                ...state.modifyOrderRemark,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [reduxActionTypes.order.get_requireTaskForOrder_success]: (state, action) => {
        const { payload: { requireTaskInfo } } = action
        return {
            ...state,
            data: {
                ...state.data,
                requireTaskInfo
            },
            getRequireTaskForOrder: {
                ...state.getRequireTaskForOrder,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.order.get_requireTaskForOrder_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getRequireTaskForOrder: {
                ...state.getRequireTaskForOrder,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.order.get_requireTaskForOrder_waiting]: (state, action) => {
        return {
            ...state,
            getRequireTaskForOrder: {
                ...state.getRequireTaskForOrder,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.order.get_requireTaskForOrder_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getRequireTaskForOrder: {
                ...state.getRequireTaskForOrder,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [reduxActionTypes.order.init_order]: (state, action) => {
        const { payload: { order } } = action
        return {
            ...state,
            data: {
            ...state.data,

                order
            }
        }
    }
}, initialState)