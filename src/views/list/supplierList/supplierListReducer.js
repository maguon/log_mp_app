import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../../reduxActionTypes'

const initialState = {
    data: {
        supplierList: []
    },
    //isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getSupplierList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [reduxActionTypes.supplierList.get_supplierList_success]: (state, action) => {
        const { payload: { supplierList } } = action
        console.log('supplierList',supplierList)
        return {
            ...state,
            data: {
                supplierList
            },
            getSupplierList: {
                ...initialState.getSupplierList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.supplierList.get_supplierList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getSupplierList: {
                ...initialState.getSupplierList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.supplierList.get_supplierList_waiting]: (state, action) => {
        return {
            ...state,
            getSupplierList: {
                ...initialState.getSupplierList,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.supplierList.get_supplierList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...initialState,
            getSupplierList: {
                ...state.getSupplierList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)