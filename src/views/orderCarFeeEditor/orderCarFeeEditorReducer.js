import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    //updateOrderCarFee.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    updateOrderCarFee:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.orderCarFeeEditor.update_orderCarFee_success]: (state, action) => {
        return {
            ...state,
            updateOrderCarFee: {
                ...state.updateOrderCarFee,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderCarFeeEditor.update_orderCarFee_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            updateOrderCarFee: {
                ...state.updateOrderCarFee,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderCarFeeEditor.update_orderCarFee_waiting]: (state, action) => {
        return {
            ...state,
            updateOrderCarFee: {
                ...state.updateOrderCarFee,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.orderCarFeeEditor.update_orderCarFee_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            updateOrderCarFee: {
                ...state.updateOrderCarFee,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)