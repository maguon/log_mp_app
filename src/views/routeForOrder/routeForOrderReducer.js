import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data:{
        requireTaskInfo:{}
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    changeRouteStatus:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.routeForOrder.change_routeStatus_success]: (state, action) => {
        const { payload: { requireTaskInfo } } = action
        console.log('requireTaskInfo',requireTaskInfo)
        return {
            ...state,
            data:{
                requireTaskInfo
            },
            changeRouteStatus: {
                ...state.changeRouteStatus,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.routeForOrder.change_routeStatus_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            changeRouteStatus: {
                ...state.changeRouteStatus,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.routeForOrder.change_routeStatus_waiting]: (state, action) => {
        return {
            ...state,
            changeRouteStatus: {
                ...state.changeRouteStatus,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.routeForOrder.change_routeStatus_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            changeRouteStatus: {
                ...state.changeRouteStatus,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [reduxActionTypes.routeForOrder.set_requireTaskInfoForRoute]: (state, action) => {
        const { payload: { requireTaskInfo } } = action
        return {
            ...state,
            data:{
                requireTaskInfo
            }
        }
    }
}, initialState)