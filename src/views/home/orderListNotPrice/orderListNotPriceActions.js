import httpRequest from '../../../util/HttpRequest'
import * as reduxActionTypes from '../../../reduxActionTypes'
import { sleep, ObjectToUrl } from '../../../util/util'

const pageSize = 20

export const getOrderListNotPrice = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order${ObjectToUrl({
            status: 1,
            start: 0,
            size: pageSize
        })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            // console.log('res.result',res.result)
            dispatch({
                type: reduxActionTypes.orderListNotPrice.get_orderListNotPrice_success, payload: {
                    orderListNotPrice: res.result,
                    isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: reduxActionTypes.orderListNotPrice.get_orderListNotPrice_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err',err)
        dispatch({ type: reduxActionTypes.orderListNotPrice.get_orderListNotPrice_error, payload: { errorMsg: `${err}` } })
    }
}

export const getOrderListNotPriceWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.orderListNotPrice.get_orderListNotPrice_waiting, payload: {} })
}

export const getOrderListNotPriceMore = () => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } },
        loginReducer: { data: { user: { id } } },
        orderListNotPriceReducer: { data: { orderListNotPrice, isCompleted } },
        orderListNotPriceReducer } = getState()
    if (orderListNotPriceReducer.getOrderListNotPriceMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getOrderListNotPriceMore)
    } else {
        if (!isCompleted) {
            dispatch({ type: reduxActionTypes.orderListNotPrice.get_orderListNotPriceMore_waiting, payload: {} })
            try {
                const url = `${base_host}/admin/${id}/order${ObjectToUrl({
                    status: 1,
                    start: orderListNotPrice.length,
                    size: pageSize
                })}`
                // console.log('url', url)
                const res = await httpRequest.get(url)
                // console.log('res', res)
                if (res.success) {
                    dispatch({
                        type: reduxActionTypes.orderListNotPrice.get_orderListNotPriceMore_success, payload: {
                            orderListNotPrice: res.result,
                            isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0),
                        }
                    })
                } else {
                    dispatch({ type: reduxActionTypes.orderListNotPrice.get_orderListNotPriceMore_failed, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                // console.log('err',err)
                dispatch({ type: reduxActionTypes.orderListNotPrice.get_orderListNotPriceMore_error, payload: { errorMsg: `${err}` } })
            }
        }
    }
}

export const getOrderNotPriceById = req => async (dispatch, getState) => {

}