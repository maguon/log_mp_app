import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../util/HttpRequest'
import { ToastAndroid } from 'react-native'
import { objectExceptNull } from '../../util/util'

export const getRouteCarList = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order/${req.orderId}/loadTask/${req.loadTaskId}/loadTaskDetail?arrangeFlag=2`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.routeCarList.get_routeCarList_success, payload: { routeCarList: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.routeCarList.get_routeCarList_failed, payload: { errorMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.routeCarList.get_routeCarList_error, payload: { errorMsg: `${err}` } })
    }
}

export const getRouteCarListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.routeCarList.get_routeCarList_waiting })
}

export const addLoadTaskDetail = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.routeCarList.add_loadTaskDetail_waiting })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/loadTask/${req.loadTaskInfo.id}/loadTaskDetail`
        const res = await httpRequest.post(url, objectExceptNull({
            orderItemId: req.car.order_item_id,
            vin: req.car.vin,
            supplierTransPrice: `${req.car.supplier_trans_price}`,
            supplierInsurePrice: `${req.car.supplier_insure_price}`
        }))
        if (res.success) {
            const routeLoadTaskUrl = `${base_host}/admin/${id}/routeLoadTask?loadTaskId=${req.loadTaskInfo.id}`
            const routeLoadTaskRes = await httpRequest.get(routeLoadTaskUrl)
            if (routeLoadTaskRes.success) {
                dispatch({ type: reduxActionTypes.loadTaskList.get_loadTaskById_success, payload: { loadTaskInfo: routeLoadTaskRes.result[0] } })
                dispatch({ type: reduxActionTypes.loadTaskInfo.set_loadTaskInfo, payload: { loadTaskInfo: routeLoadTaskRes.result[0] } })
                dispatch({ type: reduxActionTypes.routeTaskListForOrder.get_routeTaskListForOrderById_success, payload: { loadTaskInfo: routeLoadTaskRes.result[0] } })
                dispatch({
                    type: reduxActionTypes.routeCarList.add_loadTaskDetail_success, payload: {
                        routeCar: {
                            ...req.car,
                            dp_load_task_id: req.loadTaskInfo.id,
                            load_task_detail_id: res.id
                        }
                    }
                })
            } else {
                dispatch({ type: reduxActionTypes.routeCarList.add_loadTaskDetail_failed, payload: { failedMsg: `${routeLoadTaskRes.msg}` } })
            }
        } else {
            dispatch({ type: reduxActionTypes.routeCarList.add_loadTaskDetail_failed, payload: { failedMsg: `${res.msg}` } })

        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.routeCarList.add_loadTaskDetail_error, payload: { errorMsg: `${err}` } })
    }
}

export const delloadTaskDetail = req => async (dispatch, getState) => {
    try {
        dispatch({ type: reduxActionTypes.routeCarList.del_loadTaskDetail_waiting })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/loadTask/${req.loadTaskId}/loadTaskDetail/${req.loadTaskDetailId}`
        const res = await httpRequest.del(url)

        if (res.success) {
            const routeLoadTaskUrl = `${base_host}/admin/${id}/routeLoadTask?loadTaskId=${req.loadTaskId}`
            const routeLoadTaskRes = await httpRequest.get(routeLoadTaskUrl)
            if (routeLoadTaskRes.success) {
                dispatch({ type: reduxActionTypes.loadTaskList.get_loadTaskById_success, payload: { loadTaskInfo: routeLoadTaskRes.result[0] } })
                dispatch({ type: reduxActionTypes.loadTaskInfo.set_loadTaskInfo, payload: { loadTaskInfo: routeLoadTaskRes.result[0] } })
                dispatch({ type: reduxActionTypes.routeCarList.del_loadTaskDetail_success, payload: { loadTaskDetailId: req.loadTaskDetailId } })
                dispatch({ type: reduxActionTypes.routeTaskListForOrder.get_routeTaskListForOrderById_success, payload: { loadTaskInfo: routeLoadTaskRes.result[0] } })
            } else {
                dispatch({ type: reduxActionTypes.routeCarList.del_loadTaskDetail_failed, payload: { failedMsg: `${routeLoadTaskRes.msg}` } })
            }
        } else {
            ToastAndroid.show(`删除失败：${res.msg}`, 20)
            dispatch({ type: reduxActionTypes.routeCarList.del_loadTaskDetail_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.routeCarList.del_loadTaskDetail_error, payload: { errorMsg: `${err}` } })
    }
}