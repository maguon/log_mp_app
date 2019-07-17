import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    InteractionManager
} from 'react-native'
import { Button, Container, Content } from 'native-base'
import globalStyles from '../../style/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'
import moment from 'moment'
import ModalWaiting from '../../components/ModalWaiting'
import * as routerDirection from '../../util/RouterDirection'

const LoadTaskInfo = props => {
    const { loadTaskInfoReducer: { data: { loadTaskInfo } }, loadTaskInfoReducer, changeLoadTaskStatus,
        getRouteCarList, getRouteCarListWaiting, parent, sceneKey } = props
    console.log('loadTaskInfo', loadTaskInfo)

    let _supplier_insure_price = loadTaskInfo.supplier_insure_price ? loadTaskInfo.supplier_insure_price : 0
    let _supplier_trans_price = loadTaskInfo.supplier_trans_price ? loadTaskInfo.supplier_trans_price : 0

    return (
        <Container>
            <Content>
                <View style={[styles.listItemPadding, styles.listItemBorderBottom, { backgroundColor: '#f1ebf1' }]}>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={[globalStyles.midText]}>线路编号：{loadTaskInfo.id ? `${loadTaskInfo.id}` : ''}</Text>
                        {loadTaskInfo.load_task_status == 1 && <Text style={[globalStyles.midText, { color: '#ba7797' }]}>待发运</Text>}
                        {loadTaskInfo.load_task_status == 2 && <Text style={[globalStyles.midText, { color: '#ba7797' }]}>已发运</Text>}
                        {loadTaskInfo.load_task_status == 3 && <Text style={[globalStyles.midText, { color: '#ba7797' }]}>已送达</Text>}
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={[globalStyles.midText]}>{loadTaskInfo.created_on ? `${moment(loadTaskInfo.created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
                        <Button small transparent
                            style={{ borderColor: '#ba7797', borderWidth: 0.5, borderRadius: 2 }}
                            onPress={() => changeLoadTaskStatus({ loadTaskId: loadTaskInfo.id, status: (loadTaskInfo.load_task_status + 1) })} >
                            <Text style={[globalStyles.midText, { color: '#ba7797', paddingHorizontal: 10 }]}>变更状态</Text>
                        </Button>
                    </View>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <Text style={[globalStyles.midText, styles.listItemPadding]}>始发城市</Text>
                    <Text style={[globalStyles.midText, styles.listItemPadding]}>{loadTaskInfo.route_start ? `${loadTaskInfo.route_start}` : ''}</Text>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <Text style={[globalStyles.midText, styles.listItemPadding]}>目的城市</Text>
                    <Text style={[globalStyles.midText, styles.listItemPadding]}>{loadTaskInfo.route_end ? `${loadTaskInfo.route_end}` : ''}</Text>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <Text style={[globalStyles.midText, styles.listItemPadding]}>供应商</Text>
                    <Text style={[globalStyles.midText, styles.listItemPadding]}>{loadTaskInfo.supplier_short ? `${loadTaskInfo.supplier_short}` : ''}</Text>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <Text style={[globalStyles.midText, styles.listItemPadding]}>运输方式</Text>
                    {loadTaskInfo.trans_type == 1 && <Text style={[globalStyles.midText, styles.listItemPadding]}>陆运</Text>}
                    {loadTaskInfo.trans_type == 2 && <Text style={[globalStyles.midText, styles.listItemPadding]}>海运</Text>}

                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <Text style={[globalStyles.midText, styles.listItemPadding]}>计划发运日期</Text>
                    <Text style={[globalStyles.midText, styles.listItemPadding]}>{loadTaskInfo.plan_date ? `${loadTaskInfo.plan_date}` : ''}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}
                    onPress={() => {
                        getRouteCarListWaiting()
                        routerDirection.routeCarList(parent)({ preSceneKey: sceneKey })
                        InteractionManager.runAfterInteractions(() => getRouteCarList({ loadTaskId: loadTaskInfo.id, orderId: loadTaskInfo.order_id }))
                    }}
                >
                    <View style={styles.listItemPadding}>
                        <Text style={[globalStyles.midText]}>运输车辆</Text>
                    </View>
                    <View style={[styles.listItemPadding, styles.listItemBody]}>
                        <Text style={[globalStyles.midText]}>{loadTaskInfo.car_count ? `${loadTaskInfo.car_count}` : '0'}</Text>
                        <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                    </View>
                </TouchableOpacity>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <Text style={[globalStyles.midText, styles.listItemPadding]}>支付供应商</Text>
                    <Text style={[globalStyles.midText, styles.listItemPadding]}><Text style={[styles.fontColor]}>{(_supplier_insure_price + _supplier_trans_price)}</Text> 元</Text>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <View style={styles.listItemPadding}>
                        <Text style={[globalStyles.midText]}>信息同步至供应商</Text>
                    </View>
                    <View style={[styles.listItemPadding, styles.listItemBody]}>
                        <Text style={[globalStyles.midText]}>同步信息</Text>
                        <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                    </View>
                </View>
                <ModalWaiting visible={loadTaskInfoReducer.changeLoadTaskInfoStatus.isResultStatus == 1} title={'状态变更中...'} />

            </Content>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        loadTaskInfoReducer: state.loadTaskInfoReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    changeLoadTaskStatus: req => {
        dispatch(reduxActions.loadTaskInfo.changeLoadTaskStatus(req))
    },
    getRouteCarList: req => {
        dispatch(reduxActions.routeCarList.getRouteCarList(req))
    },
    getRouteCarListWaiting: () => {
        dispatch(reduxActions.routeCarList.getRouteCarListWaiting())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadTaskInfo)


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