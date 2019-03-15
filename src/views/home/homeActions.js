import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'
import { sleep, ObjectToUrl } from '../../util/util'

const pageSize = 20

export const getInquiryList = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/inquiry${ObjectToUrl({
            // userId: id,
            start: 0,
            size: pageSize
        })}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.home.get_inquiryList_success, payload: { inquiryList: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.home.get_inquiryList_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: reduxActionTypes.home.get_inquiryList_error, payload: { errorMsg: `${err}` } })

    }
}

export const getInquiryListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.home.get_inquiryList_waiting })
}