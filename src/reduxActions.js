import * as initView from './views/initView/initViewActions'
import * as login from './views/login/loginActions'
// import * as home from './views/home/homeActions'
import * as cityList from './views/list/cityList/cityListActions'
import * as consult from './views/consult/consultActions'
import * as inquiryCarList from './views/inquiryCarList/inquiryCarListActions'
import * as inquiryInfo from './views/inquiryInfo/inquiryInfoActions'
import * as changePassword from './views/changePassword/changePasswordActions'
import * as createOrder from './views/createOrder/createOrderActions'
import * as routeCityList from './views/list/routeCityList/routeCityListActions'
import * as orderListNotDemand from './views/home/orderListNotDemand/orderListNotDemandActions'
import * as orderListNotRoute from './views/home/orderListNotRoute/orderListNotRouteActions'
import * as orderListNotPrice from './views/home/orderListNotPrice/orderListNotPriceActions'
import * as orderListNotInfo from './views/home/orderListNotInfo/orderListNotInfoActions'
import * as inquiryList from './views/home/inquiryList/inquiryListActions'
import * as orderCarList from './views/orderCarList/orderCarListActions'
import * as addOrderCar from './views/addOrderCar/addOrderCarActions'
import * as orderCarEditor from './views/orderCarEditor/orderCarEditorActions'
import * as payment from './views/payment/paymentActions'

import * as sendAddrEditorForNotDemand from './views/sendAddressInfoEditor/sendAddrEditorForNotDemand/sendAddrEditorForNotDemandActions'
import * as sendAddrEditorForNotInfo from './views/sendAddressInfoEditor/sendAddrEditorForNotInfo/sendAddrEditorForNotInfoActions'
import * as sendAddrEditorForNotPrice from './views/sendAddressInfoEditor/sendAddrEditorForNotPrice/sendAddrEditorForNotPriceActions'


import * as order from './views/order/orderActions'
import * as orderCarFeeEditor from './views/orderCarFeeEditor/orderCarFeeEditorActions'


import * as recAddrEditorForNotDemand from './views/receiveAddressInfoEditor/recAddrEditorForNotDemand/recAddrEditorForNotDemandActions'
import * as recAddrEditorForNotInfo from './views/receiveAddressInfoEditor/recAddrEditorForNotInfo/recAddrEditorForNotInfoActions'
import * as recAddrEditorForNotPrice from './views/receiveAddressInfoEditor/recAddrEditorForNotPrice/recAddrEditorForNotPriceActions'


// import * as loadTaskList from './views/loadTaskList/loadTaskListActions'
import * as requireTaskList from './views/route/requireTaskList/requireTaskListActions'
import * as loadTaskList from './views/route/loadTaskList/loadTaskListActions'
import * as loadTaskInfo from './views/loadTaskInfo/loadTaskInfoActions'
import * as requireTaskInfo from './views/requireTaskInfo/requireTaskInfoActions'
import * as orderList from './views/orderList/orderListActions'
import * as orderInfo from './views/orderInfo/orderInfoActions'
import * as routeCarList from './views/routeCarList/routeCarListActions'
import * as routeTaskListForOrder from './views/routeTaskListForOrder/routeTaskListForOrderActions'
import * as feePrice from './views/feePrice/feePriceActions'
import * as addrEditor from './views/addrEditor/addrEditorActions'


export {
    initView,
    login,
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
    orderCarList,
    addOrderCar,
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