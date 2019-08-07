import * as reduxActions from '../../reduxActions'
import * as reduxActionTypes from '../../reduxActionTypes'
import localStorageKey from '../../util/LocalStorageKey'
import localStorage from '../../util/LocalStorage'
import httpRequest from '../../util/HttpRequest'
import { ObjectToUrl } from '../../util/util'
import requestHeaders from '../../util/RequestHeaders'
import * as android_app from '../../config/android_app.json'
import { Actions } from 'react-native-router-flux'
import { NativeModules } from 'react-native'
import DeviceInfo from 'react-native-device-info'

export const start = () => async (dispatch, getState) => {
    dispatch({ type: reduxActionTypes.initView.init_app_waiting })
    dispatch(loadUniqueID({
        version: {
            currentVersion: '',
            newestVersion: '',
            force_update: 0,//0(版本为最新版), 1(版本过低，强制更新), 2(版本过低，但不需要强制更新)
            url: '',
            remark: ''
        },
        deviceInfo: {
            uniqueID: ''
        }
    }))
}

/** 
 * 第一步：获取uniqueID，
 *          如果localStorage中有，从localStorage中取，
 *          如果没有DeviceInfo.getUniqueID()获取
 */
export const loadUniqueID = param => async (dispatch, getState) => {
    let uniqueID
    try {
        uniqueID = await localStorage.load({ key: localStorageKey.UNIQUEID })
    } catch (err) {
        uniqueID = DeviceInfo.getUniqueID()
    }
    dispatch(validateVersion({ ...param, deviceInfo: { ...param.deviceInfo, uniqueID } }))
}

/** 
 * 第三步：获取最新version信息并对比，
 *          如果获取失败，停止初始化流程，等待用户手动点击获取
 *          如果获取成功，对比是否需要强制更新 force_update:0(版本为最新版), 1(版本过低，强制更新), 2(版本过低，但不需要强制更新)
 */
export const validateVersion = param => async (dispatch, getState) => {
    const currentStep = 2
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/app${ObjectToUrl({ appType: android_app.type, deviceType: android_app.android })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            const versionInfo = {
                currentVersion: android_app.version,
                newestVersion: '',
                url: '',
                remark: '',
                force_update: 0
            }
            const serviceVersionInfo = res.result
            versionInfo.newestVersion = serviceVersionInfo.version
            versionInfo.url = serviceVersionInfo.url
            versionInfo.remark = serviceVersionInfo.remark
            if (serviceVersionInfo.force_update < 1) {
                if (serviceVersionInfo.version_num > android_app.version_num) {
                    if (serviceVersionInfo.min_version_num > android_app.version_num) {
                        versionInfo.force_update = 1
                    } else {
                        versionInfo.force_update = 2
                    }
                }
            } else {
                if (serviceVersionInfo.version_num > android_app.version_num) {
                    versionInfo.force_update = 1
                }
            }
            if (versionInfo.force_update != 1) {
                dispatch(loadLocalStorage({ ...param, version: versionInfo }))
            } else {
                dispatch({ type: reduxActionTypes.initView.init_app_complete, payload: { param: { ...param, version: versionInfo } } })
            }
        } else {
            dispatch({ type: reduxActionTypes.initView.init_app_failed, payload: { currentStep, msg: '获取版本错误', param } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.initView.init_app_error, payload: { currentStep, msg: '获取版本错误', param } })
    }
}

/** 
 * 第四步：获取最新user数据，
 *          如果获取失败，跳转到登录页面
 *          如果获取成功，继续流程
 */
export const loadLocalStorage = param => async (dispatch) => {
    const currentStep = 3
    try {
        const localStorageRes = await localStorage.load({ key: localStorageKey.USER })

        if (localStorageRes.token && localStorageRes.id) {
            dispatch(validateToken({ param, user: localStorageRes }))
        }
        else {
            if (localStorageRes.userName) {
                dispatch({ type: reduxActionTypes.login.set_userInfo, payload: { user: { userName: localStorageRes.userName } } })
            } else {
                dispatch({ type: reduxActionTypes.login.set_userInfo, payload: { user:  {}} })
            }
            dispatch({ type: reduxActionTypes.initView.init_app_failed, payload: { currentStep, msg: '登陆未执行', param } })
            Actions.mainRoot()
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.initView.init_app_error, payload: { currentStep, msg: '登陆未执行', param } })
        Actions.mainRoot()
    }
}

