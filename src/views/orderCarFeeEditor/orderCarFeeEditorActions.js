import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'
import * as reduxActions from '../../reduxActions'
import { ToastAndroid } from 'react-native'

export const updateOrderCarFee = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.orderCarFeeEditor.update_orderCarFee_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/orderItem/${req.orderCarId}/actFeeAndSafePrice`
        const res = await httpRequest.put(url, {
            actFee:req.formValues.actTransPrice,
            safePrice:req.formValues.actInsurePrice
        })
        if (res.success) {
            const orderUrl = `${base_host}/admin/${id}/order?orderId=${req.order.id}`
            const orderRes = await httpRequest.get(orderUrl)
            if (orderRes.success) {
                dispatch({ type: reduxActionTypes.orderCarFeeEditor.update_orderCarFee_success, payload: {} })
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
                dispatch({ type: reduxActionTypes.orderCarFeeEditor.update_orderCar_failed, payload: { failedMsg: `${orderRes.msg}` } })
            }
            ToastAndroid.show('修改成功！', 10)
        } else {
            dispatch({ type: reduxActionTypes.orderCarFeeEditor.update_orderCar_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.orderCarFeeEditor.update_orderCar_error, payload: { errorMsg: `${err}` } })
    }
}
