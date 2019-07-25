import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'

export const getPaymentList = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/payment?orderId=${req.order.id}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.payment.get_paymentList_success, payload: { paymentList: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.payment.get_paymentList_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.payment.get_paymentList_error, payload: { errorMsg: `${err}` } })
    }
}


export const getPaymentListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.payment.get_paymentList_waiting })
}