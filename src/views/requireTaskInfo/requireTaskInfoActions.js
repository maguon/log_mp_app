import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'

export const setRequireTaskInfo = param => (dispatch) => {
    dispatch({ type: reduxActionTypes.requireTaskInfo.set_requireTaskInfo, payload: { requireTaskInfo: param } })
}

export const cancelRequire = req => (dispatch, getState) => {

}

export const getOrder = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order?orderId=${req.orderId}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res',res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.requireTaskInfo.get_orderForRequireTaskInfo_success, payload: { order: res.result[0] } })
        } else {
            dispatch({ type: reduxActionTypes.requireTaskInfo.get_orderForRequireTaskInfo_failed, payload: { failedMsg: `${res.msg}` } })

        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.requireTaskInfo.get_orderForRequireTaskInfo_error, payload: { errorMsg: `${err}` } })
    }
}

export const getOrderWaiting = req => (dispatch) => {
    dispatch({ type: reduxActionTypes.requireTaskInfo.get_orderForRequireTaskInfo_waiting })
}