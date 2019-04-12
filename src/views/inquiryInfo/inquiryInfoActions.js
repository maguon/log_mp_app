import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'
import * as reduxActions from '../../reduxActions'

export const cancalInquiry = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        dispatch({ type: reduxActionTypes.inquiryInfo.cancal_inquiry_waiting, payload: {} })
        const url = `${base_host}/admin/${id}/inquiry/${req.inquiryId}/cancel`
        // console.log('url', url)
        const res = await httpRequest.put(url, {})
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.inquiryInfo.cancal_inquiry_success, payload: {} })
            dispatch(reduxActions.home.getInquiryById({ inquiryId: req.inquiryId }))
        } else {
            dispatch({ type: reduxActionTypes.inquiryInfo.cancal_inquiry_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.inquiryInfo.cancal_inquiry_error, payload: { errorMsg: `${err}` } })
    }
}

export const produceOrder = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        dispatch({ type: reduxActionTypes.inquiryInfo.produce_order_waiting, payload: {} })
        const url = `${base_host}/admin/${id}/inquiry/${req.inquiryId}/order`
        // console.log('url', url)
        // console.log('req', req)
        const res = await httpRequest.post(url, {})
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.inquiryInfo.produce_order_success, payload: {} })
            dispatch(reduxActions.home.getInquiryById({ inquiryId: req.inquiryId }))

        } else {
            dispatch({ type: reduxActionTypes.inquiryInfo.produce_order_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err',err)
        dispatch({ type: reduxActionTypes.inquiryInfo.produce_order_error, payload: { errorMsg: `${err}` } })
    }
}