import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Scene, TabBar, Router, ActionConst, Actions, Switch, Reducer } from 'react-native-router-flux'
import { connect } from 'react-redux'

//<<<<<<<<<<components
import NavBar from '../components/bar/NavBar'
import TabBarIcon from '../components/bar/TabBarIcon'
import LeftButton from '../components/leftButton/LeftButton'
import ConsultToolButton from '../components/toolButton/ConsultToolButton'
import HomeToolButton from '../components/toolButton/HomeToolButton'
import CreateOrderToolButton from '../components/toolButton/CreateOrderToolButton'
import RouteToolButton from '../components/toolButton/RouteToolButton'
import OrderListToolButton from '../components/toolButton/OrderListToolButton'
import SendAddrEditorToolButton from '../components/toolButton/SendAddrEditorToolButton'
import RecAddrEditorToolButton from '../components/toolButton/RecAddrEditorToolButton'

// import SendAddrEditorForNotPriceToolButton from '../components/toolButton/SendAddrEditorForNotPriceToolButton'
// import SendAddrEditorForNotDemandToolButton from '../components/toolButton/SendAddrEditorForNotDemandToolButton'
// import SendAddrEditorForNotInfoToolButton from '../components/toolButton/SendAddrEditorForNotInfoToolButton'

// import RecAddrEditorForNotDemandToolButton from '../components/toolButton/RecAddrEditorForNotDemandToolButton'
// import RecAddrEditorForNotInfoToolButton from '../components/toolButton/RecAddrEditorForNotInfoToolButton'
// import RecAddrEditorForNotPriceToolButton from '../components/toolButton/RecAddrEditorForNotPriceToolButton'


import AddOrderCarToolButton from '../components/toolButton/AddOrderCarToolButton'
import OrderCarEditorToolButton from '../components/toolButton/OrderCarEditorToolButton'
import OrderCarFeeEditorToolButton from '../components/toolButton/OrderCarFeeEditorToolButton'

//<<<<<<<<<<components

//<<<<<<<<<<views
import Login from '../views/login/Login'
import Home from '../views/home/Home'
import InitView from '../views/initView/InitView'
import InquiryInfo from '../views/inquiryInfo/InquiryInfo'
import Payment from '../views/payment/Payment'

import InquiryCarList from '../views/inquiryCarList/InquiryCarList'
import InquiryCarInfo from '../views/inquiryCarInfo/InquiryCarInfo'
import Consult from '../views/consult/Consult'
import CityList from '../views/list/cityList/CityList'
import RouteCityList from '../views/list/routeCityList/RouteCityList'
import ConsultInfo from '../views/ConsultInfo'
import Setting from '../views/setting/Setting'
import Route from './route/Route'
import Order from '../views/order/Order'
import FeePrice from '../views/feePrice/FeePrice'
import ChangePassword from '../views/changePassword/ChangePassword'
import CreateOrder from '../views/createOrder/CreateOrder'


import OrderCarInfo from '../views/orderCarInfo/OrderCarInfo'
import OrderCarEditor from '../views/orderCarEditor/OrderCarEditor'
import OrderCarFeeEditor from '../views/orderCarFeeEditor/OrderCarFeeEditor'
import OrderCarList from '../views/orderCarList/OrderCarList'
import AddOrderCar from '../views/addOrderCar/AddOrderCar'



import order from './order/Order'
import OrderRemarkEditor from './orderRemarkEditor/OrderRemarkEditor'
import OrderRemarkEditorToolButton from '../components/toolButton/OrderRemarkEditorToolButton'



// import AddressInfoForNotDemand from './addressInfo/AddressInfoForNotDemand'
// import AddressInfoForNotPrice from './addressInfo/AddressInfoForNotPrice'
// import AddressInfoForNotInfo from './addressInfo/AddressInfoForNotInfo'


// import SendAddressInfoEditorForNotDemand from './sendAddressInfoEditor/sendAddrEditorForNotDemand/SendAddrEditorForNotDemand'
// import SendAddressInfoEditorForNotInfo from './sendAddressInfoEditor/sendAddrEditorForNotInfo/SendAddrEditorForNotInfo'
// import SendAddressInfoEditorForNotPrice from './sendAddressInfoEditor/sendAddrEditorForNotPrice/SendAddrEditorForNotPrice'

