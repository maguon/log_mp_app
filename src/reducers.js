import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import loginReducer from './views/login/loginReducer'
import initViewReducer from './views/initView/initViewReducer'
import communicationSettingReducer from './views/communicationSetting/communicationSettingReducer'

export default combineReducers({
    form: formReducer,
    loginReducer,
    initViewReducer,
    communicationSettingReducer
})