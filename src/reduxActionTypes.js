import * as login from './views/login/loginActionTypes'
import * as initView from './views/initView/initViewActionTypes'
// import * as home from './views/home/homeActionTypes'
import * as cityList from './views/list/cityList/cityListActionTypes'
import * as consult from './views/consult/consultActionTypes'
import * as inquiryCarList from './views/inquiryCarList/inquiryCarListActionTypes'
import * as inquiryInfo from './views/inquiryInfo/inquiryInfoActionTypes'
import * as changePassword from './views/changePassword/changePasswordActionTypes'
import * as createOrder from './views/createOrder/createOrderActionTypes'
import * as routeCityList from './views/list/routeCityList/routeCityListActionTypes'
import * as orderListNotDemand from './views/home/orderListNotDemand/orderListNotDemandActionTypes'
import * as orderListNotRoute from './views/home/orderListNotRoute/orderListNotRouteActionTypes'
import * as orderListNotPrice from './views/home/orderListNotPrice/orderListNotPriceActionTypes'
import * as orderListNotInfo from './views/home/orderListNotInfo/orderListNotInfoActionTypes'
import * as inquiryList from './views/home/inquiryList/inquiryListActionTypes'

import * as addOrderCar from './views/addOrderCar/addOrderCarActionTypes'
import * as orderCarList from './views/orderCarList/orderCarListActionTypes'
import * as orderCarEditor from './views/orderCarEditor/orderCarEditorActionTypes'

import * as order from './views/order/orderActionTypes'
import * as orderCarFeeEditor from './views/orderCarFeeEditor/orderCarFeeEditorActionTypes'

import * as payment from './views/payment/paymentActionTypes'


import * as sendAddrEditorForNotDemand from './views/sendAddressInfoEditor/sendAddrEditorForNotDemand/sendAddrEditorForNotDemandActionTypes'
import * as sendAddrEditorForNotInfo from './views/sendAddressInfoEditor/sendAddrEditorForNotInfo/sendAddrEditorForNotInfoActionTypes'
import * as sendAddrEditorForNotPrice from './views/sendAddressInfoEditor/sendAddrEditorForNotPrice/sendAddrEditorForNotPriceActionTypes'
import * as recAddrEditorForNotDemand from './views/receiveAddressInfoEditor/recAddrEditorForNotDemand/recAddrEditorForNotDemandActionTypes'
import * as recAddrEditorForNotInfo from './views/receiveAddressInfoEditor/recAddrEditorForNotInfo/recAddrEditorForNotInfoActionTypes'
import * as recAddrEditorForNotPrice from './views/receiveAddressInfoEditor/recAddrEditorForNotPrice/recAddrEditorForNotPriceActionTypes'


// import * as loadTaskList from './views/loadTaskList/loadTaskListActionTypes'
import * as requireTaskList from './views/route/requireTaskList/requireTaskListActionTypes'
import * as loadTaskList from './views/route/loadTaskList/loadTaskListActionTypes'
import * as loadTaskInfo from './views/loadTaskInfo/loadTaskInfoActionTypes'
import * as requireTaskInfo from './views/requireTaskInfo/requireTaskInfoActionTypes'
import * as orderList from './views/orderList/orderListActionTypes'
import * as orderInfo from './views/orderInfo/orderInfoActionTypes'
import * as routeCarList from './views/routeCarList/routeCarListActionTypes'
import * as routeTaskListForOrder from './views/routeTaskListForOrder/routeTaskListForOrderActionTypes'
import * as feePrice from './views/feePrice/feePriceActionTypes'
import * as addrEditor from './views/addrEditor/addrEditorActionTypes'


export {
    login,
    initView,
    // home,
    cityList,
    consult,
    inquiryCarList,
    inquiryInfo,
    changePassword,
    createOrder,
    routeCityList,
    orderListNotDemand,
    orderListNotRoute,
    orderListNotPrice,
    orderListNotInfo,
    inquiryList,

    addOrderCar,
    orderCarList,
    orderCarEditor,
    orderCarFeeEditor,


    sendAddrEditorForNotDemand,
    sendAddrEditorForNotInfo,
    sendAddrEditorForNotPrice,
    recAddrEditorForNotDemand,
    recAddrEditorForNotInfo,
    recAddrEditorForNotPrice,
    order,
    payment,



    requireTaskList,
    loadTaskList,
    loadTaskInfo,
    requireTaskInfo,
    orderList,
    orderInfo,
    routeCarList,
    routeTaskListForOrder,
    feePrice,
    addrEditor
}