// import RecAddrEditorForNotDemand from './receiveAddressInfoEditor/recAddrEditorForNotDemand/RecAddrEditorForNotDemand'
// import RecAddrEditorForNotInfo from './receiveAddressInfoEditor/recAddrEditorForNotInfo/RecAddrEditorForNotInfo'
// import RecAddrEditorForNotPrice from './receiveAddressInfoEditor/recAddrEditorForNotPrice/RecAddrEditorForNotPrice'




import LoadTaskList from './loadTaskList/LoadTaskList'
import LoadTaskInfo from './loadTaskInfo/LoadTaskInfo'
import RequireTaskInfo from './requireTaskInfo/RequireTaskInfo'


import OrderList from './orderList/OrderList'
import OrderInfo from './orderInfo/OrderInfo'
import RouteCarList from './routeCarList/RouteCarList'
import RouteTaskListForOrder from './routeTaskListForOrder/RouteTaskListForOrder'


import AddrEditor from './addrEditor/AddrEditor'
import RecAddrEditor from './addrEditor/RecAddrEditor'
import SendAddrEditor from './addrEditor/SendAddrEditor'
//<<<<<<<<<<views

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#E0E4E7',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#E0E4E7',
    },
    navigationBarStyle: {

    }
})

const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer
    }
}

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    }
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 56
        style.marginBottom = computedProps.hideTabBar ? 0 : 50
    }
    return style
}


