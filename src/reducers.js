import { combineReducers } from 'redux'
// import { reducer as formReducer } from 'redux-form'
import loginReducer from './views/login/loginReducer'
import initViewReducer from './views/initView/initViewReducer'

export default combineReducers({
    // form: formReducer,
    loginReducer,
    initViewReducer
})