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
import orderCarListReducer from './views/orderCarList/orderCarListReducer'
import addOrderCarReducer from './views/addOrderCar/addOrderCarReducer'
import orderCarEditorReducer from './views/orderCarEditor/orderCarEditorReducer'


import orderReducer from './views/order/orderReducer'
import paymentReucer from './views/payment/paymentReucer'
import orderCarFeeEditorReducer from './views/orderCarFeeEditor/orderCarFeeEditorReducer'

import requireTaskListReducer from './views/route/requireTaskList/requireTaskListReducer'
import loadTaskListReducer from './views/route/loadTaskList/loadTaskListReducer'
import loadTaskInfoReducer from './views/loadTaskInfo/loadTaskInfoReducer'
import requireTaskInfoReducer from './views/requireTaskInfo/requireTaskInfoReducer'
import orderListReducer from './views/orderList/orderListReducer'
import orderInfoReducer from './views/orderInfo/orderInfoReducer'
import routeCarListReducer from './views/routeCarList/routeCarListReducer'
import routeTaskListForOrderReducer from './views/routeTaskListForOrder/routeTaskListForOrderReducer'
import feePriceReducer from './views/feePrice/feePriceReducer'
import addrEditorReducer from './views/addrEditor/addrEditorReducer'
import pickUpAddrEditorReducer from './views/pickUpAddrEditor/pickUpAddrEditorReducer'
import pickUpAddrListReducer from './views/list/pickUpAddrList/pickUpAddrListReducer'
import routeForOrderReducer from './views/routeForOrder/routeForOrderReducer'
import createRouteReducer from './views/createRoute/createRouteReducer'
import supplierListReducer from './views/list/supplierList/supplierListReducer'
import carListForRouteReducer from './views/list/carListForRoute/carListForRouteReducer'
import syncedRouteRecuer from './views/syncedRoute/syncedRouteRecuer'
import carListForSyncedRouteReducer from './views/carListForSyncedRoute/carListForSyncedRouteReducer'



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
    orderCarListReducer,
    addOrderCarReducer,
    orderCarEditorReducer,

    orderCarFeeEditorReducer,

    orderReducer,
    paymentReucer,

    requireTaskListReducer,
    loadTaskListReducer,
    loadTaskInfoReducer,
    requireTaskInfoReducer,
    orderListReducer,
    orderInfoReducer,
    routeCarListReducer,
    routeTaskListForOrderReducer,
    feePriceReducer,
    addrEditorReducer,


    pickUpAddrEditorReducer,
    pickUpAddrListReducer,
    routeForOrderReducer,
    createRouteReducer,
    supplierListReducer,

    carListForRouteReducer,
    syncedRouteRecuer,
    carListForSyncedRouteReducer
})