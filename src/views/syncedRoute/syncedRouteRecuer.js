import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data: {
        syncedRouteInfo: {
            require: [{}],
            routeLoadTask: []
        }
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getSyncedRoute: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.syncedRoute.get_syncedRoute_success]: (state, action) => {
        const { payload: { syncedRouteInfo } } = action
        return {
            ...state,
            data: {
                syncedRouteInfo
            },
            getSyncedRoute: {
                ...state.getSyncedRoute,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.syncedRoute.get_syncedRoute_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getSyncedRoute: {
                ...state.getSyncedRoute,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.syncedRoute.get_syncedRoute_waiting]: (state, action) => {
        return {
            ...state,
            getSyncedRoute: {
                ...state.getSyncedRoute,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.syncedRoute.get_syncedRoute_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getSyncedRoute: {
                ...state.getSyncedRoute,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)