import httpRequest from '../../../util/HttpRequest'
import * as reduxActionTypes from '../../../reduxActionTypes'
import { sleep, ObjectToUrl } from '../../../util/util'

const pageSize = 20

export const getOrderListNotInfo = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order${ObjectToUrl({
            // status: 0,
            start: 0,
            size: pageSize
        })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            // console.log('res.result',res.result)
            dispatch({
                type: reduxActionTypes.orderListNotInfo.get_orderListNotInfo_success, payload: {
                    orderListNotInfo: res.result,
                    isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: reduxActionTypes.orderListNotInfo.get_orderListNotInfo_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err',err)

        dispatch({ type: reduxActionTypes.orderListNotInfo.get_orderListNotInfo_error, payload: { errorMsg: `${err}` } })
    }
}

export const getOrderListNotInfoWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.orderListNotInfo.get_orderListNotInfo_waiting, payload: {} })
}

export const getOrderListNotInfoMore = () => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } },
        loginReducer: { data: { user: { id } } },
        orderListNotInfoReducer: { data: { orderListNotInfo, isCompleted } },
        orderListNotInfoReducer } = getState()
    if (orderListNotInfoReducer.getOrderListNotInfoMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getOrderListNotInfoMore)
    } else {
        if (!isCompleted) {
            dispatch({ type: reduxActionTypes.orderListNotInfo.get_orderListNotInfoMore_waiting, payload: {} })
            try {
                const url = `${base_host}/admin/${id}/order${ObjectToUrl({
                    // status: 0,
                    start: orderListNotInfo.length,
                    size: pageSize
                })}`
                // console.log('url', url)
                const res = await httpRequest.get(url)
                // console.log('res', res)
                if (res.success) {
                    dispatch({
                        type: reduxActionTypes.orderListNotInfo.get_orderListNotInfoMore_success, payload: {
                            orderListNotInfo: res.result,
                            isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0),
                        }
                    })
                } else {
                    dispatch({ type: reduxActionTypes.orderListNotInfo.get_orderListNotInfoMore_failed, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                dispatch({ type: reduxActionTypes.orderListNotInfo.get_orderListNotInfoMore_error, payload: { errorMsg: `${err}` } })
            }
        }
    }
}

export const getOrderNotInfoById = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order?orderId=${req.orderId}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.orderListNotInfo.get_orderNotInfoById_success, payload: { order:res.result[0] } })

        } else {
            dispatch({ type: reduxActionTypes.orderListNotInfo.get_orderNotInfoById_failed, payload: { errorMsg: `${res.msg}` } })

        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.orderListNotInfo.get_orderNotInfoById_error, payload: { errorMsg: `${err}` } })
    }
}