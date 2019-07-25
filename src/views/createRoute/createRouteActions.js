import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../util/HttpRequest'
import { objectExceptNull } from '../../util/util'

export const createRoute = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order/${req.orderId}/require/${req.requireId}/loadTask`
        const res = await httpRequest.post(url, objectExceptNull({
            routeStart: req.values.routeStart ? req.values.routeStart.value : null,
            routeEnd: req.values.routeEnd ? req.values.routeEnd.value : null,
            routeStartDetail: req.values.routeStartDetail ? req.values.routeStartDetail : null,
            routeEndDetail: req.values.routeEndDetail ? req.values.routeEndDetail : null,
            routeStartId: req.values.routeStart ? req.values.routeStart.id : null,
            routeEndId: req.values.routeEnd ? req.values.routeEnd.id : null,
            supplierId: req.values.supplier ? req.values.supplier.id : null,
            transType: req.values.transType ? req.values.transType.id : null,
            planDate: req.values.planDate,
            remark: req.values.remark,
        }))
        if (res.success) {
            dispatch({ type: reduxActionTypes.createRoute.create_route_success })
        } else {
            dispatch({ type: reduxActionTypes.createRoute.create_route_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.createRoute.create_route_error, payload: { errorMsg: `${err}` } })
    }
}