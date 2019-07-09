import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'
import { ToastAndroid} from 'react-native'
import { sleep, ObjectToUrl, objectExceptNull } from '../../util/util'


export const createOrder = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.createOrder.createOrder_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order`
        const res = await httpRequest.post(url, {
            routeStartId: req.startCity.id,
            routeEndId: req.endCity.id,
            serviceType: req.serviceType.id,
            departureTime: req.departureTime
        })
        if (res.success) {
            dispatch({ type: reduxActionTypes.createOrder.createOrder_success, payload: {} })
            ToastAndroid.show('创建成功！',10)
        } else {
            dispatch({ type: reduxActionTypes.createOrder.createOrder_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.createOrder.createOrder_error, payload: { errorMsg: `${err}` } })
    }
}