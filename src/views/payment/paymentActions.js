import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'

export const getPaymentList = req => async (dispatch, getState) => {
    try {
        console.log('req',req)
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/payment?orderId=${req.order.id}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.payment.get_paymentList_success, payload: { paymentList: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.payment.get_paymentList_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        console.log('err',err)
        dispatch({ type: reduxActionTypes.payment.get_paymentList_error, payload: { errorMsg: `${err}` } })
    }
}


export const getPaymentListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.payment.get_paymentList_waiting })
}