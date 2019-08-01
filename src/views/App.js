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
import RouteCarListToolButton from '../components/toolButton/RouteCarListToolButton'
import RouteTaskListForOrderToolButton from '../components/toolButton/RouteTaskListForOrderToolButton'
import RouteForOrderToolButton  from '../components/toolButton/RouteForOrderToolButton'


import AddOrderCarToolButton from '../components/toolButton/AddOrderCarToolButton'
import OrderCarEditorToolButton from '../components/toolButton/OrderCarEditorToolButton'
import OrderCarFeeEditorToolButton from '../components/toolButton/OrderCarFeeEditorToolButton'
import PickUpAddrEditorToolButton from '../components/toolButton/PickUpAddrEditorToolButton'

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
import CreateRouteToolButton from '../components/toolButton/CreateRouteToolButton'


import AddressInfo from './addressInfo/AddressInfo'


import LoadTaskList from './route/loadTaskList/LoadTaskList'
import LoadTaskInfo from './loadTaskInfo/LoadTaskInfo'
import RequireTaskInfo from './requireTaskInfo/RequireTaskInfo'


import OrderList from './orderList/OrderList'
import OrderInfo from './orderInfo/OrderInfo'
import RouteCarList from './routeCarList/RouteCarList'
import RouteTaskListForOrder from './routeTaskListForOrder/RouteTaskListForOrder'


import AddrEditor from './addrEditor/AddrEditor'
import RecAddrEditor from './addrEditor/RecAddrEditor'
import SendAddrEditor from './addrEditor/SendAddrEditor'


import PickUpAddrList from './list/pickUpAddrList/PickUpAddrList'
import PickUpAddrEditor from './pickUpAddrEditor/PickUpAddrEditor'
import CreateRoute from './createRoute/CreateRoute'
import SupplierList from './list/supplierList/SupplierList'
import RouteForOrder from './routeForOrder/RouteForOrder'

import CarListForSyncedRoute from './carListForSyncedRoute/CarListForSyncedRoute'
import SyncedRoute from './syncedRoute/SyncedRoute'

