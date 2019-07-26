import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../util/HttpRequest'

export const setOrderInfo = req => (dispatch) => {
    dispatch({ type: reduxActionTypes.orderInfo.set_orderInfo, payload: { order: req } })
}

export const getRequireTaskInfo = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
        loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/requireTask?orderId=${req.orderId}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.orderInfo.get_requireTaskInfoForOrderInfo_success, payload: { requireTaskInfo: res.result[0] } })
        } else {
            dispatch({ type: reduxActionTypes.orderInfo.get_requireTaskInfoForOrderInfo_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.orderInfo.get_requireTaskInfoForOrderInfo_error, payload: { errorMsg: `${err}` } })
    }
}

export const getRequireTaskInfoWaiting=()=>(dispatch)=>{
    dispatch({ type: reduxActionTypes.orderInfo.get_requireTaskInfoForOrderInfo_waiting })
}