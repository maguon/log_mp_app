import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import loginReducer from './views/login/loginReducer'
import initViewReducer from './views/initView/initViewReducer'
import communicationSettingReducer from './views/communicationSetting/communicationSettingReducer'
// import homeReducer from './views/home/homeReducer'
import cityListReducer from './views/list/cityList/cityListReducer'
import consultReducer from './views/consult/consultReducer'
import inquiryCarListReducer from './views/inquiryCarList/inquiryCarListReducer'
import inquiryInfoReducer from './views/inquiryInfo/inquiryInfoReducer'
import changePasswordReducer from './views/changePassword/changePasswordReducer'
import createOrderReducer from './views/createOrder/createOrderReducer'
import routeCityListReducer from './views/list/routeCityList/routeCityListReducer'
import orderListNotDemandReducer from './views/home/orderListNotDemand/orderListNotDemandReducer'
import orderListNotRouteReducer from './views/home/orderListNotRoute/orderListNotRouteReducer'
import orderListNotPriceReducer from './views/home/orderListNotPrice/orderListNotPriceReducer'
import orderListNotInfoReducer from './views/home/orderListNotInfo/orderListNotInfoReducer'
import inquiryListReducer from './views/home/inquiryList/inquiryListReducer'
import receiveAddressInfoEditorReducer from './views/receiveAddressInfoEditor/receiveAddressInfoEditorReducer'
import sendAddressInfoEditorReducer from './views/sendAddressInfoEditor/sendAddressInfoEditorReducer'
import orderCarListReducer from './views/orderCarList/orderCarListReducer'
import addOrderCarReducer from './views/addOrderCar/addOrderCarReducer'
import orderCarEditorReducer from './views/orderCarEditor/orderCarEditorReducer'


export default combineReducers({
    form: formReducer,
    loginReducer,
    initViewReducer,
    communicationSettingReducer,
    // homeReducer,
    cityListReducer,
    consultReducer,
    inquiryCarListReducer,
    inquiryInfoReducer,
    changePasswordReducer,
    createOrderReducer,
    routeCityListReducer,
    orderListNotDemandReducer,
    orderListNotRouteReducer,
    orderListNotPriceReducer,
    orderListNotInfoReducer,
    inquiryListReducer,
    receiveAddressInfoEditorReducer,
    sendAddressInfoEditorReducer,
    orderCarListReducer,
    addOrderCarReducer,
    orderCarEditorReducer
})