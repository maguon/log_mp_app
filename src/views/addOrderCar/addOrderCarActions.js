import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'

export const addOrderCar = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.addOrderCar.add_orderCar_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        // console.log('req', req)
        const url = `${base_host}/admin/${id}/order/${req.order.id}/carAdmin`
        // console.log('url', url)
        // console.log('url', {
        //     brand: req.formValues.brand,
        //     brandType: req.formValues.brandType,
        //     vin: req.formValues.vin,
        //     modelType: req.formValues.modelType.id,
        //     oldCar: req.formValues.oldCar ? 1 : 2,
        //     valuation: req.formValues.valuation,
        //     safeStatus: req.formValues.safeStatus?1 : 0,
        //     actTransPrice: req.formValues.actTransPrice,
        //     actInsurePrice: req.formValues.actInsurePrice,
        //     distance: req.order.distance,
        //     serviceType:req.order.service_type
        // })
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
        console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.addOrderCar.add_orderCar_success, payload: {} })

        } else {
            dispatch({ type: reduxActionTypes.addOrderCar.add_orderCar_failed, payload: { failedMsg: `${res.msg}` } })

        }
    } catch (err) {
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
            oldCar: req.formValues.order ? 1 : 2,
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