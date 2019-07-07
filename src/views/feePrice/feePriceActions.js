import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'

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