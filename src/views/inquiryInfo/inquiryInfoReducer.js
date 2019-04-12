import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    // data: {
    //     inquiryCarList: []
    // },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    cancalInquiry: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    produceOrder:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '' 
    }
}

export default handleActions({
    [reduxActionTypes.inquiryInfo.cancal_inquiry_success]: (state, action) => {
        return {
            ...state,
            cancalInquiry: {
                ...state.cancalInquiry,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.inquiryInfo.cancal_inquiry_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            cancalInquiry: {
                ...state.cancalInquiry,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.inquiryInfo.cancal_inquiry_waiting]: (state, action) => {
        return {
            ...state,
            cancalInquiry: {
                ...state.cancalInquiry,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.inquiryInfo.cancal_inquiry_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            cancalInquiry: {
                ...state.cancalInquiry,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [reduxActionTypes.inquiryInfo.produce_order_success]: (state, action) => {
        return {
            ...state,
            produceOrder: {
                ...state.produceOrder,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.inquiryInfo.produce_order_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            produceOrder: {
                ...state.produceOrder,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.inquiryInfo.produce_order_waiting]: (state, action) => {
        return {
            ...state,
            produceOrder: {
                ...state.produceOrder,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.inquiryInfo.produce_order_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            produceOrder: {
                ...state.produceOrder,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)