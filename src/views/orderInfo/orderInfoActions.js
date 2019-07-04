import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../util/HttpRequest'

export const setCarInfo = req => (dispatch) => {
    dispatch({ type: reduxActionTypes.orderInfo.set_orderInfo, payload: { orderInfo: req } })
}