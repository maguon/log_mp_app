import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    createRoute:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.createRoute.create_route_success]: (state, action) => {
        return {
            ...state,
            createRoute: {
                ...state.createRoute,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.createRoute.create_route_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            createRoute: {
                ...state.createRoute,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.createRoute.create_route_waiting]: (state, action) => {
        return {
            ...state,
            createRoute: {
                ...state.createRoute,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.createRoute.create_route_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            createRoute: {
                ...state.createRoute,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
}, initialState)