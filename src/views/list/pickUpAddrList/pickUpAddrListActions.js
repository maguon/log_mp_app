import httpRequest from '../../../util/HttpRequest'
import * as reduxActionTypes from '../../../reduxActionTypes'

export const getPickUpAddrList = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/address?city=${req.cityId}`
        const res = await httpRequest.get(url)

        if (res.success) {
            dispatch({ type: reduxActionTypes.pickUpAddrList.get_pickUpAddrList_success, payload: { pickUpAddrList: res.result } })
        } else {
            dispatch({ type: reduxActionTypes.pickUpAddrList.get_pickUpAddrList_failed, payload: { failedMsg: `${err}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.pickUpAddrList.get_pickUpAddrList_error, payload: { errorMsg: `${err}` } })
    }
}

export const getPickUpAddrListWaiting = () => async (dispatch) => {
    dispatch({ type: reduxActionTypes.pickUpAddrList.get_pickUpAddrList_waiting })
}

