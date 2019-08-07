import * as reduxActionTypes from '../../reduxActionTypes'
import * as reduxActions from '../../reduxActions'
import httpRequest from '../../util/HttpRequest'
import localStorageKey from '../../util/LocalStorageKey'
import localStorage from '../../util/LocalStorage'
import { ObjectToUrl, objectExceptNull } from '../../util/util'
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

export const login = param => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            initViewReducer: { data: { deviceInfo: { uniqueID } }, data } } = getState()
        dispatch({ type: reduxActionTypes.login.login_waiting, payload: {} })
        let { userName, password } = param
        userName = `${userName}`.replace(/\s*/g, "")
        const url = `${base_host}/MobileLogin`
        const res = await httpRequest.post(url, objectExceptNull({
            userName,
            password,
            version: android_app.version,
            appType: android_app.type,
            deviceType: android_app.android,
            deviceId: uniqueID
        }))
        if (res.success) {
            if (res.result.type == 10 || res.result.type == 11) {
                const getUserInfoUrl = `${base_host}/admin${ObjectToUrl({ adminId: res.result.adminId })}`
                const getUserInfoRes = await httpRequest.get(getUserInfoUrl)
                if (getUserInfoRes.success) {
                    const { id, real_name, type, gender, status } = getUserInfoRes.result[0]
                    const user = {
                        id,userName, real_name, type, gender, status,
                        token: res.result.accessToken
                    }
                    requestHeaders.set('auth-token', res.result.accessToken)
                    requestHeaders.set('user-type', type)
                    requestHeaders.set('user-name', userName)
                    localStorage.save({
                        key: localStorageKey.USER,
                        data: user
                    })
                    await dispatch({ type: reduxActionTypes.login.login_success, payload: { user } })
                    dispatch(reduxActions.initView.loadDeviceToken(data))
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
        if (err.message == 'Network request failed') {
            ToastAndroid.show(`登陆失败：网络链接失败！`, 10)
            dispatch({ type: reduxActionTypes.login.login_error, payload: { errorMsg: err } })
        } else {
            ToastAndroid.show(`登陆失败：${err}`, 10)
            dispatch({ type: reduxActionTypes.login.login_error, payload: { errorMsg: err } })
        }
    }

}

// export const validateVersionForLogin = param => async (dispatch, getState) => {
//     const currentStep = 2
//     try {
//         const { initializationReducer: { data } } = getState()
//         let { mobile, password, server } = param
//         server = `${server}`.replace(/\s*/g, "")
//         mobile = `${mobile}`.replace(/\s*/g, "")
//         const base_host = `http://api.${server}/api`
//         const url = `${base_host}/app?${ObjectToUrl({ app: android_app.type, type: android_app.android })}`
//         const res = await httpRequest.get(url)
//         if (res.success) {
//             const versionInfo = {
//                 currentVersion: android_app.version,
//                 newestVersion: '',
//                 url: '',
//                 remark: '',
//                 force_update: 0
//             }

//             let versionList = res.result
//                 .filter(item => {

//                     return item.version > android_app.version

//                 })
//             // console.log('versionList', versionList)
//             //force_update:0(版本为最新版), 1(版本过低，强制更新), 2(版本过低，但不需要强制更新)
//             if (versionList.length > 0) {
//                 if (versionList.some(item => item.force_update == 1)) {
//                     versionInfo.force_update = 1
//                 } else {
//                     versionInfo.force_update = 2
//                 }
//                 versionList = versionList.sort((a, b) => {
//                     if (a.version < b.version) {
//                         return 1
//                     }
//                     if (a.version > b.version) {
//                         return -1
//                     }
//                     return 0

//                 })
//                 versionInfo.newestVersion = versionList[0].version
//                 versionInfo.url = versionList[0].url
//                 versionInfo.remark = versionList[0].remark
//             } else {
//                 versionInfo.force_update = 0
//                 versionInfo.newestVersion = versionInfo.currentVersion
//             }

//             if (versionInfo.force_update != 1) {
//                 await dispatch({
//                     type: actionTypes.initializationTypes.init_app_failed, payload: {
//                         step: currentStep + 1,
//                         msg: '登陆未执行',
//                         param: {
//                             ...data,
//                             version: versionInfo
//                         }
//                     }
//                 })
//                 dispatch(login(param))
//             } else {
//                 dispatch({
//                     type: actionTypes.initializationTypes.init_app_complete, payload: {
//                         param: {
//                             ...data,
//                             version: versionInfo
//                         }
//                     }
//                 })
//             }

//         } else {
//             if (res.msg == ' service not found !') {
//                 ToastAndroid.show('服务器地址设置错误，请重新设置！', 10)
//             }
//         }
//     } catch (err) {
//         console.log('err', err)
//         ToastAndroid.show(`初始化错误:${err}`, 10)
//     }
// }


