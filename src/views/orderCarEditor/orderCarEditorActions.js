import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'
import * as reduxActions from '../../reduxActions'
import { ToastAndroid } from 'react-native'

export const updateOrderCar = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.orderCarEditor.update_orderCar_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/orderItem/${req.orderCarId}/orderItemInfo`
        const res = await httpRequest.put(url, {
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
            const orderRes = await httpRequest.get(orderUrl)

            if (orderRes.success) {
                dispatch({ type: reduxActionTypes.orderCarEditor.update_orderCar_success, payload: {} })
                dispatch(reduxActions.orderCarList.getOrderCarByCarId({
                    orderId: req.order.id,
                    orderItemId: req.orderCarId
                }))
                dispatch(reduxActions.order.initOrder({ order: orderRes.result[0] }))
                if (req.order.status == 0) {
                    dispatch({ type: reduxActionTypes.orderListNotInfo.set_orderForNotInfo, payload: { order: orderRes.result[0] } })
                } else if (req.order.status == 1) {
                    dispatch({ type: reduxActionTypes.orderListNotPrice.set_orderForNotPrice, payload: { order: orderRes.result[0] } })
                } else if (req.order.status == 2) {
                    dispatch({ type: reduxActionTypes.orderListNotDemand.set_orderForNotDemand, payload: { order: orderRes.result[0] } })
                } else if (req.order.status == 3) {
                    dispatch({ type: reduxActionTypes.orderListNotRoute.set_orderForNotRoute, payload: { order: orderRes.result[0] } })
                }
            } else {
                dispatch({ type: reduxActionTypes.orderCarEditor.update_orderCar_failed, payload: { failedMsg: `${orderRes.msg}` } })
            }

            ToastAndroid.show('修改成功！', 10)
        } else {
            dispatch({ type: reduxActionTypes.orderCarEditor.update_orderCar_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.orderCarEditor.update_orderCar_error, payload: { errorMsg: `${err}` } })
    }
}


export const getTransAndInsurePrice = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.orderCarEditor.get_transAndInsurePriceForEditor_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/transAndInsurePrice`
        const res = await httpRequest.post(url, {
            distance: req.distance,
            modelType: req.modelType,
            oldCar: req.oldCar,
            serviceType: req.serviceType,
            valuation: req.valuation,
            safeStatus: req.safeStatus
        })
        if (res.success) {
            dispatch({ type: reduxActionTypes.orderCarEditor.get_transAndInsurePriceForEditor_success, payload: { transAndInsurePrice: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.orderCarEditor.get_transAndInsurePriceForEditor_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.orderCarEditor.get_transAndInsurePriceForEditor_error, payload: { errorMsg: `${err}` } })
    }
}