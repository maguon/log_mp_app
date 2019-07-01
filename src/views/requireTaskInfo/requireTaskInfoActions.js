import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'

export const setRequireTaskInfo = param => (dispatch) => {
    dispatch({ type: reduxActionTypes.requireTaskInfo.set_requireTaskInfo, payload: { requireTaskInfo: param } })
}

export const cancelRequire = req => (dispatch, getState) => {

}