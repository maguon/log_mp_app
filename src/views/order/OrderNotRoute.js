import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    InteractionManager,
    Alert
} from 'react-native'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'
import { Container, Content, Icon, Button, ActionSheet } from 'native-base'
import globalStyles, { styleColor } from '../../style/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'
import serviceTypeList from '../../config/service_type.json'
import * as routerDirection from '../../util/RouterDirection'

const OrderNotRoute = props => {
    const {
        orderReducer:
        {
            data:
            {
                order,
                order: {
                    id, created_on, total_trans_price, total_insure_price, admin_mark,
                    start_city, created_type, end_city, service_type, car_num, admin_name
                },
                requireTaskInfo: {
                    status
                },
                requireTaskInfo
            }
        },
        sceneKey,
        cancelOrder,
        getRouteTaskInfo,
        getRouteTaskInfoWaiting,
        getLoadTaskList,
        getLoadTaskListWaiting,
        changeOrderStatus,
        setRequireTaskInfo,
        parent
    } = props
    const serviceType = new Map(serviceTypeList).get(service_type)
    return (
        <Container>
            <Content>
                <View style={[styles.listItemHeader, styles.listItemBorderBottom]}>
                    <Text style={[globalStyles.midText, styles.listItemHeaderNo]}>询价编号：{`${id}`}</Text>
                    <Text style={[globalStyles.midText, styles.listItemHeaderDate]}>{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                </View>
                <View style={[styles.listItemPadding, styles.listItemBorderBottom, { backgroundColor: '#f5edf3' }]}>
                    <View style={[styles.listItemPadding, styles.listItemBody]}>
                        <View style={styles.listItemBody}>
                            <Text style={[globalStyles.xlText, globalStyles.styleColor, { fontWeight: 'bold' }]}>{start_city ? `${start_city}` : ''}</Text>
                            <Icon name='md-arrow-forward' style={{ paddingHorizontal: 10, color: '#00cade', fontSize: 20 }} />
                            <Text style={[globalStyles.xlText, globalStyles.styleColor, { fontWeight: 'bold' }]}>{end_city ? `${end_city}` : ''}</Text>
                        </View>
                        <View>
                            <Text style={[globalStyles.midText, styles.fontColor]}>
                                待安排
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.listItemPadding, styles.listItemBody]}>
                        <View>
                            <Text style={[globalStyles.midText]}>创建人：{admin_name ? `${admin_name}` : ''}</Text>
                        </View>
                        <View>
                            <Text style={[globalStyles.midText]}>发运日期：</Text>
                        </View>
                    </View>
                    <View style={[styles.listItemPadding, styles.listItemBody]}>
                        <View>
                            <Text style={[globalStyles.midText]}>订单费用</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.listItemPadding, styles.listItemBorderBottom, styles.listItemBody]}>
                    <View style={[styles.listItemPadding, { alignSelf: 'flex-end' }]}>
                        <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>需求创建时间：2018-08-26 11:20:31</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.listItemPadding, styles.listItemBorderBottom, styles.listItemBody]}
                    onPress={() => {
                        routerDirection.addressInfo(parent)({ preSceneKey: sceneKey, order })
                    }}>
                    <View style={styles.listItemPadding}>
                        <Text style={[globalStyles.midText]}><Text style={{ fontWeight: 'bold' }}>收发货信息：</Text></Text>
                    </View>
                    <View style={[styles.listItemPadding, styles.listItemBody]}>
                        <Text style={[globalStyles.midText]}>
                            {serviceType ? `${serviceType}` : ''}
                        </Text>
                        <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.listItemPadding, styles.listItemBorderBottom, styles.listItemBody]}
                    onPress={() => {
                        Actions.orderCarList({ preSceneKey: sceneKey })
                    }}>
                    <View style={styles.listItemPadding}>
                        <Text style={[globalStyles.midText]}><Text style={{ fontWeight: 'bold' }}>运送车辆：</Text></Text>
                    </View>
                    <View style={[styles.listItemPadding, styles.listItemBody]}>
                        <Text style={[globalStyles.midText]}>
                            {car_num ? `${car_num}` : '0'}
                        </Text>
                        <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.listItemPadding, styles.listItemBorderBottom, styles.listItemBody]}
                    onPress={() => {
                        // getRouteTaskInfoWaiting()
                        // getLoadTaskListWaiting()
                        setRequireTaskInfo(requireTaskInfo)
                        Actions.routeForOrderAtHome({ preSceneKey: sceneKey })
                        // Actions.loadTaskListAtHome({ preSceneKey: sceneKey })
                        // InteractionManager.runAfterInteractions(async () => {
                        //     await getRouteTaskInfo({ order })
                        //     getLoadTaskList({ order })
                        // })
                    }}>
                    <View style={styles.listItemPadding}>
                        <Text style={[globalStyles.midText]}><Text style={{ fontWeight: 'bold' }}>路线安排</Text></Text>
                    </View>
                    <View style={[styles.listItemPadding, styles.listItemBody]}>
                        <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                    </View>
                </TouchableOpacity>
                <View style={[styles.listItemPadding, styles.listItemBorderBottom, styles.listItemBody]}>
                    <View style={styles.listItemPadding}>
                        <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>支付供应商</Text>
                    </View>
                    <View style={[styles.listItemPadding, styles.listItemBody]}>
                        <View style={[styles.listItemBody]}>
                            <Text style={[globalStyles.xlText, styles.fontColor, { fontWeight: '400' }]}>{total_insure_price + total_trans_price}</Text>
                            <Text style={[globalStyles.midText, { paddingLeft: 7.5 }]}>元</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={[styles.listItemPadding, styles.listItemBorderBottom]}
                    onPress={() => routerDirection.orderRemarkEditor(parent)({ preSceneKey: sceneKey, order })}>
                    <View style={styles.listItemPadding}>
                        <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>客服备注</Text>
                    </View>
                    <View style={styles.listItemPadding}>
                        <Text style={[globalStyles.midText]}>{admin_mark ? `${admin_mark}` : ''}</Text>
                    </View>
                </TouchableOpacity>
                <View style={[styles.listItemPadding, styles.listItemBorderBottom, styles.listItemBody]}>
                    <View style={[styles.listItemPadding, { flex: 1 }]}>
                        <Button full bordered style={[{ flex: 1, borderColor: styleColor }]} onPress={() => {
                            Alert.alert(
                                '',
                                '确定取消订单？',
                                [
                                    { text: '取消', onPress: () => { }, style: 'cancel' },
                                    { text: '确定', onPress: () => cancelOrder({ order }) },
                                ],
                                { cancelable: false }
                            )
                        }}>
                            <Text style={[globalStyles.largeText, styles.fontColor]}>取消订单</Text>
                        </Button>
                    </View>
                </View>
            </Content>

        </Container>
    )
}

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
    }
})


export default OrderNotRoute

