import * as reduxActionTypes from '../../../reduxActionTypes'
import httpRequest from '../../../util/HttpRequest'

export const getRouteCityList = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/route?routeStartId=${req.routeStartId}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.routeCityList.get_routeCityList_success, payload: { routeCityList: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.routeCityList.get_routeCityList_failed, payload: { failedMsg: `${res.msg}` } })
        }

    } catch (err) {
        dispatch({ type: reduxActionTypes.routeCityList.get_routeCityList_error, payload: { errorMsg: `${err}` } })
    }
}

export const getRouteCityListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.routeCityList.get_routeCityList_waiting, payload: {} })
}