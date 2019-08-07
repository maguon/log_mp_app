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
import { Container, Content, Button, Icon, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../style/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import service_type_list from '../../config/service_type.json'
import * as routerDirection from '../../util/RouterDirection'
import * as reduxActions from '../../reduxActions'


const RequireTaskInfo = props => {
    const { requireTaskInfoReducer: {
        data: {
            requireTaskInfo: {
                order_id, created_on, route_start, route_end, real_name, departure_time, order_created_on, car_num,
                order_remark, admin_mark, total_insure_price, id, total_trans_price, service_type, status
            }, requireTaskInfo, order } },
        routeTaskListForOrderReducer: { data: { routeTaskListForOrder }, getRouteTaskListForOrder: { isResultStatus } },
        parent, sceneKey, getRouteTaskListForOrderWaiting, getRouteTaskListForOrder, getOrderCarList, getOrderCarListWaiting,
        setRequireTaskInfo, setOrderForpickUpAddr, finishRequire } = props

    const _total_trans_price = total_trans_price ? total_trans_price : 0
    const _total_insure_price = total_insure_price ? total_insure_price : 0

    const serviceType = new Map(service_type_list).get(service_type)

    if (isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>
                <Content>
                    <View style={[styles.listItemHeader, styles.listItemBorderBottom]}>
                        <Text style={[globalStyles.midText]}>订单编号：{order_id ? `${order_id}` : ''}</Text>
                        <Text style={[globalStyles.midText]}>{order_created_on ? `${moment(order_created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
                    </View>
                    <View style={[styles.listItemPadding, styles.listItemBorderBottom, { backgroundColor: '#f5edf3' }]}>
                        <View style={[styles.listItemPadding, styles.listItemBody]}>
                            <View style={styles.listItemBody}>
                                <Text style={[globalStyles.xlText, globalStyles.styleColor, { fontWeight: 'bold' }]}>{route_start ? `${route_start}` : ''}</Text>
                                <Icon name='md-arrow-forward' style={{ paddingHorizontal: 10, color: '#00cade', fontSize: 20 }} />
                                <Text style={[globalStyles.xlText, globalStyles.styleColor, { fontWeight: 'bold' }]}>{route_end ? `${route_end}` : ''}</Text>
                                {/* {created_type == 1 && <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#f49c20', marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[globalStyles.midText, { color: '#fff' }]}>内</Text>
                                </View>}
                                {created_type == 2 && <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#bd417c', marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[globalStyles.midText, { color: '#fff' }]}>外</Text>
                                </View>}
                                {created_type == 3 && <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#105fab', marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[globalStyles.midText, { color: '#fff' }]}>自</Text>
                                </View>} */}
                            </View>
                            <View>
                                <Text style={[globalStyles.midText, styles.fontColor]}>
                                    {status == 0 && `待安排`}
                                    {status == 1 && `已安排`}
                                    {status == 9 && `已完成`}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.listItemPadding, styles.listItemBody]}>
                            <View>
                                <Text style={[globalStyles.midText]}>创建人：{real_name ? `${real_name}` : ''}</Text>
                            </View>
                            <View>
                                <Text style={[globalStyles.midText]}>发运日期：{departure_time ? `${moment(departure_time).format('YYYY-MM-DD')}` : ''}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.listItemHeader, styles.listItemBorderBottom, { justifyContent: 'flex-end' }]}>
                        <Text style={[globalStyles.midText]}>需求生成时间：{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
                    </View>
                    <TouchableOpacity style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}
                        onPress={() => {
                            setOrderForpickUpAddr({ order })
                            routerDirection.pickUpAddrEditor(parent)({ preSceneKey: sceneKey })
                        }}>
                        <View style={[styles.listItemPadding]}>
                            <Text style={[globalStyles.midText]}>收发货信息</Text>
                        </View>
                        <View style={[styles.listItemPadding, { flexDirection: 'row' }]}>
                            <Text style={[globalStyles.midText]}>{serviceType}</Text>
                            <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}
                        onPress={() => {
                            getOrderCarListWaiting()
                            routerDirection.orderCarList(parent)({ preSceneKey: sceneKey })
                            getOrderCarList({ orderId: order_id })
                        }}>
                        <View style={[styles.listItemPadding]}>
                            <Text style={[globalStyles.midText]}>运送车辆</Text>
                        </View>
                        <View style={[styles.listItemPadding, { flexDirection: 'row' }]}>
                            <Text style={[globalStyles.midText]}>{car_num ? `${car_num}` : '0'}</Text>
                            <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}
                        onPress={() => {
                            if (status == 4 || status == 8 || status == 9) {
                                getRouteTaskListForOrderWaiting()
                                routerDirection.routeTaskListForOrder(parent)({ preSceneKey: sceneKey, requireTaskInfo })
                                InteractionManager.runAfterInteractions(() => {
                                    getRouteTaskListForOrder({ orderId: order_id })
                                })
                            }
                            if (status == 0 || status == 1 || status == 2 || status == 3) {
                                setRequireTaskInfo(requireTaskInfo)
                                routerDirection.routeForOrder(parent)({ preSceneKey: sceneKey })
                            }
                        }}>
                        <View style={[styles.listItemPadding]}>
                            <Text style={[globalStyles.midText]}>路线安排</Text>
                        </View>
                        <View style={[styles.listItemPadding, { flexDirection: 'row' }]}>
                            <Text style={globalStyles.midText}>{`${routeTaskListForOrder.length}`}</Text>
                            <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                        <Text style={[globalStyles.midText, styles.listItemPadding]}>总费用</Text>
                        <Text style={[globalStyles.midText, styles.listItemPadding]}>{(_total_trans_price + _total_insure_price)}元</Text>
                    </View>
                    <View style={[styles.listItemPadding, styles.listItemBorderBottom]}>
                        <Text style={[globalStyles.midText, styles.listItemPadding]}>用户备注</Text>
                        <Text style={[globalStyles.midText, styles.listItemPadding]}>{order_remark ? `${order_remark}` : ''}</Text>
                    </View>
                    <View style={[styles.listItemPadding, styles.listItemBorderBottom]}>
                        <Text style={[globalStyles.midText, styles.listItemPadding]}>客服备注</Text>
                        <Text style={[globalStyles.midText, styles.listItemPadding]}>{admin_mark ? `${admin_mark}` : ''}</Text>
                    </View>
                    {status == 1 && <View style={[styles.listItemPadding, styles.listItemBorderBottom, styles.listItemBody]}>
                        <View style={[styles.listItemPadding, { flex: 1 }]}>
                            <Button full style={[{ flex: 1, backgroundColor: styleColor }]} onPress={() => {
                                Alert.alert(
                                    '',
                                    '确定完成需求？',
                                    [
                                        { text: '取消', onPress: () => { }, style: 'cancel' },
                                        {
                                            text: '确定', onPress: () => finishRequire({
                                                requireId: id,
                                                status: 9,
                                                orderId:order_id
                                            })
                                        },
                                    ],
                                    { cancelable: false }
                                )
                            }}>
                                <Text style={[globalStyles.largeText, { color: '#fff' }]}>完成需求</Text>
                            </Button>
                        </View>
                    </View>}
                </Content>
            </Container>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        requireTaskInfoReducer: state.requireTaskInfoReducer,
        routeTaskListForOrderReducer: state.routeTaskListForOrderReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRouteTaskListForOrderWaiting: () => {
        dispatch(reduxActions.routeTaskListForOrder.getRouteTaskListForOrderWaiting())
    },
    getRouteTaskListForOrder: req => {
        dispatch(reduxActions.routeTaskListForOrder.getRouteTaskListForOrder(req))
    },
    getOrderCarList: req => {
        dispatch(reduxActions.orderCarList.getOrderCarList(req))
    },
    getOrderCarListWaiting: () => {
        dispatch(reduxActions.orderCarList.getOrderCarListWaiting())
    },
    setRequireTaskInfo: req => {
        dispatch(reduxActions.routeForOrder.setRequireTaskInfo(req))
    },
    setOrderForpickUpAddr: req => {
        dispatch(reduxActions.pickUpAddrEditor.setOrderForpickUpAddr(req))
    },
    finishRequire: req => {
        dispatch(reduxActions.requireTaskInfo.finishRequire(req))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RequireTaskInfo)

const styles = StyleSheet.create({
    listItemHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
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