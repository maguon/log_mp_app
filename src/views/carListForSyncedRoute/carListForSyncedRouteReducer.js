import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data: {
        carList: []
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getCarListForSyncedRoute: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.carListForSyncedRoute.get_carListForSyncedRoute_success]: (state, action) => {
        const { payload: { carList } } = action
        return {
            ...state,
            data: {
                carList
            },
            getCarListForSyncedRoute: {
                ...state.getCarListForSyncedRoute,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.carListForSyncedRoute.get_carListForSyncedRoute_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCarListForSyncedRoute: {
                ...state.getCarListForSyncedRoute,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.carListForSyncedRoute.get_carListForSyncedRoute_waiting]: (state, action) => {
        return {
            ...state,
            getCarListForSyncedRoute: {
                ...state.getCarListForSyncedRoute,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.carListForSyncedRoute.get_carListForSyncedRoute_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCarListForSyncedRoute: {
                ...state.getCarListForSyncedRoute,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)