export default class App extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        // Orientation.lockToPortrait()
    }

    render() {
        console.disableYellowBox = true
        return (
            <Router getSceneStyle={getSceneStyle} >
                <Scene key="root">
                    {/* <Scene key="initialization" initial={true} component={InitView} hideNavBar hideTabBar />
                    <Scene
                        key="mainRoot"
                        component={connect(mapStateToProps)(Switch)}
                        tabs={true}
                        type={ActionConst.RESET}
                        selector={(props) => {
                            const { user } = props.loginReducer.data
                            console.log(user)
                            if (user.mobile
                                && user.token
                                && user.uid
                                && user.status
                                && user.type) {
                                return 'main'
                            } else {
                                return 'loginBlock'
                            }
                        }}
                    >
                        <Scene key="loginBlock" >
                            <Scene key="login" initial={true} component={Login} hideNavBar hideTabBar />
                        </Scene>*/}
                    <Scene key="main" tabs={true} tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
                        <Scene key="homeBlock" initial={true} icon={TabBarIcon} online='ios-home' >
                            <Scene key="home"
                                initial={true}
                                component={Home}
                                title='首页'
                                hideNavBar={false}
                                navBar={NavBar}
                                RightButton={HomeToolButton}
                            />
                            <Scene key="inquiryInfo"
                                LeftButton={LeftButton}
                                component={InquiryInfo}
                                title='询价详情'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />

                            <Scene key="order"
                                LeftButton={LeftButton}
                                component={order}
                                title='订单详情'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            {/* <Scene key="addressInfoForNotDemand"
                                LeftButton={LeftButton}
                                component={AddressInfoForNotDemand}
                                title='收发货信息'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="addressInfoForNotPrice"
                                LeftButton={LeftButton}
                                component={AddressInfoForNotPrice}
                                title='收发货信息'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            /> */}
                            <Scene key="addrEditorAtHomeBlock"
                                LeftButton={LeftButton}
                                component={AddrEditor}
                                title='收发货信息'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="recAddrEditorAtHomeBlock"
                                LeftButton={LeftButton}
                                component={RecAddrEditor}
                                title='收发货信息'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                                RightButton={RecAddrEditorToolButton}
                            />
                            <Scene key="sendAddrEditorAtHomeBlock"
                                LeftButton={LeftButton}
                                component={SendAddrEditor}
                                title='收发货信息'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                                RightButton={SendAddrEditorToolButton}
                            />
                            <Scene key="payment"
                                LeftButton={LeftButton}
                                component={Payment}
                                title='支付信息'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />

                            <Scene key="consultInfo"
                                LeftButton={LeftButton}
                                component={ConsultInfo}
                                title='协商费用'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="inquiryCarList"
                                LeftButton={LeftButton}
                                component={InquiryCarList}
                                title='运送车辆'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="inquiryCarInfo"
                                LeftButton={LeftButton}
                                component={InquiryCarInfo}
                                title='车辆信息'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="consult"
                                LeftButton={LeftButton}
                                component={Consult}
                                title='协商费用'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                                RightButton={ConsultToolButton}
                            />
                            <Scene key="cityList"
                                LeftButton={LeftButton}
                                component={CityList}
                                title='城市列表'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="routeCityList"
                                LeftButton={LeftButton}
                                component={RouteCityList}
                                title='可选城市列表'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="createOrder"
                                LeftButton={LeftButton}
                                component={CreateOrder}
                                title='创建订单'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                                RightButton={CreateOrderToolButton}
                            />
                            {/* <Scene key="addressInfoForNotInfo"
                                LeftButton={LeftButton}
                                component={AddressInfoForNotInfo}
                                title='收发货信息'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            /> */}
                            <Scene key="orderCarList"
                                LeftButton={LeftButton}
                                component={OrderCarList}
                                title='运送车辆'
                                hideTabBar={true}
                                hideNavBar={false}
                                navBar={NavBar}
                            />
                            <Scene key="orderCarInfo"
                                LeftButton={LeftButton}
                                component={OrderCarInfo}
                                title='车辆详情'
                                hideTabBar={true}
                                hideNavBar={false}
                                navBar={NavBar}
                            />
                            <Scene key="orderCarEditor"
                                LeftButton={LeftButton}
                                component={OrderCarEditor}
                                title='修改车辆信息'
                                hideTabBar={true}
                                hideNavBar={false}
                                navBar={NavBar}
                                RightButton={OrderCarEditorToolButton}
                            />
                            <Scene key="orderCarFeeEditor"
                                LeftButton={LeftButton}
                                component={OrderCarFeeEditor}
                                title='车辆信息'
                                hideTabBar={true}
                                hideNavBar={false}
                                navBar={NavBar}
                                RightButton={OrderCarFeeEditorToolButton}
                            />
                            <Scene key="orderRemarkEditor"
                                LeftButton={LeftButton}
                                component={OrderRemarkEditor}
                                title='客服备注'
                                hideTabBar={true}
                                hideNavBar={false}
                                navBar={NavBar}
                                RightButton={OrderRemarkEditorToolButton}
                            />
                            <Scene key="addOrderCar"
                                LeftButton={LeftButton}
                                component={AddOrderCar}
                                title='增加车辆'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                                RightButton={AddOrderCarToolButton}
                            />
                            <Scene key="loadTaskListAtHome"
                                LeftButton={LeftButton}
                                component={LoadTaskList}
                                title='线路安排'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                        </Scene>
                        <Scene key="feePriceBlock" icon={TabBarIcon} online='logo-yen' >
                            <Scene key="feePrice"
                                component={FeePrice}
                                title='询价'
                                hideNavBar={false}
                                navBar={NavBar}
                            />
                            <Scene key="cityListAtFeePriceBlock"
                                LeftButton={LeftButton}
                                component={CityList}
                                title='城市列表'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="routeCityListAtFeePriceBlock"
                                LeftButton={LeftButton}
                                component={RouteCityList}
                                title='可选城市列表'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                        </Scene>
                        <Scene key="orderBlock" icon={TabBarIcon} online='ios-albums' >
                            <Scene key="orderList"
                                initial={true}
                                component={OrderList}
                                title='订单'
                                hideNavBar={false}
                                navBar={NavBar}
                                RightButton={OrderListToolButton}
                            />
                            <Scene key="createOrderAtOrderBlock"
                                LeftButton={LeftButton}
                                component={CreateOrder}
                                title='创建订单'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                                RightButton={CreateOrderToolButton}
                            />
                            <Scene key="orderInfoAtOrderBlock"
                                LeftButton={LeftButton}
                                component={OrderInfo}
                                title='订单详情'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="orderAtOrderBlock"
                                LeftButton={LeftButton}
                                component={order}
                                title='订单详情'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="cityListAtOrderBlock"
                                LeftButton={LeftButton}
                                component={CityList}
                                title='城市列表'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="routeCityListAtOrderBlock"
                                LeftButton={LeftButton}
                                component={RouteCityList}
                                title='可选城市列表'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="routeCarList"
                                LeftButton={LeftButton}
                                component={RouteCarList}
                                title='城市列表'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="routeTaskListForOrder"
                                LeftButton={LeftButton}
                                component={RouteTaskListForOrder}
                                title='城市列表'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="orderRemarkEditorAtOrderBlock"
                                LeftButton={LeftButton}
                                component={OrderRemarkEditor}
                                title='客服备注'
                                hideTabBar={true}
                                hideNavBar={false}
                                navBar={NavBar}
                                RightButton={OrderRemarkEditorToolButton}
                            />
                        </Scene>
                        <Scene key="routeBlock" icon={TabBarIcon} online='ios-infinite' >
                            <Scene key="route"
                                initial={true}
                                component={Route}
                                title='路线'
                                hideNavBar={false}
                                navBar={NavBar}
                                RightButton={RouteToolButton}
                            />
                            <Scene key="loadTaskInfo"
                                component={LoadTaskInfo}
                                LeftButton={LeftButton}
                                title='路线详情'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="requireTaskInfo"
                                component={RequireTaskInfo}
                                LeftButton={LeftButton}
                                title='订单详情'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="cityListAtRouteBlock"
                                LeftButton={LeftButton}
                                component={CityList}
                                title='城市列表'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                        </Scene>
                        <Scene key="settingBlock" icon={TabBarIcon} online='ios-settings' >
                            <Scene key="setting"
                                component={Setting}
                                title='设置'
                                hideNavBar={false}
                                navBar={NavBar}
                            />
                            <Scene key="changePassword"
                                LeftButton={LeftButton}
                                component={ChangePassword}
                                title='修改密码'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}




{/* <Scene key="sendAddressInfoEditorForNotDemand"
LeftButton={LeftButton}
component={SendAddressInfoEditorForNotDemand}
title='发货信息'
hideNavBar={false}
hideTabBar={true}
navBar={NavBar}
RightButton={SendAddrEditorForNotDemandToolButton}
/>
<Scene key="sendAddressInfoEditorForNotInfo"
LeftButton={LeftButton}
component={SendAddressInfoEditorForNotInfo}
title='发货信息'
hideNavBar={false}
hideTabBar={true}
navBar={NavBar}
RightButton={SendAddrEditorForNotInfoToolButton}
/>
<Scene key="sendAddressInfoEditorForNotPrice"
LeftButton={LeftButton}
component={SendAddressInfoEditorForNotPrice}
title='发货信息'
hideNavBar={false}
hideTabBar={true}
navBar={NavBar}
RightButton={SendAddrEditorForNotPriceToolButton}
/>
<Scene key="recAddrEditorForNotDemand"
LeftButton={LeftButton}
component={RecAddrEditorForNotDemand}
title='发货信息'
hideNavBar={false}
hideTabBar={true}
navBar={NavBar}
RightButton={RecAddrEditorForNotDemandToolButton}
/>
<Scene key="recAddrEditorForNotInfo"
LeftButton={LeftButton}
component={RecAddrEditorForNotInfo}
title='发货信息'
hideNavBar={false}
hideTabBar={true}
navBar={NavBar}
RightButton={RecAddrEditorForNotInfoToolButton}
/>
<Scene key="recAddrEditorForNotPrice"
LeftButton={LeftButton}
component={RecAddrEditorForNotPrice}
title='发货信息'
hideNavBar={false}
hideTabBar={true}
navBar={NavBar}
RightButton={RecAddrEditorForNotPriceToolButton}
/> */}