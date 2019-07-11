import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../reduxActionTypes'

const initialState = {
    data:{
        pickUpAddrList:[]
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getPickUpAddrList:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.pickUpAddrList.get_pickUpAddrList_success]: (state, action) => {
        const { payload: { pickUpAddrList } } = action
        return {
            ...state,
            data:{
                pickUpAddrList
            },
            getPickUpAddrList: {
                ...state.getPickUpAddrList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.pickUpAddrList.get_pickUpAddrList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getPickUpAddrList: {
                ...state.getPickUpAddrList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.pickUpAddrList.get_pickUpAddrList_waiting]: (state, action) => {
        return {
            ...state,
            getPickUpAddrList: {
                ...state.getPickUpAddrList,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.pickUpAddrList.get_pickUpAddrList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getPickUpAddrList: {
                ...state.getPickUpAddrList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)