import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data: {
        user: {
            id: 3,
            user_name: "19999999999",
            real_name: "管理员",
            gender: 0,
            phone: "13322222222",
            status: 1,
            type: 10001
        }
    },
    loginFlow: {
        isResultStatus: 0,     //执行状态 : 0(未执行), 1(正在执行),2(执行结束)
        step: 0,               //执行到第N步
    },
    //initPush.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    initPush: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        deviceToken: ''
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败), 5(网络错误)
    login: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [reduxActionTypes.login.login_success]: (state, action) => {
        const { payload: { step, user } } = action
        return {
            ...state,
            data: {
                user
            },
            login: {
                ...initialState.login,
                isResultStatus: 2
            },
            loginFlow: {
                isResultStatus: 2,
                step
            }
        }
    },
    [reduxActionTypes.login.login_failed]: (state, action) => {
        const { payload: { step, failedMsg } } = action
        return {
            ...state,
            login: {
                ...initialState.login,
                isResultStatus: 4,
                failedMsg
            },
            loginFlow: {
                isResultStatus: 2,
                step
            }
        }
    },
    [reduxActionTypes.login.login_error]: (state, action) => {
        const { payload: { step, errorMsg } } = action
        return {
            ...state,
            login: {
                ...initialState.login,
                isResultStatus: 3,
                errorMsg
            },
            loginFlow: {
                isResultStatus: 2,
                step
            }
        }
    },



    [reduxActionTypes.login.loginFlow_waiting]: (state, action) => {
        return {
            ...initialState,
            data: {
                ...state.data
            },
            loginFlow: {
                ...state.loginFlow,
                isResultStatus: 1,
            }
        }
    },

    [reduxActionTypes.login.set_userInfo]: (state, action) => {
        const { payload: { user } } = action
        // console.log('action',action)
        return {
            ...initialState,
            data: {
                user
            }
        }
    },

    [reduxActionTypes.login.change_AvatarImage]: (state, action) => {
        const { payload: { avatar_image } } = action
        return {
            ...state,
            data: {
                ...state.data,
                user: {
                    ...state.data.user,
                    avatar_image
                }
            }
        }
    },


    [reduxActionTypes.login.clean_login]: (state, action) => {
        const { payload: { mobile } } = action
        return {
            ...initialState,
            data: {
                user: {
                    mobile
                }
            }
        }
    }
}, initialState)