import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    InteractionManager,
    DrawerLayoutAndroid,
    Dimensions
} from 'react-native'
import { Container, Icon, Button } from 'native-base'
import globalStyles, { styleColor } from '../../style/GlobalStyles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'
import { TextBox, DatePicker, PickerBox, Select } from '../../components/form'
import { Field, reduxForm } from 'redux-form'
import InquiryList from './inquiryList/InquiryList'
import OrderListNotDemand from './orderListNotDemand/OrderListNotDemand'
import OrderListNotInfo from './orderListNotInfo/OrderListNotInfo'
import OrderListNotPrice from './orderListNotPrice/OrderListNotPrice'
import OrderListNotRoute from './orderListNotRoute/OrderListNotRoute'

const drawerWidth = 300

const HomeTab = props => {
    const { index, changeTabActive } = props
    return (
        <View style={[styles.tBar, globalStyles.styleBackgroundColor, {}]}>
            <TouchableOpacity onPress={() => changeTabActive(1)} style={styles.tBarItem}>
                <Icon name='ios-headset' style={[styles.tBarItemIcon, index == 1 ? styles.tBarItemActiveIcon : {}]} />
                <Text style={[globalStyles.smallText, index == 1 ? styles.tBarItemActiveText : styles.tBarItemText]}>询价</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeTabActive(2)} style={styles.tBarItem}>
                <Icon name='ios-information-circle-outline' style={[styles.tBarItemIcon, index == 2 ? styles.tBarItemActiveIcon : {}]} />
                <Text style={[globalStyles.smallText, index == 2 ? styles.tBarItemActiveText : styles.tBarItemText]}>完善信息</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeTabActive(3)} style={styles.tBarItem}>
                <Icon name='logo-yen' style={[styles.tBarItemIcon, index == 3 ? styles.tBarItemActiveIcon : {}]} />
                <Text style={[globalStyles.smallText, index == 3 ? styles.tBarItemActiveText : styles.tBarItemText]}>完善价格</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeTabActive(4)} style={styles.tBarItem}>
                <Icon name='md-filing' style={[styles.tBarItemIcon, index == 4 ? styles.tBarItemActiveIcon : {}]} />
                <Text style={[globalStyles.smallText, index == 4 ? styles.tBarItemActiveText : styles.tBarItemText]}>生成需求</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeTabActive(5)} style={styles.tBarItem}>
                <Icon name='ios-infinite' style={[styles.tBarItemIcon, index == 5 ? styles.tBarItemActiveIcon : {}]} />
                <Text style={[globalStyles.smallText, index == 5 ? styles.tBarItemActiveText : styles.tBarItemText]}>安排路线</Text>
            </TouchableOpacity>
        </View>
    )
}


