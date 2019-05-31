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
import { Container, Content, Icon, Button } from 'native-base'
import globalStyles, { styleColor } from '../../style/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'
import serviceTypeList from '../../config/service_type.json'


const OrderNotPrice = props => {
    const { sceneKey, orderId, getOrderCarList, getOrderCarListWaiting,cancelOrder,
        order: { id, created_on, total_trans_price, total_insure_price, admin_mark, start_city, end_city, service_type, car_num } } = props
    const serviceType = new Map(serviceTypeList).get(service_type)
    // console.log('props', props)
    // console.log('serviceType', serviceType)
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
                                待完善信息
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.listItemPadding, styles.listItemBody]}>
                        <View>
                            <Text style={[globalStyles.midText]}>创建人：李建国</Text>
                        </View>
                        <View>
                            <Icon name='md-call' style={styles.fontColor} />
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.listItemPadding, styles.listItemBorderBottom, styles.listItemBody]}
                    onPress={() => Actions.addressInfoForNotPrice({ preSceneKey: sceneKey, orderId, sceneName: "notPrice" })}>
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
                        getOrderCarListWaiting()
                        Actions.orderCarList({ preSceneKey: sceneKey, orderId })
                        InteractionManager.runAfterInteractions(() => getOrderCarList({ orderId }))
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
                <View
                    style={[styles.listItemPadding, styles.listItemBorderBottom, styles.listItemBody]}
                >
                    <View style={styles.listItemPadding}>
                        <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>应付费用</Text>
                    </View>
                    <View style={[styles.listItemPadding, styles.listItemBody]}>
                        <View style={[styles.listItemBody]}>
                            <Text style={[globalStyles.xlText, styles.fontColor, { fontWeight: '400' }]}>{total_insure_price + total_trans_price}</Text>
                            <Text style={[globalStyles.midText, { paddingLeft: 7.5 }]}>元</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.listItemPadding, styles.listItemBorderBottom, styles.listItemBody]}
                    onPress={() => {
                        getOrderCarListWaiting()
                        Actions.orderCarList({ preSceneKey: sceneKey, orderId })
                        InteractionManager.runAfterInteractions(() => getOrderCarList({ orderId }))
                    }}>
                    <View style={styles.listItemPadding}>
                        <Text style={[globalStyles.midText]}><Text style={{ fontWeight: 'bold' }}>支付费用：</Text></Text>
                    </View>
                    <View style={[styles.listItemPadding, styles.listItemBody]}>
                        <Text style={[globalStyles.midText]}>
                            未支付
                        </Text>
                        <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.listItemPadding, styles.listItemBorderBottom]}
                    onPress={() => Actions.orderNotPriceRemarkEditor({ preSceneKey: sceneKey, orderId })}>
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
                            // Alert.alert(
                            //     '',
                            //     '确定取消订单？',
                            //     [
                            //         { text: '取消', onPress: () => { }, style: 'cancel' },
                            //         { text: '确定', onPress: () => cancalInquiry({ inquiryId: id }) },
                            //     ],
                            //     { cancelable: false }
                            // )
                        }}>
                            <Text style={[globalStyles.largeText, styles.fontColor]}>重新完善信息</Text>
                        </Button>
                    </View>
                    <View style={[styles.listItemPadding, { flex: 1 }]}>
                        <Button full style={[globalStyles.styleBackgroundColor, { flex: 1 }]} onPress={() => {
                            // Alert.alert(
                            //     '',
                            //     '确定将该询价生成订单？',
                            //     [
                            //         { text: '取消', onPress: () => { }, style: 'cancel' },
                            //         { text: '确定', onPress: () => produceOrder({ inquiryId: id }) },
                            //     ],
                            //     { cancelable: false }
                            // )
                        }}>
                            <Text style={[globalStyles.largeText, { color: '#fff' }]}>价格已完善</Text>
                        </Button>
                    </View>
                </View>
                <View style={[styles.listItemPadding, styles.listItemBorderBottom, styles.listItemBody]}>
                    <View style={[styles.listItemPadding, { flex: 1 }]}>
                        <Button full bordered style={[{ flex: 1, borderColor: styleColor }]} onPress={() => {
                            Alert.alert(
                                '',
                                '确定取消订单？',
                                [
                                    { text: '取消', onPress: () => { }, style: 'cancel' },
                                    { text: '确定', onPress: () => cancelOrder({ orderId: id }) },
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

const mapStateToProps = (state, ownProps) => {
    const { orderListNotPriceReducer: { data: { orderListNotPrice } } } = state
    const { orderId } = ownProps
    return {
        order: orderListNotPrice.find(item => item.id == orderId)
    }
}


const mapDispatchToProps = (dispatch) => ({
    getOrderCarList: req => {
        dispatch(reduxActions.orderCarList.getOrderCarList(req))
    },
    getOrderCarListWaiting: () => {
        dispatch(reduxActions.orderCarList.getOrderCarListWaiting())
    },
    cancelOrder: req => {
        dispatch(reduxActions.orderListNotPrice.cancelOrder(req))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(OrderNotPrice) 