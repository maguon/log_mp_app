import { handleActions } from 'redux-actions'


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
    initAPP: {
        isResultStatus: 0,     //执行状态 : 0(未执行), 1(正在执行),2(执行暂停),3(全部执行成功),4(执行结束，跳转到登录) ,0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
        step: 0,               //第N步已经执行成功
    },

}


export default handleActions({

},initialState)