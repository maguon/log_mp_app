import httpRequest from '../../util/HttpRequest'
import * as reduxActionTypes from '../../reduxActionTypes'
import * as reduxActions from '../../reduxActions'
import { objectExceptNull } from '../../util/util'
import { ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'


export const consultPrice = req => async (dispatch, getState) => {
    try {
        // console.log('req', req)
        const { inquiry: { user_id, id }, formValues: { totalTransPrice, totalInsurePrice, remark } } = req
        dispatch({ type: reduxActionTypes.consult.consultPrice_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user } } } = getState()
        const url = `${base_host}/admin/${user.id}/user/${user_id}/inquiry/${id}/feePrice`
        // console.log('url', url)
        const res = await httpRequest.put(url, objectExceptNull({
            totalTransPrice,
            totalInsurePrice,
            remark
        }))
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: reduxActionTypes.consult.consultPrice_success, payload: {} })
            dispatch(reduxActions.home.getInquiryById({ inquiryId: id }))
            ToastAndroid.show('提交成功！', 10)
            Actions.pop()
        } else {
            dispatch({ type: reduxActionTypes.consult.consultPrice_failed, payload: { failedMsg: `${res.msg}` } })
            ToastAndroid.show(`提交失败！${res.msg}`, 10)
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.consult.consultPrice_error, payload: { errorMsg: `${err}` } })
        ToastAndroid.show(`提交失败！${err}`, 10)
    }
}