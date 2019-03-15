import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data: {
        inquiryList: []
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getInquiryList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [reduxActionTypes.home.get_inquiryList_success]: (state, action) => {
        const { payload: { inquiryList } } = action
        return {
            ...state,
            data: {
                inquiryList
            },
            getInquiryList: {
                ...initialState.getInquiryList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.home.get_inquiryList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getInquiryList: {
                ...initialState.getInquiryList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.home.get_inquiryList_waiting]: (state, action) => {
        return {
            ...state,
            getInquiryList: {
                ...initialState.getInquiryList,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.home.get_inquiryList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...initialState,
            getInquiryList: {
                ...state.getInquiryList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)