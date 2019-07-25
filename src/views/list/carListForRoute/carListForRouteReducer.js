import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../reduxActionTypes'

const initialState = {
    data:{
        carList:[]
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getCarListForRoute:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.carListForRoute.get_carListForRoute_success]: (state, action) => {
        const { payload: { carList } } = action
        return {
            ...state,
            data:{
                carList
            },
            getCarListForRoute: {
                ...state.getCarListForRoute,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.carListForRoute.get_carListForRoute_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCarListForRoute: {
                ...state.getCarListForRoute,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.carListForRoute.get_carListForRoute_waiting]: (state, action) => {
        return {
            ...state,
            getCarListForRoute: {
                ...state.getCarListForRoute,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.carListForRoute.get_carListForRoute_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCarListForRoute: {
                ...state.getCarListForRoute,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)