import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    DrawerLayoutAndroid,
    DeviceEventEmitter,
    FlatList,
    InteractionManager,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'
import { Container, Spinner, Icon } from 'native-base'
import SearchOrder from './SearchOrder'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import globalStyles, { styleColor } from '../../style/GlobalStyles'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import order_status from '../../config/order_status.json'
import order_payment_status from '../../config/order_payment_status.json'
import service_type_list from '../../config/service_type.json'

const drawerWidth = 300


const renderListEmpty = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
            <Text style={globalStyles.midText}>暂无路线</Text>
        </View>
    )
}

const renderListFooter = props => {
    return (
        <View style={styles.footerContainer}>
            <ActivityIndicator color={styleColor} styleAttr='Small' />
            <Text style={[globalStyles.smallText, styles.footerText]}>正在加载...</Text>
        </View>
    )
}

const renderItem = props => {

    const { item: { id, created_on, start_city, end_city, car_num, status, service_type, created_type, payment_status }, item,
        sceneKey, getRouteTaskListForOrder, getRouteTaskListForOrderWaiting, setOrderInfo, getOrderCarList,
        getOrderCarListWaiting, initOrder, getRequireTaskInfoWaiting, getRequireTaskInfo } = props

    const orderStatus = new Map(order_status).get(status)
    const orderPaymentStatus = new Map(order_payment_status).get(payment_status)
    const serviceType = new Map(service_type_list).get(service_type)

    const _total_insure_price = item.total_insure_price ? item.total_insure_price : 0
    const _total_trans_price = item.total_trans_price ? item.total_trans_price : 0

    return (
        <TouchableOpacity onPress={() => {
            if (status == 4 || status == 8 || status == 9) {
                getRouteTaskListForOrderWaiting()
                getRequireTaskInfoWaiting()
                setOrderInfo(item)
                getOrderCarListWaiting()
                Actions.orderInfoAtOrderBlock({ preSceneKey: sceneKey, order: item })
                InteractionManager.runAfterInteractions(() => {
                    getRouteTaskListForOrder({ orderId: id })
                    getRequireTaskInfo({ orderId: id })
                    getOrderCarList({ orderId: id })
                })
            }
            if (status == 0 || status == 1 || status == 2 || status == 3) {
                getOrderCarListWaiting()
                initOrder({ order: item })
                Actions.orderAtOrderBlock({ preSceneKey: sceneKey })
                InteractionManager.runAfterInteractions(() => getOrderCarList({ orderId: id }))
            }
        }}>
            <View style={[styles.listItemHeader, styles.listItemBorderBottom]}>
                <Text>订单编号：{id ? `${id}` : ''}</Text>
                <Text>{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
            </View>
            <View style={[styles.listItemPadding, styles.listItemBorderBottom, { flexDirection: 'row', alignItems: 'center' }]}>
                <View style={{ flex: 1 }}>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons name='truck' style={{ color: '#d58dac', fontSize: 20 }} />
                            <Text style={[globalStyles.xlText, { color: '#000', paddingLeft: 10 }]}>{start_city ? `${start_city}` : ''}</Text>
                            <Icon name='md-arrow-forward' style={{ paddingHorizontal: 10, color: '#00cade', fontSize: 20 }} />
                            <Text style={[globalStyles.xlText, { color: '#000' }]}>{end_city ? `${end_city}` : ''}</Text>
                        </View>
                        <View>
                            <Text style={[globalStyles.midText, styles.fontColor]}>{orderPaymentStatus}／{orderStatus}</Text>
                        </View>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text>{serviceType}</Text>
                        <Text style={[globalStyles.midText]}>运送车辆：{car_num ? `${car_num}` : '0'}</Text>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        {created_type == 1 && <Text style={[globalStyles.midText]}>内部订单</Text>}
                        {created_type == 2 && <Text style={[globalStyles.midText]}>外部订单</Text>}
                        {created_type == 3 && <Text style={[globalStyles.midText]}>自助订单</Text>}
                        <Text style={[globalStyles.midText]}>应付费用：<Text style={[globalStyles.xlText, styles.fontColor]}>{(_total_insure_price + _total_trans_price)}</Text> 元</Text>
                    </View>
                </View>
                <View>
                    <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

class OrderList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabsIndex: 0
        }
    }

    componentDidMount() {
        const { getOrderListWaiting, getOrderList } = this.props
        this.listener = DeviceEventEmitter.addListener('openOrderListDrawer', (e) => {
            this.drawer.openDrawer()
        })
        getOrderListWaiting()
        InteractionManager.runAfterInteractions(getOrderList)
    }

    componentWillUnmount() {
        this.listener.remove()
    }

    render() {
        const { sceneKey, getOrderListMore, initOrder, orderListReducer, setOrderInfo,
            getRouteTaskListForOrder, getRouteTaskListForOrderWaiting,
            getOrderCarList, getOrderCarListWaiting, getRequireTaskInfoWaiting, getRequireTaskInfo,
            orderListReducer: { data: { orderList, isCompleted }, getOrderList: { isResultStatus } } } = this.props
        if (isResultStatus == 1) {
            return (
                <Container>
                    <Spinner color={styleColor} />
                </Container>
            )
        } else {
            return (
                <Container>
                    <DrawerLayoutAndroid
                        ref={ref => this.drawer = ref}
                        drawerWidth={drawerWidth}
                        drawerPosition={DrawerLayoutAndroid.positions.Right}
                        renderNavigationView={() => {
                            return <SearchOrder sceneKey={sceneKey} closeDrawer={() => this.drawer.closeDrawer()} />
                        }}>
                        <FlatList
                            keyExtractor={(item, index) => index}
                            onEndReachedThreshold={0.2}
                            onEndReached={() => {
                                if (isResultStatus == 2 && !isCompleted) {
                                    getOrderListMore()
                                } else {
                                    // if (!this.state.loadListIsFinished) {
                                    //     ToastAndroid.show('已全部加载完毕！', 10)
                                    //     this.setState({
                                    //         loadListIsFinished: true
                                    //     })
                                    // }
                                }
                            }}
                            ListEmptyComponent={orderListReducer.getOrderList.isResultStatus != 1 && orderList.length == 0 && renderListEmpty}
                            ListFooterComponent={orderListReducer.getOrderListMore.isResultStatus == 1 ? renderListFooter : <View style={{ height: 15 }} />}
                            data={orderList}
                            renderItem={param => renderItem({
                                ...param, sceneKey, getRouteTaskListForOrder, getRouteTaskListForOrderWaiting,
                                getOrderCarList, getOrderCarListWaiting, initOrder, setOrderInfo, getRequireTaskInfoWaiting, getRequireTaskInfo
                            })} />
                    </DrawerLayoutAndroid>
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        orderListReducer: state.orderListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getOrderListMore: () => {
        dispatch(reduxActions.orderList.getOrderListMore())
    },
    getOrderList: () => {
        dispatch(reduxActions.orderList.getOrderList())
    },
    getOrderListWaiting: () => {
        dispatch(reduxActions.orderList.getOrderListWaiting())
    },
    getOrderCarList: req => {
        dispatch(reduxActions.orderCarList.getOrderCarList(req))
    },
    getOrderCarListWaiting: () => {
        dispatch(reduxActions.orderCarList.getOrderCarListWaiting())
    },
    initOrder: req => {
        dispatch(reduxActions.order.initOrder(req))
    },
    getRouteTaskListForOrder: req => {
        dispatch(reduxActions.routeTaskListForOrder.getRouteTaskListForOrder(req))
    },
    getRouteTaskListForOrderWaiting: () => {
        dispatch(reduxActions.routeTaskListForOrder.getRouteTaskListForOrderWaiting())
    },
    setOrderInfo: req => {
        dispatch(reduxActions.orderInfo.setOrderInfo(req))
    },
    getRequireTaskInfoWaiting: () => {
        dispatch(reduxActions.orderInfo.getRequireTaskInfoWaiting())
    },
    getRequireTaskInfo: req => {
        dispatch(reduxActions.orderInfo.getRequireTaskInfo(req))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)

const styles = StyleSheet.create({
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
    listItemBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    fontColor: {
        color: '#bd417c'
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