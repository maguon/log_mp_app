import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../util/HttpRequest'

export const createRoute = req => (dispatch) => {
    try {

    } catch (err) {
        dispatch({ type: reduxActionTypes.createRoute.create_route_error, payload: { errorMsg: `${err}` } })
    }

}