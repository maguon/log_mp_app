import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../util/HttpRequest'
import { sleep, ObjectToUrl } from '../../util/util'

const pageSize = 20

export const getOrderList = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        console.log('req', req)
        let searchParam = {}
        if (req) {
            searchParam = {
                orderId: req.orderId,
                status: req.status && req.status.id ? req.status.id : null,
                status: req.paymentStatus && req.paymentStatus.id ? req.paymentStatus.id : null,
                status: req.serviceType && req.serviceType.id ? req.serviceType.id : null,
                startCityId: req.routeStart && req.routeStart.id ? req.routeStart.id : null,
                endCityId: req.routeEnd && req.routeEnd.id ? req.routeEnd.id : null,
                createdOnStart: req.createdOnStart,
                createdOnEnd: req.createdOnEnd
            }
        }
        console.log('searchParam', searchParam)
        const url = `${base_host}/admin/${id}/order${ObjectToUrl({
            start: 0,
            size: pageSize,
            ...searchParam
        })}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.orderList.get_orderList_success, payload: { 
                orderList: res.result,
                isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0),
                searchParam: req ? req : null
             } })
        } else {
            dispatch({ type: reduxActionTypes.orderList.get_orderList_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: reduxActionTypes.orderList.get_orderList_error, payload: { errorMsg: `${err}` } })
    }
}

export const getOrderListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.orderList.get_orderList_waiting })
}


export const getOrderListMore = () => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } },
        loginReducer: { data: { user: { id } } },
        orderListReducer: { data: { orderList, isCompleted, searchParam } },
        orderListReducer } = getState()
    let searchReq = {}
    if (searchParam) {
        searchReq = {
            orderId: searchParam.orderId,
            status: searchParam.status && searchParam.status.id ? searchParam.status.id : null,
            status: searchParam.paymentStatus && searchParam.paymentStatus.id ? searchParam.paymentStatus.id : null,
            status: searchParam.serviceType && searchParam.serviceType.id ? searchParam.serviceType.id : null,
            startCityId: searchParam.routeStart && searchParam.routeStart.id ? searchParam.routeStart.id : null,
            endCityId: searchParam.routeEnd && searchParam.routeEnd.id ? searchParam.routeEnd.id : null,
            createdOnStart: searchParam.createdOnStart,
            createdOnEnd: searchParam.createdOnEnd
        }
    }
    console.log('searchReq',searchReq)
    if (orderListReducer.getOrderListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getOrderListMore)
    } else {
        if (!isCompleted) {
            dispatch({ type: reduxActionTypes.orderList.get_orderListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/admin/${id}/order${ObjectToUrl({
                    start: orderList.length,
                    size: pageSize,
                    ...searchReq
                })}`
                console.log('url', url)
                const res = await httpRequest.get(url)
                console.log('res', res)
                if (res.success) {
                    dispatch({
                        type: reduxActionTypes.orderList.get_orderListMore_success, payload: {
                            orderList: res.result,
                            isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0),
                        }
                    })
                } else {
                    dispatch({ type: reduxActionTypes.orderList.get_orderListMore_error, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                dispatch({ type: reduxActionTypes.orderList.get_orderListMore_error, payload: { errorMsg: `${err}` } })
            }
        }
    }
}