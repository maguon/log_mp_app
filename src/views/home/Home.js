import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    InteractionManager,
    FlatList,
    RefreshControl,
    DrawerLayoutAndroid,

} from 'react-native'
import { Container, Tabs, Tab, TabHeading, Icon, Input, Content, Spinner, Button } from 'native-base'
import globalStyles, { styleColor } from '../../style/GlobalStyles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { moneyFormat } from '../../util/util'
import { Actions } from 'react-native-router-flux'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'
import moment from 'moment'
import { TextBox, DatePicker, CheckBox, Select } from '../../components/form'
import { Field, reduxForm } from 'redux-form'


const drawerWidth = 300

const renderListEmpty = props => {
    return (
        <View>
            <Text>renderListEmpty</Text>
        </View>
    )
}

const renderListItem = props => {
    // console.log('props', props)
    const { item: { start_city = '', end_city = '', car_num = '0', status, id, service_type,
        total_insure_price = 0, total_trans_price = 0, ora_insure_price = 0, ora_trans_price = 0, created_on } } = props
    return (
        <TouchableOpacity
            style={styles.listItem}
            onPress={Actions.inquiryInfo}>
            <View style={[styles.listItemHeader, styles.listItemBorderBottom]}>
                <Text style={[globalStyles.midText, styles.listItemHeaderNo]}>询价编号：{`${id}`}</Text>
                <Text style={[globalStyles.midText, styles.listItemHeaderDate]}>{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
            </View>
            <View style={[styles.listItemBorderBottom, { flexDirection: 'row', padding: 7.5, alignItems: 'center' }]}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', padding: 7.5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons name='truck' style={{ color: '#d58dac', fontSize: 20 }} />
                            <Text style={[globalStyles.largeText, { paddingLeft: 10 }]}>{`${start_city}`}</Text>
                            <Icon name='md-arrow-forward' style={{ paddingHorizontal: 10, color: '#00cade', fontSize: 20 }} />
                            <Text style={[globalStyles.largeText]}>{`${end_city}`}</Text>
                        </View>
                        <View>
                            <Text style={[globalStyles.midText, { color: '#d82983' }]}>
                                {status == 0 && '待协商'}
                                {status == 1 && '已协商'}
                                {status == 2 && '已生成订单'}
                                {status == 3 && '取消订单'}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7.5 }}>
                        <View>
                            <Text style={[globalStyles.midText]}>
                                {service_type == 1 && '上门提货'}
                                {service_type == 2 && '当地自提'}
                            </Text>
                        </View>
                        <View>
                            <Text style={[globalStyles.midText]}>运送车辆:{car_num}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7.5 }}>
                        <View>
                            <Text style={[globalStyles.midText]}>预计费用：<Text style={[{ color: '#d82983' }]}>{`${moneyFormat(ora_insure_price + ora_trans_price, 2)}`}</Text>元</Text>
                        </View>
                        {status != 0 && <View>
                            <Text style={[globalStyles.midText]}>协商费用：<Text style={[{ color: '#d82983' }]}>{`${moneyFormat(total_insure_price + total_trans_price, 2)}`}</Text>元</Text>
                        </View>}
                    </View>
                </View>
                <View>
                    <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const renderListFooter = props => {
    return (
        <View>
            <Text>renderListFooter</Text>
        </View>
    )
}

const HomeTab = props => {
    return (
        <View style={[styles.tBar, globalStyles.styleBackgroundColor, {}]}>
            <View style={styles.tBarItem}>
                <Icon name='camera' style={[styles.tBarItemIcon, styles.tBarItemActiveIcon]} />
                <Text style={[globalStyles.smallText, styles.tBarItemActiveText]}>询价</Text>
            </View>
            <View style={styles.tBarItem}>
                <Icon name='camera' style={[styles.tBarItemIcon, styles.tBarItemIcon]} />
                <Text style={[globalStyles.smallText, styles.tBarItemText]}>完善信息</Text>
            </View>
            <View style={styles.tBarItem}>
                <Icon name='camera' style={[styles.tBarItemIcon, styles.tBarItemIcon]} />
                <Text style={[globalStyles.smallText, styles.tBarItemText]}>完善价格</Text>
            </View>
            <View style={styles.tBarItem}>
                <Icon name='camera' style={[styles.tBarItemIcon, styles.tBarItemIcon]} />
                <Text style={[globalStyles.smallText, styles.tBarItemText]}>生成需求</Text>
            </View>
            <View style={styles.tBarItem}>
                <Icon name='camera' style={[styles.tBarItemIcon, styles.tBarItemIcon]} />
                <Text style={[globalStyles.smallText, styles.tBarItemText]}>安排路线</Text>
            </View>
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
    }

    componentDidMount() {
        const { getInquiryListWaiting, getInquiryList } = this.props
        getInquiryListWaiting()
        InteractionManager.runAfterInteractions(getInquiryList)
    }

    render() {
        const { homeReducer: { data: { inquiryList }, getInquiryList: { isResultStatus } },
            getInquiryListWaiting, getInquiryList, getCityList, getCityListWaiting } = this.props
        return (
            <DrawerLayoutAndroid
                ref={ref => this.drawer = ref}
                drawerWidth={drawerWidth}
                drawerPosition={DrawerLayoutAndroid.positions.Right}
                renderNavigationView={() => {
                    return (
                        <Container>
                            <Field
                                name='id'
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
                                        }
                                    })
                                    InteractionManager.runAfterInteractions(getCityList)
                                }}
                            />
                            <Field
                                name='endCity'
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
                                        }
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
                                component={CheckBox} />
                            <Field
                                itemStyle={{ width: drawerWidth - 30 }}
                                label='询价状态'
                                name='status'
                                listTitle='询价状态'
                                itemList={[{ id: '0', value: '询价中' }, { id: '1', value: '已询价' },
                                { id: '2', value: '生成订单' }, { id: '3', value: '取消订单' }]}
                                component={CheckBox} />
                            <Button>
                                <Text>取消</Text>
                            </Button>
                            <Button>
                                <Text>查询</Text>
                            </Button>
                        </Container>
                    )
                }}>
                <Container>
                    <HomeTab />
                    <HomeSearch onPress={() => this.drawer.openDrawer()} />
                    <FlatList
                        refreshControl={<RefreshControl
                            refreshing={isResultStatus == 1}
                            onRefresh={() => {
                                getInquiryListWaiting()
                                InteractionManager.runAfterInteractions(getInquiryList)
                            }}
                            progressBackgroundColor={'rgba(255,255,255,0)'}
                            tintColor={'rgba(0,0,0,0)'}
                            colors={[styleColor]}
                        />}
                        contentContainerStyle={styles.list}
                        keyExtractor={(item, index) => index}
                        data={inquiryList}
                        renderItem={renderListItem}
                    />
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
    listItemBorderBottom: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#dfdfdf'
    },
})


const mapStateToProps = (state) => {
    return {
        homeReducer: state.homeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getInquiryList: req => {
        dispatch(reduxActions.home.getInquiryList(req))
    },
    getInquiryListWaiting: req => {
        dispatch(reduxActions.home.getInquiryListWaiting())
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
    // enableReinitialize: true,
    onSubmit: (values, dispatch, props) => {
        // dispatch(actions.addInfoForCreateCar.submit({ values }))
    }
})(Home))




