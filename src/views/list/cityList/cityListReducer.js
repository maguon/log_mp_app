import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../reduxActionTypes'

const initialState = {
    data: {
        cityList: []
    },
    //isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getCityList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [reduxActionTypes.cityList.get_cityList_success]: (state, action) => {
        const { payload: { cityList } } = action
        return {
            ...state,
            data: {
                cityList
            },
            getCityList: {
                ...initialState.getCityList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.cityList.get_cityList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCityList: {
                ...initialState.getCityList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.cityList.get_cityList_waiting]: (state, action) => {
        return {
            ...state,
            getCityList: {
                ...initialState.getCityList,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.cityList.get_cityList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...initialState,
            getCityList: {
                ...state.getCityList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)