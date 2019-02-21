import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'


const initialState = {
    data: {
        version: {
            currentVersion: '',
            newestVersion: '',
            force_update: 0,//0(版本为最新版), 1(版本过低，强制更新), 2(版本过低，但不需要强制更新)
            url: '',
            remark: ''
        },
        deviceInfo: {
            deviceToken: ''
        },
        userlocalStorage: {}
    },
    initApp: {
        isResultStatus: 0,     //执行状态 : 0(未执行), 1(正在执行),2(执行暂停),3(全部执行成功),4(执行结束，跳转到登录) ,0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
        step: null,               //第N步已经执行成功
    },
    validateVersion: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    initXGPush: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    //loadLocalStorage.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败), 5(本地数据未找到)
    loadLocalStorage: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    //validateToken.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败), 5(网络错误)
    validateToken: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        networkError: '',
        param: {}
    }
}


export default handleActions({
    [reduxActionTypes.initView.change_step]: (state, action) => {
        const { payload: { stepKey } } = action
        return {
            ...state,
            initApp: {
                ...state.initApp,
                step: stepKey
            }
        }
    },


    [reduxActionTypes.initView.valdate_version_success]: (state, action) => {
        const { payload: { versionInfo } } = action
        return {
            ...state,
            data: {
                ...state.data,
                version: {
                    ...versionInfo
                }
            },
            validateVersion: {
                ...initialState.validateVersion,
                isResultStatus: 2,
            }
        }
    },
    [reduxActionTypes.initView.valdate_version_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            validateVersion: {
                ...initialState.validateVersion,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.initView.valdate_version_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            validateVersion: {
                ...initialState.validateVersion,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [reduxActionTypes.initView.init_XGPush_success]: (state, action) => {
        const { payload: { deviceToken } } = action
        return {
            ...state,
            data: {
                ...state.data,
                deviceInfo: {
                    deviceToken
                }
            },
            initXGPush: {
                ...initialState.initXGPush,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.initView.init_XGPush_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            initXGPush: {
                ...initialState.initXGPush,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.initView.init_XGPush_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            initXGPush: {
                ...initialState.initXGPush,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [reduxActionTypes.initView.load_localStorage_success]: (state, action) => {
        const { payload: { userlocalStorage } } = action
        return {
            ...state,
            data: {
                ...state.data,
                userlocalStorage: { ...userlocalStorage }
            },
            loadLocalStorage: {
                ...initialState.loadLocalStorage,
                isResultStatus: 2,
            }
        }
    },
    [reduxActionTypes.initView.load_localStorage_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            loadLocalStorage: {
                ...initialState.loadLocalStorage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.initView.load_localStorage_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            loadLocalStorage: {
                ...initialState.loadLocalStorage,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [reduxActionTypes.initView.validate_token_success]: (state, action) => {
        return {
            ...state,
            validateToken: {
                ...initialState.validateToken,
                isResultStatus: 2,
            }
        }
    },
    [reduxActionTypes.initView.validate_token_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            validateToken: {
                ...initialState.validateToken,
                failedMsg,
                isResultStatus: 4
            }
        }
    },
    [reduxActionTypes.initView.validate_token_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            validateToken: {
                ...initialState.validateToken,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [reduxActionTypes.initView.init_app_complete]: (state, action) => {
        const { payload: { step } } = action
        return {
            ...state,
            initAPP: {
                ...state.initAPP,
                step,
                isResultStatus: 3
            }
        }
    }
}, initialState)