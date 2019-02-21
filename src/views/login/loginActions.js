import * as reduxActionTypes from '../../reduxActionTypes'
import httpRequest from '../../util/HttpRequest'
import localStorageKey from '../../util/LocalStorageKey'
import localStorage from '../../util/LocalStorage'
import { ObjectToUrl } from '../../util/util'
import requestHeaders from '../../util/RequestHeaders'

import { ToastAndroid } from 'react-native'
import * as android_app from '../../config/android_app.json'


export const cleanLogin = () => async (dispatch, getState) => {
    const { loginReducer: { data: { user } } } = getState()
    localStorage.save({
        key: localStorageKey.USER,
        data: {
            mobile: user.mobile
        }
    })
    dispatch({ type: reduxActionTypes.login.clean_login, payload: { mobile: user.mobile } })
}

export const login = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            initViewReducer: { data: {
                version: { currentVersion },
                deviceInfo: { deviceToken } } } } = getState()
        dispatch({ type: reduxActionTypes.login.login_waiting, payload: {} })
        let { mobile, password, server } = req
        server = `${server}`.replace(/\s*/g, "")
        mobile = `${mobile}`.replace(/\s*/g, "")

        const url = `${base_host}/mobileUserLogin?${ObjectToUrl({
            version: currentVersion,
            appType: android_app.type,
            deviceType: 1,
            deviceToken
        })}`
        const res = await httpRequest.post(url, { mobile, password })
        if (res.success) {
            if (res.result.type == 10) {
                const getUserInfoUrl = `${base_host}/user?${ObjectToUrl({ userId: res.result.userId })}`
                const getUserInfoRes = await httpRequest.get(getUserInfoUrl)
                if (getUserInfoRes.success) {
                    const { uid, mobile, real_name, type, gender, avatar_image, status, drive_id } = getUserInfoRes.result[0]
                    const user = {
                        uid, mobile, real_name, type, gender, avatar_image, status,
                        token: res.result.accessToken, drive_id
                    }
                    requestHeaders.set('auth-token', res.result.accessToken)
                    requestHeaders.set('user-type', type)
                    requestHeaders.set('user-name', mobile)
                    localStorage.save({
                        key: localStorageKey.USER,
                        data: user
                    })
                    await dispatch({ type: reduxActionTypes.login.login_success, payload: { user } })
                } else {
                    ToastAndroid.show(`登陆失败：无法获取用户信息！`, 10)
                    dispatch({ type: reduxActionTypes.login.login_failed, payload: { failedMsg: '无法获取用户信息！' } })
                }
            }
            else {
                ToastAndroid.show(`登陆失败：身份错误！`, 10)
                dispatch({ type: reduxActionTypes.login.login_failed, payload: { failedMsg: '身份错误！' } })
            }
        } else {
            //登录失败重新登录
            ToastAndroid.show(`登陆失败：${res.msg}`, 10)
            dispatch({ type: reduxActionTypes.login.login_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        ToastAndroid.show(`登陆失败：${err}`, 10)
        dispatch({ type: reduxActionTypes.login.login_error, payload: { errorMsg: err } })

    }

}

