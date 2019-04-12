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
import ReceiveAddressInfoEditorToolButton from '../components/toolButton/ReceiveAddressInfoEditorToolButton'
import SendAddressInfoEditorToolButton from '../components/toolButton/SendAddressInfoEditorToolButton'
import AddOrderCarToolButton from '../components/toolButton/AddOrderCarToolButton'
import OrderCarEditorToolButton from '../components/toolButton/OrderCarEditorToolButton'
//<<<<<<<<<<components

//<<<<<<<<<<views
import Login from '../views/login/Login'
import Home from '../views/home/Home'
import InitView from '../views/initView/InitView'
import InquiryInfo from '../views/inquiryInfo/InquiryInfo'
import OrderNotInfo from '../views/orderNotInfo/OrderNotInfo'
import InquiryCarList from '../views/inquiryCarList/InquiryCarList'
import InquiryCarInfo from '../views/inquiryCarInfo/InquiryCarInfo'
import Consult from '../views/consult/Consult'
import CityList from '../views/list/cityList/CityList'
import RouteCityList from '../views/list/routeCityList/RouteCityList'
import ConsultInfo from '../views/ConsultInfo'
import Setting from '../views/setting/Setting'
import Route from '../views/route/Route'
import Order from '../views/order/Order'
import FeePrice from '../views/feePrice/FeePrice'
import ChangePassword from '../views/changePassword/ChangePassword'
import CreateOrder from '../views/createOrder/CreateOrder'
import SendAddressInfoEditor from '../views/sendAddressInfoEditor/SendAddressInfoEditor'
import ReceiveAddressInfoEditor from '../views/receiveAddressInfoEditor/ReceiveAddressInfoEditor'
import AddressInfo from '../views/addressInfo/AddressInfo'
import OrderCarInfo from '../views/orderCarInfo/OrderCarInfo'
import OrderCarEditor from '../views/orderCarEditor/OrderCarEditor'
import OrderCarList from '../views/orderCarList/OrderCarList'
import AddOrderCar from '../views/addOrderCar/AddOrderCar'
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
                                navBar={NavBar}
                            />
                            <Scene key="orderNotInfo"
                                LeftButton={LeftButton}
                                component={OrderNotInfo}
                                title='订单详情'
                                hideNavBar={false}
                                navBar={NavBar}
                            />
                            <Scene key="consultInfo"
                                LeftButton={LeftButton}
                                component={ConsultInfo}
                                title='协商费用'
                                hideNavBar={false}
                                navBar={NavBar}
                            />
                            <Scene key="inquiryCarList"
                                LeftButton={LeftButton}
                                component={InquiryCarList}
                                title='运送车辆'
                                hideNavBar={false}
                                navBar={NavBar}
                            />
                            <Scene key="inquiryCarInfo"
                                LeftButton={LeftButton}
                                component={InquiryCarInfo}
                                title='车辆信息'
                                hideNavBar={false}
                                navBar={NavBar}
                            />
                            <Scene key="consult"
                                LeftButton={LeftButton}
                                component={Consult}
                                title='协商费用'
                                hideNavBar={false}
                                navBar={NavBar}
                                RightButton={ConsultToolButton}
                            />
                            <Scene key="cityList"
                                LeftButton={LeftButton}
                                component={CityList}
                                title='城市列表'
                                hideNavBar={false}
                                navBar={NavBar}
                            />
                            <Scene key="routeCityList"
                                LeftButton={LeftButton}
                                component={RouteCityList}
                                title='可选城市列表'
                                hideNavBar={false}
                                navBar={NavBar}
                            />
                            <Scene key="createOrder"
                                LeftButton={LeftButton}
                                component={CreateOrder}
                                title='创建订单'
                                hideNavBar={false}
                                navBar={NavBar}
                                RightButton={CreateOrderToolButton}
                            />
                            <Scene key="addressInfo"
                                LeftButton={LeftButton}
                                component={AddressInfo}
                                title='收发货信息'
                                hideNavBar={false}
                                navBar={NavBar}
                            />
                            <Scene key="receiveAddressInfoEditor"
                                LeftButton={LeftButton}
                                component={ReceiveAddressInfoEditor}
                                title='收货信息'
                                hideNavBar={false}
                                navBar={NavBar}
                                RightButton={ReceiveAddressInfoEditorToolButton}
                            />
                            <Scene key="sendAddressInfoEditor"
                                LeftButton={LeftButton}
                                component={SendAddressInfoEditor}
                                title='发货信息'
                                hideNavBar={false}
                                navBar={NavBar}
                                RightButton={SendAddressInfoEditorToolButton}
                            />
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
                            <Scene key="addOrderCar"
                                LeftButton={LeftButton}
                                component={AddOrderCar}
                                title='增加车辆'
                                hideNavBar={false}
                                hideTabBar={true}
                                navBar={NavBar}
                                RightButton={AddOrderCarToolButton}
                            />
                        </Scene>
                        <Scene key="feePriceBlock" icon={TabBarIcon} online='logo-yen' >
                            <Scene key="feePrice"
                                component={FeePrice}
                                title='询价'
                                hideNavBar={false}
                                navBar={NavBar}
                            />
                        </Scene>
                        <Scene key="orderBlock" icon={TabBarIcon} online='ios-albums' >
                            <Scene key="order"
                                component={Order}
                                title='订单'
                                hideNavBar={false}
                                navBar={NavBar}
                            />
                        </Scene>
                        <Scene key="routeBlock" icon={TabBarIcon} online='ios-infinite' >
                            <Scene key="route"
                                component={Route}
                                title='路线'
                                hideNavBar={false}
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
                                navBar={NavBar}
                            />
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}