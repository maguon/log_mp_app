import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import loginReducer from './views/login/loginReducer'
import initViewReducer from './views/initView/initViewReducer'
import communicationSettingReducer from './views/communicationSetting/communicationSettingReducer'
import homeReducer from './views/home/homeReducer'
import cityListReducer from './views/list/cityList/cityListReducer'

export default combineReducers({
    form: formReducer,
    loginReducer,
    initViewReducer,
    communicationSettingReducer,
    homeReducer,
    cityListReducer
})