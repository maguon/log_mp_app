import * as reduxActionTypes from '../../../reduxActionTypes'
import httpRequest from '../../../util/HttpRequest'

export const getCityList = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/user/${id}/city`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.cityList.get_cityList_success, payload: { cityList: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.cityList.get_cityList_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.cityList.get_cityList_error, payload: { errorMsg: `${err}` } })
    }
}

export const getCityListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.cityList.get_cityList_waiting, payload: {} })
}