import CarListForRoute from './list/carListForRoute/CarListForRoute'

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
                        <Scene key="homeBlock" icon={TabBarIcon} online='ios-home' >
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
                            <Scene key="addrEditorAtHomeBlock"
                                LeftButton={LeftButton}
                                component={AddrEditor}
                                title='收发货信息'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="addressInfoAtHomeBlock"
                                LeftButton={LeftButton}
                                component={AddressInfo}
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
                            <Scene key="paymentAtHomeBlock"
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
                            <Scene key="orderCarListAtHomeBlock"
                                LeftButton={LeftButton}
                                component={OrderCarList}
                                title='运送车辆'
                                hideTabBar={true}
                                hideNavBar={false}
                                navBar={NavBar}
                            />
                            <Scene key="orderCarInfoAtHomeBlock"
                                LeftButton={LeftButton}
                                component={OrderCarInfo}
                                title='车辆详情'
                                hideTabBar={true}
                                hideNavBar={false}
                                navBar={NavBar}
                            />
                            <Scene key="orderCarEditorAtHomeBlock"
                                LeftButton={LeftButton}
                                component={OrderCarEditor}
                                title='修改车辆信息'
                                hideTabBar={true}
                                hideNavBar={false}
                                navBar={NavBar}
                                RightButton={OrderCarEditorToolButton}
                            />
                            <Scene key="orderCarFeeEditorAtHomeBlock"
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
                            <Scene key="addOrderCarAtHomeBlock"
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
                            <Scene key="routeForOrderAtHomeBlock"
                                RightButton={RouteForOrderToolButton}
                                LeftButton={LeftButton}
                                component={RouteForOrder}
                                title='线路安排'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="createRouteAtHomeBlock"

                                LeftButton={LeftButton}
                                component={CreateRoute}
                                title='增加线路'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                                RightButton={CreateRouteToolButton}
                            />
                            <Scene key="supplierListAtHomeBlock"
                                LeftButton={LeftButton}
                                component={SupplierList}
                                title='供应商列表'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="routeCarListAtHomeBlock"
                                RightButton={RouteCarListToolButton}
                                LeftButton={LeftButton}
                                component={RouteCarList}
                                title='运输车辆列表'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="loadTaskInfoAtHomeBlock"
                                component={LoadTaskInfo}
                                LeftButton={LeftButton}
                                title='路线详情'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="carListForRouteAtHomeBlock"
                                component={CarListForRoute}
                                LeftButton={LeftButton}
                                title='选择车辆'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="routeTaskListForOrderAtHomeBlock"
                                LeftButton={LeftButton}
                                component={RouteTaskListForOrder}
                                RightButton={RouteTaskListForOrderToolButton}
                                title='路线安排'
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
                        <Scene key="orderBlock" initial={true} icon={TabBarIcon} online='ios-albums' >
                            <Scene key="orderList"
                                initial={true}
                                component={OrderList}
                                title='订单'
                                hideNavBar={false}
                                navBar={NavBar}
                                RightButton={OrderListToolButton}
                            />
                            <Scene key="addrEditorAtOrderBlock"
                                LeftButton={LeftButton}
                                component={AddrEditor}
                                title='收发货信息'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="addressInfoAtOrderBlock"
                                LeftButton={LeftButton}
                                component={AddressInfo}
                                title='收发货信息'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="recAddrEditorAtOrderBlock"
                                LeftButton={LeftButton}
                                component={RecAddrEditor}
                                title='收发货信息'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                                RightButton={RecAddrEditorToolButton}
                            />
                            <Scene key="sendAddrEditorAtOrderBlock"
                                LeftButton={LeftButton}
                                component={SendAddrEditor}
                                title='收发货信息'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                                RightButton={SendAddrEditorToolButton}
                            />
                            <Scene key="orderCarFeeEditorAtOrderBlock"
                                LeftButton={LeftButton}
                                component={OrderCarFeeEditor}
                                title='车辆信息'
                                hideTabBar={true}
                                hideNavBar={false}
                                navBar={NavBar}
                                RightButton={OrderCarFeeEditorToolButton}
                            />
                            <Scene key="routeForOrderAtOrderBlock"
                                LeftButton={LeftButton}
                                RightButton={RouteForOrderToolButton}
                                component={RouteForOrder}
                                title='线路安排'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="paymentAtOrderBlock"
                                LeftButton={LeftButton}
                                component={Payment}
                                title='支付信息'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="orderCarInfoAtOrderBlock"
                                LeftButton={LeftButton}
                                component={OrderCarInfo}
                                title='车辆详情'
                                hideTabBar={true}
                                hideNavBar={false}
                                navBar={NavBar}
                            />
                            <Scene key="orderCarEditorAtOrderBlock"
                                LeftButton={LeftButton}
                                component={OrderCarEditor}
                                title='修改车辆信息'
                                hideTabBar={true}
                                hideNavBar={false}
                                navBar={NavBar}
                                RightButton={OrderCarEditorToolButton}
                            />
                            <Scene key="addOrderCarAtOrderBlock"
                                LeftButton={LeftButton}
                                component={AddOrderCar}
                                title='增加车辆'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                                RightButton={AddOrderCarToolButton}
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
                            <Scene key="orderCarListAtOrderBlock"
                                LeftButton={LeftButton}
                                component={OrderCarList}
                                title='运送车辆'
                                hideTabBar={true}
                                hideNavBar={false}
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
                            <Scene key="routeCarListAtOrderBlock"
                                RightButton={RouteCarListToolButton}
                                LeftButton={LeftButton}
                                component={RouteCarList}
                                title='运输车辆列表'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="pickUpAddrList"
                                LeftButton={LeftButton}
                                component={PickUpAddrList}
                                title='收发货地址列表'
                                hideNavBar={false}
                                navBar={NavBar}
                            />
                            <Scene key="pickUpAddrEditor"
                                LeftButton={LeftButton}
                                component={PickUpAddrEditor}
                                title='修改收发货地址'
                                hideNavBar={false}
                                navBar={NavBar}
                                RightButton={PickUpAddrEditorToolButton}
                            />
                            <Scene key="routeTaskListForOrderAtOrderBlock"
                                LeftButton={LeftButton}
                                component={RouteTaskListForOrder}
                                RightButton={RouteTaskListForOrderToolButton}
                                title='路线安排'
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
                            <Scene key="loadTaskInfoAtOrderBlock"
                                component={LoadTaskInfo}
                                LeftButton={LeftButton}
                                title='路线详情'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="syncedRoute"
                                // initial={true}
                                component={SyncedRoute}
                                LeftButton={LeftButton}
                                title='同步信息'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="carListForSyncedRoute"
                                component={CarListForSyncedRoute}
                                LeftButton={LeftButton}
                                title='同步信息'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="carListForRouteAtOrderBlock"
                                component={CarListForRoute}
                                LeftButton={LeftButton}
                                title='选择车辆'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="createRouteAtOrderBlock"
                                LeftButton={LeftButton}
                                component={CreateRoute}
                                title='增加线路'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                                RightButton={CreateRouteToolButton}
                            />
                            <Scene key="supplierListAtOrderBlock"
                                LeftButton={LeftButton}
                                component={SupplierList}
                                title='供应商列表'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
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
                            <Scene key="routeForOrderAtRouteBlock"
                                LeftButton={LeftButton}
                                RightButton={RouteForOrderToolButton}
                                component={RouteForOrder}
                                title='线路安排'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="orderCarListAtRouteBlock"
                                LeftButton={LeftButton}
                                component={OrderCarList}
                                title='运送车辆'
                                hideTabBar={true}
                                hideNavBar={false}
                                navBar={NavBar}
                            />
                            <Scene key="routeCarListAtRouteBlock"
                                RightButton={RouteCarListToolButton}
                                LeftButton={LeftButton}
                                component={RouteCarList}
                                title='运输车辆列表'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="orderCarInfoAtRouteBlock"
                                LeftButton={LeftButton}
                                component={OrderCarInfo}
                                title='车辆详情'
                                hideTabBar={true}
                                hideNavBar={false}
                                navBar={NavBar}
                            />
                            <Scene key="loadTaskInfoAtRouteBlock"
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
                            <Scene key="routeTaskListForOrderAtRouteBlock"
                                LeftButton={LeftButton}
                                component={RouteTaskListForOrder}
                                RightButton={RouteTaskListForOrderToolButton}
                                title='路线安排'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="carListForRouteAtRouteBlock"
                                component={CarListForRoute}
                                LeftButton={LeftButton}
                                title='选择车辆'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                            />
                            <Scene key="createRouteAtRouteBlock"
                                LeftButton={LeftButton}
                                component={CreateRoute}
                                title='增加线路'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                                RightButton={CreateRouteToolButton}
                            />
                            <Scene key="supplierListAtRouteBlock"
                                LeftButton={LeftButton}
                                component={SupplierList}
                                title='供应商列表'
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




