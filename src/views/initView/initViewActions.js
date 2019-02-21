import * as reduxActionTypes from '../../reduxActionTypes'
import { sleep, ObjectToUrl } from '../../util/util'
import localStorageKey from '../../util/LocalStorageKey'
import localStorage from '../../util/LocalStorage'
import { ToastAndroid } from 'react-native'
import * as android_app from '../../config/android_app.json'
import httpRequest from '../../util/HttpRequest'
import XGPush from 'react-native-xinge-push'
import { Actions } from 'react-native-router-flux'
import requestHeaders from '../../util/RequestHeaders'

//第二步 获取版本，对比版本
//第三步 获取localStorage
//第四步 获取deviceToken
//第五步 换token

export const waiting = (step) => (dispatch, getState) => {
    let stepKey
    if (!step) {
        //获取步骤
        const { initViewReducer: { initApp } } = getState()
        if (!initApp.step) {
            stepKey = 'validateVersion'
        } else {
            stepKey = initApp.step
        }
    } else {
        stepKey = step
    }
    dispatch({ type: reduxActionTypes.initView.change_step, payload: { stepKey } })
    if (stepKey == 'validateVersion') {
        dispatch(validateVersion())
    } else if (stepKey == 'initPush') {
        dispatch(initPush())
    } else if (stepKey == 'loadLocalStorage') {
        dispatch(loadLocalStorage())
    } else if (stepKey == 'validateToken') {
        dispatch(validateToken())
    }
}


export const success = res => (dispatch, getState) => {
    const { initViewReducer: { initApp: { step } } } = getState()
    if (step == 'validateVersion') {
        if (res.force_update != 1) {
            dispatch({ type: reduxActionTypes.initView.valdate_version_success, payload: { versionInfo: res } })
            dispatch(waiting('initPush'))
        }
    } else if (step == 'initPush') {
        const { deviceToken } = res
        dispatch({ type: reduxActionTypes.initView.init_XGPush_success, payload: { deviceToken } })
        dispatch(waiting('loadLocalStorage'))
    } else if (step == 'loadLocalStorage') {
        dispatch({ type: reduxActionTypes.initView.load_localStorage_success, payload: { userlocalStorage: res.localStorageRes } })
        dispatch(waiting('validateToken'))

    } else if (step == 'validateToken') {
        dispatch({ type: reduxActionTypes.login.set_userInfo, payload: { user: res.user } })
        dispatch({ type: reduxActionTypes.initView.validate_token_success, payload: {} })
        dispatch({ type: reduxActionTypes.initView.init_app_complete, payload: {} })

        Actions.mainRoot()
    }
}

export const falied = res => (dispatch, getState) => {
    const { initViewReducer: { initApp: { step } } } = getState()
    if (step == 'validateVersion') {
        dispatch({ type: reduxActionTypes.initView.valdate_version_failed, payload: { failedMsg: res.msg } })
        Actions.mainRoot()


    } else if (step == 'initPush') {
        dispatch({ type: reduxActionTypes.initView.init_XGPush_failed, payload: { failedMsg: '获取deviceToken错误：deviceToken为空！' } })
    } else if (step == 'loadLocalStorage') {
        if (res.localStorageRes.mobile) {
            dispatch({ type: reduxActionTypes.login.set_userInfo, payload: { user: { mobile: res.localStorageRes.mobile } } })
        } else {
            dispatch({ type: reduxActionTypes.login.set_userInfo, payload: { user: {} } })
        }
        dispatch({ type: reduxActionTypes.initView.load_localStorage_failed, payload: { failedMsg: 'localStorage数据不全！' } })
        Actions.mainRoot()
    } else if (step == 'validateToken') {
        ToastAndroid.show(`登陆失败：${res.msg}`, 10)
        dispatch({ type: reduxActionTypes.initView.validate_token_failed, payload: { failedMsg: res.msg } })
        Actions.mainRoot()
    }
}

export const error = err => (dispatch, getState) => {
    const { initViewReducer: { initApp: { step } } } = getState()

    if (step == 'validateVersion') {
        dispatch({ type: reduxActionTypes.initView.valdate_version_error, payload: { errorMsg: err } })
        Actions.mainRoot()
    } else if (step == 'initPush') {
        dispatch({ type: reduxActionTypes.initView.init_XGPush_error, payload: { errorMsg: err } })
    } else if (step == 'loadLocalStorage') {
        dispatch({ type: reduxActionTypes.initView.load_localStorage_error, payload: { errorMsg: err } })
        Actions.mainRoot()
    } else if (step == 'validateToken') {
        ToastAndroid.show(`登陆失败：${err}`, 10)
        dispatch({ type: reduxActionTypes.initView.validate_token_error, payload: { errorMsg: err } })
        Actions.mainRoot()
    }
}


