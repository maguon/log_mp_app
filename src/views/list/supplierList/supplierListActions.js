import * as reduxActionTypes from '../../../reduxActionTypes'
import httpRequest from '../../../util/HttpRequest'

export const getSupplierList = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/supplier`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.supplierList.get_supplierList_success, payload: { supplierList: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.supplierList.get_supplierList_failed, payload: { failedMsg: `${res.msg}` } })
        }

    } catch (err) {
        dispatch({ type: reduxActionTypes.supplierList.get_supplierList_error, payload: { errorMsg: `${err}` } })
    }
}

export const getSupplierListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.supplierList.get_supplierList_waiting, payload: {} })
}