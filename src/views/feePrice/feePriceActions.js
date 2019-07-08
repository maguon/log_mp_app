import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'
import { change } from 'redux-form'

export const getTransAndInsurePrice = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.feePrice.get_transAndInsurePriceForFee_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/transAndInsurePrice`
        const res = await httpRequest.post(url, {
            distance: req.formValues.endCity.item.distance,
            modelType: req.formValues.modelType.id,
            oldCar: req.formValues.oldCar ? 1 : 2,
            serviceType: req.formValues.serviceType.id,
            valuation: req.formValues.valuation,
            safeStatus: req.formValues.safeStatus ? 1 : 0
        })
        if (res.success) {
            dispatch({ type: reduxActionTypes.feePrice.get_transAndInsurePriceForFee_success, payload: { transAndInsurePrice: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.feePrice.get_transAndInsurePriceForFee_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.feePrice.get_transAndInsurePriceForFee_error, payload: { errorMsg: `${err}` } })
    }
}


export const validatRoute = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.feePrice.get_validatRoute_waiting })
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/route?routeStartId=${req.routeStartId}&routeEndId=${req.routeEndId}`
        const res = await httpRequest.get(url)
        if (res.success) {
            if (res.result[0]) {
                const { route_end_id, route_end, route_start_id, route_start, distance } = res.result[0]
                if (req.routeStartId == route_start_id) {
                    dispatch(change('feePriceForm', 'endCity', { id: route_end_id, value: `${route_end} ${distance}km`, item: res.result[0] }))
                } else {
                    dispatch(change('feePriceForm', 'endCity', { id: route_start_id, value: `${route_start} ${distance}km`, item: res.result[0] }))
                }
            } else {
                dispatch(change('feePriceForm', 'endCity', {}))
            }
            dispatch({ type: reduxActionTypes.feePrice.get_validatRoute_success })
        } else {
            dispatch({ type: reduxActionTypes.feePrice.get_validatRoute_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.feePrice.get_validatRoute_error, payload: { failedMsg: `${err}` } })
    }
}