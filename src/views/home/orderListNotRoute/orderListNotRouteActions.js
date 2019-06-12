import httpRequest from '../../../util/HttpRequest'
import * as reduxActionTypes from '../../../reduxActionTypes'
import { sleep, ObjectToUrl } from '../../../util/util'
import { ToastAndroid } from 'react-native'

const pageSize = 20

export const getOrderListNotRoute = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order${ObjectToUrl({
            status: 3,
            start: 0,
            size: pageSize
        })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            // console.log('res.result',res.result)
            dispatch({
                type: reduxActionTypes.orderListNotRoute.get_orderListNotRoute_success, payload: {
                    orderListNotRoute: res.result,
                    isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: reduxActionTypes.orderListNotRoute.get_orderListNotRoute_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err',err)
        dispatch({ type: reduxActionTypes.orderListNotRoute.get_orderListNotRoute_error, payload: { errorMsg: `${err}` } })
    }
}

export const getOrderListNotRouteWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.orderListNotRoute.get_orderListNotRoute_waiting, payload: {} })
}

export const getOrderListNotRouteMore = () => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } },
        loginReducer: { data: { user: { id } } },
        orderListNotRouteReducer: { data: { orderListNotRoute, isCompleted } },
        orderListNotRouteReducer } = getState()
    if (orderListNotRouteReducer.getOrderListNotRouteMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getOrderListNotRouteMore)
    } else {
        if (!isCompleted) {
            dispatch({ type: reduxActionTypes.orderListNotRoute.get_orderListNotRouteMore_waiting, payload: {} })
            try {
                const url = `${base_host}/admin/${id}/order${ObjectToUrl({
                    status: 3,
                    start: orderListNotRoute.length,
                    size: pageSize
                })}`
                // console.log('url', url)
                const res = await httpRequest.get(url)
                // console.log('res', res)
                if (res.success) {
                    dispatch({
                        type: reduxActionTypes.orderListNotRoute.get_orderListNotRouteMore_success, payload: {
                            orderListNotRoute: res.result,
                            isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0),
                        }
                    })
                } else {
                    dispatch({ type: reduxActionTypes.orderListNotRoute.get_orderListNotRouteMore_failed, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                // console.log('err',err)
                dispatch({ type: reduxActionTypes.orderListNotRoute.get_orderListNotRouteMore_error, payload: { errorMsg: `${err}` } })
            }
        }
    }
}

export const getOrderNotRouteById = req => async (dispatch, getState) => {

}
