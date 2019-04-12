import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../reduxActionTypes'

const initialState = {
    data: {
        routeCityList: []
    },
    //isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getRouteCityList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [reduxActionTypes.routeCityList.get_routeCityList_success]: (state, action) => {
        const { payload: { routeCityList } } = action
        return {
            ...state,
            data: {
                routeCityList
            },
            getRouteCityList: {
                ...initialState.getRouteCityList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.routeCityList.get_routeCityList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getRouteCityList: {
                ...initialState.getRouteCityList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.routeCityList.get_routeCityList_waiting]: (state, action) => {
        return {
            ...state,
            getRouteCityList: {
                ...initialState.getRouteCityList,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.routeCityList.get_routeCityList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...initialState,
            getRouteCityList: {
                ...state.getRouteCityList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)