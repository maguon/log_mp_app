import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data: {
        order: {},
        requireTaskInfo:{}
    },
    getRequireTaskInfo: {//login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
    
}


export default handleActions({

    [reduxActionTypes.orderInfo.set_orderInfo]: (state, action) => {
        const { payload: { order } } = action

        return {
            ...state,
            data:{
                ...state.data,
                order
            }
        }
    },


    [reduxActionTypes.orderInfo.get_requireTaskInfoForOrderInfo_success]: (state, action) => {
        const { payload: { requireTaskInfo } } = action
        return {
            ...state,
            data: {
                ...state.data,
                requireTaskInfo
            },
            getRequireTaskInfo: {
                ...initialState.getRequireTaskInfo,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderInfo.get_requireTaskInfoForOrderInfo_waiting]: (state, action) => {
        return {
            ...state,
            getRequireTaskInfo: {
                ...initialState.getRequireTaskInfo,
                isResultStatus: 1,
            }
        }
    },
    [reduxActionTypes.orderInfo.get_requireTaskInfoForOrderInfo_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getRequireTaskInfo: {
                ...initialState.getRequireTaskInfo,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderInfo.get_requireTaskInfoForOrderInfo_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getRequireTaskInfo: {
                ...initialState.getRequireTaskInfo,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)