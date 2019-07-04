import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../util/HttpRequest'

export const getRouteCarList = req => (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/order/${req.orderId}/loadTask${req.loadTaskId}/loadTaskDetail`
        console.log('url', url)
        const res = httpRequest.get(url)
        console.log('res', res)
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