import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../util/HttpRequest'

export const setOrderInfo = req => (dispatch) => {
    dispatch({ type: reduxActionTypes.orderInfo.set_orderInfo, payload: { order: req } })
}