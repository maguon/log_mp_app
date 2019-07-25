import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../util/HttpRequest'
import * as reduxActions from '../../reduxActions'
import { ToastAndroid } from 'react-native'
import { sleep, ObjectToUrl } from '../../util/util'

export const changePassword = param => async (dispatch, getState) => {
    try {
        const { oldPassword, newPassword } = param
        dispatch({ type: reduxActionTypes.changePassword.change_password_waiting, payload: {} })
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id ,phone} } } } = getState()
        const url = `${base_host}/admin/${id}/password`
        const res = await httpRequest.put(url, {
            originPassword: oldPassword,
            newPassword
        })
        if (res.success) {
            ToastAndroid.show('修改成功！', 10)
            dispatch({ type: reduxActionTypes.changePassword.change_password_success, payload: {} })
            dispatch(reduxActions.login.cleanLogin({ phone: phone }))

        } else {
            dispatch({ type: reduxActionTypes.changePassword.change_password_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.changePassword.change_password_error, payload: { errorMsg: `${err}` } })
    }
}