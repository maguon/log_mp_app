import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data: {
        inquiryCarList: []
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getInquiryCarList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.inquiryCarList.get_inquiryCarList_success]: (state, action) => {
        const { payload: { inquiryCarList } } = action
        return {
            ...state,
            data: {
                inquiryCarList
            },
            getInquiryCarList: {
                ...state.getInquiryCarList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.inquiryCarList.get_inquiryCarList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getInquiryCarList: {
                ...state.getInquiryCarList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.inquiryCarList.get_inquiryCarList_waiting]: (state, action) => {
        return {
            ...state,
            getInquiryCarList: {
                ...state.getInquiryCarList,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.inquiryCarList.get_inquiryCarList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getInquiryCarList: {
                ...state.getInquiryCarList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)