export const validateVersion = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/app?${ObjectToUrl({ app: android_app.type, type: android_app.android })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            const versionInfo = {
                currentVersion: android_app.version,
                newestVersion: '',
                url: '',
                remark: '',
                force_update: 0
            }

            //>>>过滤出大于当前版本的版本列表
            const currentVersionArr = android_app.version.split('.')
            let versionList = res.result
                .filter(item => {
                    const itemArr = item.version.split('.')
                    if (currentVersionArr[0] < itemArr[0]) {
                        return true
                    } else if (currentVersionArr[0] == itemArr[0] && currentVersionArr[1] < itemArr[1]) {
                        return true
                    } else if (currentVersionArr[0] == itemArr[0] && currentVersionArr[1] == itemArr[1] && currentVersionArr[2] < itemArr[2]) {
                        return true
                    } else {
                        return false
                    }
                })
            //<<<

            //force_update:0(版本为最新版), 1(版本过低，强制更新), 2(版本过低，但不需要强制更新)
            if (versionList.length > 0) {
                //>>>判断是否大于当前版本的版本列表中是否有强制更新的版本
                if (versionList.some(item => item.force_update == 1)) {
                    versionInfo.force_update = 1
                } else {
                    versionInfo.force_update = 2
                }
                //<<<

                //>>>找出最新版本
                versionList = versionList.sort((a, b) => {
                    const aArr = a.version.split('.')
                    const bArr = b.version.split('.')
                    if (aArr[0] < bArr[0]) {
                        return true
                    } else if (aArr[0] == bArr[0] && aArr[1] < bArr[1]) {
                        return true
                    } else if (aArr[0] == bArr[0] && aArr[1] == bArr[1] && aArr[2] < bArr[2]) {
                        return true
                    } else {
                        return false
                    }
                })
                //<<<
                versionInfo.newestVersion = versionList[0].version
                versionInfo.url = versionList[0].url
                versionInfo.remark = versionList[0].remark
            } else {
                versionInfo.force_update = 0
                versionInfo.newestVersion = versionInfo.currentVersion
            }
            // dispatch(falied(res))

            dispatch(success(versionInfo))

        } else {
            dispatch(falied(res))
        }
    } catch (err) {
        dispatch(error(err))
    }
}


export const initPush = () => async (dispatch) => {
    try {
        XGPush.init(2100327204, 'AYA8S6DU622N')
        const deviceToken = await XGPush.register('jeepeng')
        if (deviceToken) {
            dispatch(success({ deviceToken }))
        } else {
            dispatch(falied({ msg: '获取deviceToken错误：deviceToken为空！' }))
        }
    } catch (err) {
        dispatch(error(err))
    }

}

export const loadLocalStorage = () => async (dispatch) => {
    try {
        //localStorage.remove({ key: localStorageKey.USER })
        const localStorageRes = await localStorage.load({ key: localStorageKey.USER })
        console.log('localStorageRes', localStorageRes)
        if (localStorageRes.token && localStorageRes.uid) {
            dispatch(success({ localStorageRes }))
        }
        else {
            dispatch(falied({ localStorageRes }))
        }
    } catch (err) {
        dispatch(error(err))
    }
}

export const validateToken = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            initViewReducer: { data: { userlocalStorage: { uid, token } } } } = getState()
        const url = `${base_host}/user/${uid}/token/${token}`
        const res = await httpRequest.get(url)

        if (res.success) {
            const getUserInfoUrl = `${base_host}/user?${ObjectToUrl({ userId: uid })}`
            const getUserInfoRes = await httpRequest.get(getUserInfoUrl)
            if (getUserInfoRes.success) {
                const { uid, mobile, real_name, type, gender, avatar_image, status, drive_id } = getUserInfoRes.result[0]
                const user = {
                    uid, mobile, real_name, type, gender, avatar_image, status, drive_id,
                    token: res.result.accessToken,
                }
                //判断请求是否成功，如果成功，更新token
                localStorage.save({ key: localStorageKey.USER, data: user })
                requestHeaders.set('auth-token', res.result.accessToken)
                requestHeaders.set('user-type', type)
                requestHeaders.set('user-name', mobile)
                dispatch(success({ user }))
            } else {
                dispatch(falied({ msg: '无法获取用户信息！' }))
            }
        }
        else {
            dispatch(falied({ msg: res.msg }))
        }
    } catch (err) {
        dispatch(error(err))
    }

}