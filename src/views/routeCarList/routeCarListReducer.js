import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data:{
        routeCarList:[]
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getRouteCarList:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.routeCarList.get_routeCarList_success]: (state, action) => {
        const { payload: { routeCarList } } = action
        return {
            ...state,
            data:{
                routeCarList
            },
            getRouteCarList: {
                ...state.getRouteCarList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.routeCarList.get_routeCarList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getRouteCarList: {
                ...state.getRouteCarList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.routeCarList.get_routeCarList_waiting]: (state, action) => {
        return {
            ...state,
            getRouteCarList: {
                ...state.getRouteCarList,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.routeCarList.get_routeCarList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getRouteCarList: {
                ...state.getRouteCarList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
}, initialState)