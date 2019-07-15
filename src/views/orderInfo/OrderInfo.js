import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Icon } from 'native-base'
import globalStyles from '../../style/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import order_status from '../../config/order_status.json'
import order_payment_status from '../../config/order_payment_status.json'
import service_type_list from '../../config/service_type.json'
import { Actions } from 'react-native-router-flux'
import * as reduxActions from '../../reduxActions'
import * as routerDirection from '../../util/RouterDirection'

const OrderInfo = props => {
    // console.log('props', props)
    const { orderInfoReducer: { data: { order } }, sceneKey, setOrderForpickUpAddr,
        routeTaskListForOrderReducer: { data: { routeTaskListForOrder } },parent } = props




    const orderStatus = new Map(order_status).get(order.status)
    const orderPaymentStatus = new Map(order_payment_status).get(order.payment_status)
    const serviceType = new Map(service_type_list).get(order.service_type)
    const _total_insure_price = order.total_insure_price ? order.total_insure_price : 0
    const _total_trans_price = order.total_trans_price ? order.total_trans_price : 0

    return (
        <Container>
            <Content>
                <View style={[styles.listItemHeader, styles.listItemBorderBottom]}>
                    <Text style={[globalStyles.midText]}>订单编号：{order.id ? `${order.id}` : ''}</Text>
                    <Text style={[globalStyles.midText]}>{order.created_on ? `${moment(order.created_on).format('YYYY-MM-DD YY:mm:ss')}` : ''}</Text>
                </View>
                <View style={[styles.listItemBorderBottom, styles.listItemPadding, { backgroundColor: '#f5edf3' }]}>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={[globalStyles.xlText, { color: '#000' }]}>{order.start_city ? `${order.start_city}` : ''}</Text>
                            <Icon name='md-arrow-forward' style={{ paddingHorizontal: 10, color: '#00cade', fontSize: 20 }} />
                            <Text style={[globalStyles.xlText, { color: '#000' }]}>{order.end_city ? `${order.end_city}` : ''}</Text>
                            {order.created_type == 1 && <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#f49c20', marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[globalStyles.midText, { color: '#fff' }]}>内</Text>
                            </View>}
                            {order.created_type == 2 && <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#bd417c', marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[globalStyles.midText, { color: '#fff' }]}>外</Text>
                            </View>}
                            {order.created_type == 3 && <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#105fab', marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[globalStyles.midText, { color: '#fff' }]}>自</Text>
                            </View>}
                        </View>
                        <View>
                            <Text style={[globalStyles.midText, styles.fontColor]}>{orderPaymentStatus}／{orderStatus}</Text>
                        </View>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={[globalStyles.midText]}>创建人：{order.admin_name ? `${order.admin_name}` : ''}</Text>
                        <Text style={[globalStyles.midText]}>发运日期：{order.departure_time ? `${moment(order.departure_time).format('YYYY-MM-DD')}` : ''}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setOrderForpickUpAddr({ order })
                        Actions.pickUpAddrEditor({ preSceneKey: sceneKey })
                    }}
                    style={[styles.listItemBody, styles.listItemBorderBottom, styles.listItemPadding]}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>收发货信息</Text>
                    </View>
                    <View style={[styles.listItemPadding, { flexDirection: 'row', alignItems: 'center' }]}>
                        <Text style={globalStyles.midText}>{serviceType}</Text>
                        <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }}
                    style={[styles.listItemBody, styles.listItemBorderBottom, styles.listItemPadding]}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>运送车辆</Text>
                    </View>
                    <View style={[styles.listItemPadding, { flexDirection: 'row', alignItems: 'center' }]}>
                        <Text style={globalStyles.midText}>{order.car_num ? `${order.car_num}` : ''}</Text>
                        <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                    </View>
                </TouchableOpacity>
                <View style={[styles.listItemBody, styles.listItemBorderBottom, styles.listItemPadding]}>
                    <Text style={[globalStyles.midText, styles.listItemPadding]}>应付费用</Text>
                    <Text style={[globalStyles.midText, styles.listItemPadding]}>{(_total_insure_price + _total_trans_price)}元</Text>
                </View>
                <TouchableOpacity
                    onPress={() => { }}
                    style={[styles.listItemBody, styles.listItemBorderBottom, styles.listItemPadding]}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>支付信息</Text>
                    </View>
                    <View style={[styles.listItemPadding, { flexDirection: 'row', alignItems: 'center' }]}>
                        <Text style={globalStyles.midText}>{orderPaymentStatus}</Text>
                        <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        routerDirection.routeTaskListForOrder(parent)({ preSceneKey: sceneKey, order })
                    }}
                    style={[styles.listItemBody, styles.listItemBorderBottom, styles.listItemPadding]}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>路线安排</Text>
                    </View>
                    <View style={[styles.listItemPadding, { flexDirection: 'row', alignItems: 'center' }]}>
                        <Text style={globalStyles.midText}>{`${routeTaskListForOrder.length}`}</Text>
                        <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                    </View>
                </TouchableOpacity>
                <View style={[styles.listItemBorderBottom, styles.listItemPadding]}>
                    <Text style={[globalStyles.midText, styles.listItemPadding]}>客服备注</Text>
                    <Text style={[globalStyles.midText, styles.listItemPadding]}>客服备注</Text>
                </View>
            </Content>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        routeTaskListForOrderReducer: state.routeTaskListForOrderReducer,
        orderInfoReducer: state.orderInfoReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    setOrderForpickUpAddr: req => {
        // console.log('req',req)
        dispatch(reduxActions.pickUpAddrEditor.setOrderForpickUpAddr(req))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo)

const styles = StyleSheet.create({
    listItemHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#fff',
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