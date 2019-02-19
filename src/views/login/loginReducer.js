import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data: {
        user: {}
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
    // [reduxActionTypes.login.login_success]: (state, action) => {
    //     const { payload: { step, user } } = action
    //     return {
    //         ...state,
    //         data: {
    //             user
    //         },
    //         login: {
    //             ...initialState.login,
    //             isResultStatus: 2
    //         },
    //         loginFlow: {
    //             isResultStatus: 2,
    //             step
    //         }
    //     }
    // }
}, initialState)