const HomeSearch = props => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styles.searchBar, styles.listItemPadding, styles.listItemBorderBottom]}>
            <Text style={[globalStyles.midText, { paddingVertical: 7.5 }]}>筛选</Text>
            <MaterialCommunityIcons name='filter-outline' style={{ fontSize: 15, paddingRight: 7.5 }} />
        </TouchableOpacity>
    )
}

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabActiveIndex: 5,
            showAlert: false
        }
    }

    render() {
        const { getCityList, getCityListWaiting, reset, handleSubmit, sceneKey } = this.props
        return (
            <DrawerLayoutAndroid
                ref={ref => this.drawer = ref}
                drawerWidth={drawerWidth}
                drawerPosition={DrawerLayoutAndroid.positions.Right}
                renderNavigationView={() => {
                    return (
                        <Container>
                            <Field
                                name='inquiryId'
                                label='询价编号'
                                component={TextBox}
                            />
                            <Field
                                name='startCity'
                                label='始发城市'
                                itemStyle={{ width: drawerWidth - 30 }}
                                component={Select}
                                onPress={({ onChange }) => {
                                    getCityListWaiting()
                                    Actions.cityList({
                                        onSelect: (param) => {
                                            const { id, city_name } = param
                                            onChange({ id, value: city_name, item: param })
                                            Actions.popTo('home')
                                        },
                                        preSceneKey: sceneKey
                                    })
                                    InteractionManager.runAfterInteractions(getCityList)
                                }}
                            />
                            <Field
                                name='endCity'
                                label='目的城市'
                                itemStyle={{ width: drawerWidth - 30 }}
                                component={Select}
                                onPress={({ onChange }) => {
                                    getCityListWaiting()
                                    Actions.cityList({
                                        onSelect: (param) => {
                                            const { id, city_name } = param
                                            onChange({ id, value: city_name, item: param })
                                            Actions.popTo('home')
                                        },
                                        preSceneKey: sceneKey
                                    })
                                    InteractionManager.runAfterInteractions(getCityList)
                                }}
                            />
                            <Field name='inquiryTimeStart' label='询价时间(始)' itemStyle={{ width: drawerWidth - 30 }} component={DatePicker} />
                            <Field name='inquiryTimeEnd' label='询价时间(终)' itemStyle={{ width: drawerWidth - 30 }} component={DatePicker} />
                            <Field
                                itemStyle={{ width: drawerWidth - 30 }}
                                label='服务方式'
                                name='serviceType'
                                listTitle='服务方式'
                                itemList={[{ id: '1', value: '上门提货' }, { id: '2', value: '当地自提' }]}
                                component={PickerBox} />
                            <Field
                                itemStyle={{ width: drawerWidth - 30 }}
                                label='询价状态'
                                name='status'
                                listTitle='询价状态'
                                itemList={[{ id: '0', value: '询价中' }, { id: '1', value: '已询价' },
                                { id: '2', value: '生成订单' }, { id: '3', value: '取消订单' }]}
                                component={PickerBox} />
                            <View style={[{ justifyContent: 'space-between', flexDirection: 'row' }]}>
                                <Button style={[{
                                    flex: 1, marginLeft: 15, backgroundColor: '#ff5807',
                                    marginVertical: 15, justifyContent: 'center', alignItems: 'center',
                                    borderBottomRightRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 20,
                                    borderTopLeftRadius: 20
                                }]}
                                    onPress={reset}>
                                    <Text style={[globalStyles.midText, { color: '#fff' }]}>重置</Text>
                                </Button>
                                <Button onPress={() => {
                                    handleSubmit()
                                    this.drawer.closeDrawer()

                                }} style={[{ flex: 1, marginRight: 15, backgroundColor: styleColor, marginVertical: 15, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 0, borderTopLeftRadius: 0, borderBottomRightRadius: 20, borderTopRightRadius: 20 }]}>
                                    <Text style={[globalStyles.midText, { color: '#fff' }]}>确定</Text>
                                </Button>
                            </View>
                        </Container>
                    )
                }}>
                <Container>
                    <HomeTab index={this.state.tabActiveIndex} changeTabActive={param => this.setState({ tabActiveIndex: param })} />
                    {this.state.tabActiveIndex == 1 && <HomeSearch onPress={() => this.drawer.openDrawer()} />}
                    {this.state.tabActiveIndex == 1 && <InquiryList sceneKey={sceneKey} />}
                    {this.state.tabActiveIndex == 2 && <OrderListNotInfo sceneKey={sceneKey} />}
                    {this.state.tabActiveIndex == 3 && <OrderListNotPrice sceneKey={sceneKey} />}
                    {this.state.tabActiveIndex == 4 && <OrderListNotDemand sceneKey={sceneKey} />}
                    {this.state.tabActiveIndex == 5 && <OrderListNotRoute sceneKey={sceneKey} />}
                </Container>
            </DrawerLayoutAndroid>
        )
    }
}

const styles = StyleSheet.create({
    tBarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7.5,
        flexDirection: 'column'
    },
    tBar: {
        flexDirection: 'row',
        padding: 7.5
    },
    tBarItemText: {
        color: 'rgba(255,255,255,0.3)'
    },
    tBarItemActiveText: {
        color: '#fff'
    },
    tBarItemIcon: {
        color: 'rgba(255,255,255,0.3)',
        marginBottom: 5
    },
    tBarItemActiveIcon: {
        color: '#fff'
    },
    searchBar: {
        // height: 45,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end'
        // backgroundColor: '#777'
    },
    list: {
        // padding:7.5
    },
    listItem: {
        // padding:7.5,

    },
    listItemBorderBottom: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#dfdfdf'
    },
    listItemHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#f5edf3',
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    listItemHeaderNo: {
        color: '#766978',
        fontWeight: '300'
    },
    listItemHeaderDate: {
        color: '#a098a1'
    },
    listItemPadding: {
        padding: 7.5
    },
    footerContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    footerText: {
        paddingLeft: 10
    }
})

const mapStateToProps = (state) => {
    return {
        inquiryListReducer: state.inquiryListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getInquiryList: req => {
        dispatch(reduxActions.inquiryList.getInquiryList(req))
    },
    getInquiryListWaiting: () => {
        dispatch(reduxActions.inquiryList.getInquiryListWaiting())
    },
    getCityList: () => {
        dispatch(reduxActions.cityList.getCityList())
    },
    getCityListWaiting: () => {
        dispatch(reduxActions.cityList.getCityListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'homeSearchForm',
    onSubmit: (values, dispatch, props) => {
        dispatch(reduxActions.inquiryList.getInquiryListWaiting())
        dispatch(reduxActions.inquiryList.getInquiryList(values))
    }
})(Home))




