import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'

export const getInquiryCarList = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/inquiryCar?inquiryId=${req.inquiryId}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.inquiryCarList.get_inquiryCarList_success, payload: { inquiryCarList: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.inquiryCarList.get_inquiryCarList_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.inquiryCarList.get_inquiryCarList_error, payload: { errorMsg: `${err}` } })
    }
}

export const getInquiryCarListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.inquiryCarList.get_inquiryCarList_waiting, payload: {} })
}