/** 
 * 第五步：先获取用户信息，然后更新token，
 *          如果获取用户信息失败，跳转到登录
 *          如果获取用户信息成功，继续更新token
 *          如果更新token失败，跳转到登录
 *          如果更新token成功，继续流程
 */
export const validateToken = ({ param, user }) => async (dispatch, getState) => {
    const currentStep = 4
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const { id, token } = user
        const url = `${base_host}/admin/${id}/token/${token}`
        const res = await httpRequest.get(url)
        if (res.success) {
            const getUserInfoUrl = `${base_host}/admin${ObjectToUrl({ adminId: id })}`
            const getUserInfoRes = await httpRequest.get(getUserInfoUrl)
            if (getUserInfoRes.success) {
                const { id, user_name, real_name, type, gender, status } = getUserInfoRes.result[0]
                const user = {
                    id, userName:user_name, real_name, type, gender, status,
                    token: res.result.accessToken,
                }
                //判断请求是否成功，如果成功，更新token
                localStorage.save({ key: localStorageKey.USER, data: user })
                requestHeaders.set('auth-token', res.result.accessToken)
                requestHeaders.set('user-type', type)
                requestHeaders.set('user-name', user_name)
                await dispatch({ type: reduxActionTypes.login.set_userInfo, payload: { user } })
                dispatch(loadDeviceToken(param))
            } else {
                dispatch({ type: reduxActionTypes.initView.init_app_failed, payload: { currentStep, msg: '无法换token', param } })
                Actions.mainRoot()
            }
        }
        else {
            dispatch({ type: reduxActionTypes.initView.init_app_failed, payload: { currentStep, msg: '无法换token', param } })
            Actions.mainRoot()
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.initView.init_app_error, payload: { currentStep, msg: '登陆未执行', param } })
        Actions.mainRoot()
    }
}

/** 
 * 第六步：从localStorage获取deviceToken
 *          如果获取deviceToken失败，从NativeModules.XinGeModule.register()获取，
 *          如果获取deviceToken成功，完成初始化流程
 */
export const loadDeviceToken = param => async (dispatch) => {
    try {
        deviceToken = await localStorage.load({ key: localStorageKey.DEVICETOKEN })
        dispatch(saveDeviceToken({ deviceToken, ...param }))
        dispatch({ type: reduxActionTypes.initView.init_app_complete, payload: { param } })
        Actions.mainRoot()
        return
    } catch (err) {
    }
    dispatch(initPush(param))
}


/** 
 * 第七步：从NativeModules.XinGeModule.register()获取deviceToken
 *          如果获取deviceToken失败，从NativeModules.XinGeModule.register()获取，
 *          如果获取deviceToken成功，完成初始化流程
 */
export const initPush = param => async (dispatch) => {
    let deviceToken
    try {
        deviceToken = await NativeModules.XinGeModule.register()
        dispatch(saveDeviceToken({ deviceToken, ...param }))
        localStorage.save({ key: localStorageKey.DEVICETOKEN, data: deviceToken })
    } catch (err) {
    }
    dispatch({ type: reduxActionTypes.initView.init_app_complete, payload: { param } })
    Actions.mainRoot()

}

/** 
 * 分支：保存deviceToken
 */
export const saveDeviceToken = param => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()
        const { deviceToken, deviceInfo: { uniqueID } } = param
        const url = `${base_host}/admin/${id}/device/${uniqueID}/appType/${android_app.type}/adminDeviceToken`
        const res = await httpRequest.put(url, { 
            deviceType:android_app.android,
            deviceToken,
            appVersion:android_app.version })
    } catch (err) { }
}
