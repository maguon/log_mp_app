import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'
import * as reduxActions from '../../reduxActions'
import { ToastAndroid } from 'react-native'

export const addOrderCar = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.addOrderCar.add_orderCar_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order/${req.order.id}/carAdmin`
        const res = await httpRequest.post(url, {
            brand: req.formValues.brand,
            brandType: req.formValues.brandType,
            vin: req.formValues.vin,
            modelType: req.formValues.modelType.id,
            oldCar: req.formValues.oldCar ? 1 : 2,
            valuation: req.formValues.valuation,
            safeStatus: req.formValues.safeStatus ? 1 : 0,
            actTransPrice: req.formValues.actTransPrice,
            actInsurePrice: req.formValues.actInsurePrice,
            distance: req.order.distance,
            serviceType: req.order.service_type
        })
        if (res.success) {

            const orderUrl = `${base_host}/admin/${id}/order?orderId=${req.order.id}`
            console.log('orderUrl', orderUrl)
            const orderRes = await httpRequest.get(orderUrl)
            console.log('orderRes', orderRes)
            if (orderRes.success) {
                dispatch({ type: reduxActionTypes.addOrderCar.add_orderCar_success, payload: {} })
                dispatch({ type: reduxActionTypes.orderListNotInfo.get_orderNotInfoById_success, payload: { order: orderRes.result[0] } })
                dispatch({ type: reduxActionTypes.order.init_order, payload: { order: orderRes.result[0] } })
                dispatch({ type: reduxActionTypes.orderList.set_orderForOrderList, payload: { order: orderRes.result[0] } })
                dispatch(reduxActions.orderCarList.getOrderCarByCarIdAddList({
                    orderId: req.order.id,
                    orderItemId: res.result[0].orderItemId
                }))

                ToastAndroid.show('创建成功！', 10)
            } else {
                dispatch({ type: reduxActionTypes.addOrderCar.add_orderCar_failed, payload: { failedMsg: `${orderRes.msg}` } })
            }

        } else {
            dispatch({ type: reduxActionTypes.addOrderCar.add_orderCar_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: reduxActionTypes.addOrderCar.add_orderCar_error, payload: { errorMsg: `${err}` } })
    }
}


export const getTransAndInsurePrice = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.addOrderCar.get_transAndInsurePrice_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/transAndInsurePrice`
        const res = await httpRequest.post(url, {
            distance: req.order.distance,
            modelType: req.formValues.modelType.id,
            oldCar: req.formValues.oldCar ? 1 : 2,
            serviceType: req.order.service_type,
            valuation: req.formValues.valuation,
            safeStatus: req.formValues.safeStatus ? 1 : 0
        })
        if (res.success) {
            dispatch({ type: reduxActionTypes.addOrderCar.get_transAndInsurePrice_success, payload: { transAndInsurePrice: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.addOrderCar.get_transAndInsurePrice_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.addOrderCar.get_transAndInsurePrice_error, payload: { errorMsg: `${err}` } })
    }
}