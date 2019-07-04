import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data:{
        routeTaskListForOrder:[]
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getRouteTaskListForOrder:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.routeTaskListForOrder.get_routeTaskListForOrder_success]: (state, action) => {
        const { payload: { routeTaskListForOrder } } = action
        return {
            ...state,
            data:{
                routeTaskListForOrder
            },
            getRouteTaskListForOrder: {
                ...state.getRouteTaskListForOrder,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.routeTaskListForOrder.get_routeTaskListForOrder_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getRouteTaskListForOrder: {
                ...state.getRouteTaskListForOrder,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.routeTaskListForOrder.get_routeTaskListForOrder_waiting]: (state, action) => {
        return {
            ...state,
            getRouteTaskListForOrder: {
                ...state.getRouteTaskListForOrder,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.routeTaskListForOrder.get_routeTaskListForOrder_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getRouteTaskListForOrder: {
                ...state.getRouteTaskListForOrder,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
}, initialState)