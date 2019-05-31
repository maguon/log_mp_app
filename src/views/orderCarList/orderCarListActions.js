import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'
import * as reduxActions from '../../reduxActions'
import { Actions } from 'react-native-router-flux'
import { InteractionManager } from 'react-native'

export const getOrderCarList = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/orderItem?orderId=${req.orderId}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.orderCarList.get_orderCarList_success, payload: { orderCarList: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.orderCarList.get_orderCarList_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.orderCarList.get_orderCarList_error, payload: { errorMsg: `${err}` } })
    }
}

export const getOrderCarListWaiting = req => (dispatch, getState) => {
    dispatch({ type: reduxActionTypes.orderCarList.get_orderCarList_waiting, payload: {} })
}

export const getOrderCarById = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/orderItem?orderId=${req.orderId}&orderItemId=${req.orderItemId}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.orderCarList.get_orderCarById_success, payload: { orderCar: res.result[0] } })
        } else {
            dispatch({ type: reduxActionTypes.orderCarList.get_orderCarById_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.orderCarList.get_orderCarById_error, payload: { errorMsg: `${err}` } })
    }
}

export const getOrderCarByCarId = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/orderItem?orderId=${req.orderId}&orderItemId=${req.orderItemId}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.orderCarList.get_orderCarByCarId_success, payload: { orderCar: res.result[0] } })
        } else {
            dispatch({ type: reduxActionTypes.orderCarList.get_orderCarByCarId_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        console.log('err',err)
        dispatch({ type: reduxActionTypes.orderCarList.get_orderCarByCarId_error, payload: { errorMsg: `${err}` } })
    }
}

export const delOrderCar = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.orderCarList.del_orderCar_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const { orderId, orderItemId } = req
        const url = `${base_host}/admin/${id}/orderItem/${req.orderItemId}`
        const res = await httpRequest.del(url)
        if (res.success) {
            Actions.popTo('orderCarList')
            InteractionManager.runAfterInteractions(() => {
                dispatch({ type: reduxActionTypes.orderCarList.del_orderCar_success, payload: { orderItemId } })
                dispatch(reduxActions.orderListNotInfo.getOrderNotInfoById({ orderId }))
            })
        } else {
            dispatch({ type: reduxActionTypes.orderCarList.del_orderCar_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.orderCarList.del_orderCar_error, payload: { errorMsg: `${err}` } })
    }
}


export const getOrderCarByCarIdAddList = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/orderItem?orderId=${req.orderId}&orderItemId=${req.orderItemId}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.orderCarList.get_orderCarByCarIdAddList_success, payload: { orderCar: res.result[0] } })
        } else {
            dispatch({ type: reduxActionTypes.orderCarList.get_orderCarByCarIdAddList_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.orderCarList.get_orderCarByCarIdAddList_error, payload: { errorMsg: `${err}` } })
    }
}