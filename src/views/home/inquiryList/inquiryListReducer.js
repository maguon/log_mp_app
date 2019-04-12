import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../reduxActionTypes'

const initialState = {
    data: {
        inquiryList: [],
        searchParam: {},
        isCompleted: false
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getInquiryList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getInquiryListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getInquiryById:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.inquiryList.get_inquiryList_success]: (state, action) => {
        const { payload: { inquiryList, isCompleted, searchParam } } = action
        return {
            ...state,
            data: {
                inquiryList,
                isCompleted,
                searchParam
            },
            getInquiryList: {
                ...state.getInquiryList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.inquiryList.get_inquiryList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getInquiryList: {
                ...state.getInquiryList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.inquiryList.get_inquiryList_waiting]: (state, action) => {
        return {
            ...state,
            getInquiryList: {
                ...state.getInquiryList,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.inquiryList.get_inquiryList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getInquiryList: {
                ...state.getInquiryList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [reduxActionTypes.inquiryList.get_inquiryListMore_success]: (state, action) => {
        const { payload: { inquiryList, isCompleted } } = action
        return {
            ...state,
            data: {
                ...state.data,
                inquiryList: [...state.data.inquiryList, ...inquiryList],
                isCompleted
            },
            getInquiryListMore: {
                ...initialState.getInquiryListMore,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.inquiryList.get_inquiryListMore_waiting]: (state, action) => {
        return {
            ...state,
            getInquiryListMore: {
                ...initialState.getInquiryListMore,
                isResultStatus: 1,
            }
        }
    },
    [reduxActionTypes.inquiryList.get_inquiryListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getInquiryListMore: {
                ...initialState.getInquiryListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.inquiryList.get_inquiryListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getInquiryListMore: {
                ...initialState.getInquiryListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [reduxActionTypes.inquiryList.get_inquiryById_success]: (state, action) => {
        const { payload: { inquiryInfo } } = action
        // const inquiryList=
        return {
            ...state,
            data: {
                ...state.data,
                inquiryList:state.data.inquiryList.map(item=>{
                    if(item.id==inquiryInfo.id){
                        return inquiryInfo
                    }else{
                        return item
                    }
                })
            },
            getInquiryById: {
                ...state.getInquiryById,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.inquiryList.get_inquiryById_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getInquiryById: {
                ...state.getInquiryById,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.inquiryList.get_inquiryById_waiting]: (state, action) => {
        return {
            ...state,
            getInquiryById: {
                ...state.getInquiryById,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.inquiryList.get_inquiryById_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getInquiryById: {
                ...state.getInquiryById,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)