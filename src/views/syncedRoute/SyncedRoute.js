import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity, InteractionManager } from 'react-native'
import { Container, Icon, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../style/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import moment from 'moment'
import supplierLoadTaskStatusJson from '../../config/SUPPLIER_LOAD_TASK_STATUS.json'
import supplierDemandStatusJson from '../../config/SUPPLIER_DEMAND_STATUS.json'
import * as reduxActions from '../../reduxActions'
import * as routerDirection from '../../util/RouterDirection'

const ListHeaderComponent = props => {
    const { require } = props
    const supplierLoadTaskStatus = new Map(supplierDemandStatusJson).get(require.demand_status)
    return (
        <View style={[styles.listItemPadding, { backgroundColor: '#f1ebf1' }]}>
            <View style={[styles.listItemBody, styles.listItemPadding]}>
                <Text style={globalStyles.midText}>需求编号：{require.id ? `${require.id}` : ''}</Text>
                <Text style={globalStyles.midText}>{supplierLoadTaskStatus}</Text>
            </View>
            <View style={[styles.listItemBody]}>
                <View style={[styles.listItemPadding, { flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={[globalStyles.xlText, { color: '#000' }]}>{require.route_start ? `${require.route_start}` : ''}</Text>
                    <Icon name='md-arrow-forward' style={{ paddingHorizontal: 10, color: '#00cade', fontSize: 20 }} />
                    <Text style={[globalStyles.xlText, { color: '#000' }]}>{require.route_end ? `${require.route_end}` : ''}</Text>
                    <MaterialCommunityIcons name='truck-fast' style={{ paddingLeft: 10, color: '#00cade', fontSize: 22 }} />
                    {/*      {item.trans_type == 2 && <FontAwesome name='ship' style={{ paddingLeft: 10, color: '#00cade', fontSize: 20 }} />} */}
                </View>
                <View style={[styles.listItemPadding]}>
                    <Text style={globalStyles.midText}>装车地：{require.addr_name ? `${require.addr_name}` : ''}</Text>
                </View>
            </View>
            <View style={[styles.listItemBody, styles.listItemPadding]}>
                <Text style={globalStyles.midText}>派送车辆：{require.pre_count ? `${require.pre_count}` : ''}</Text>
                <Text style={globalStyles.midText}>已派车辆：{require.plan_count ? `${require.plan_count}` : ''}</Text>
            </View>
            <View style={[styles.listItemBody, styles.listItemPadding, { alignSelf: 'flex-end' }]}>
                <Text style={globalStyles.midText}>指令日期：{require.date_id ? `${moment(`${require.date_id}`).format('YYYY-MM-DD')}` : ''}</Text>
            </View>
            <View style={[styles.listItemBody, styles.listItemPadding, { alignSelf: 'flex-end' }]}>
                <Text style={globalStyles.midText}>需求生成日期：{require.date_id ? `${moment(require.created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
            </View>
        </View>
    )
}


const renderItem = props => {
    const { item, getCarListForSyncedRouteWaiting, getCarListForSyncedRoute, parent, sceneKey, loadTaskId } = props
    const supplierLoadTaskStatus = new Map(supplierLoadTaskStatusJson).get(item.load_task_status)
    return (
        <TouchableOpacity style={[{ borderWidth: 0.5, borderColor: '#dfdfdf', margin: 5 }]}
            onPress={() => {
                getCarListForSyncedRouteWaiting()
                routerDirection.carListForSyncedRoute(parent)({ preSceneKey: sceneKey, syncedRouteInfo: item })
                InteractionManager.runAfterInteractions(() => {
                    getCarListForSyncedRoute({ syncLoadTaskDetailId: item.id, loadTaskId })
                })
            }}>
            <View style={[styles.listItemBody, { borderBottomWidth: 0.5, borderColor: '#dfdfdf', padding: 10, backgroundColor: '#f8f5f8' }]}>
                <Text style={globalStyles.midText}>调度编号：{item.id ? `${item.id}` : ''}</Text>
                <Text style={[globalStyles.midText, styles.fontColor]}>{supplierLoadTaskStatus}</Text>
            </View>
            <View style={{ padding: 5 }}>
                <View style={[styles.listItemBody, { padding: 5 }]}>
                    <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>{item.demand_route_start ? `${item.demand_route_start}` : ''} -> {item.demand_route_end ? `${item.demand_route_end}` : ''}</Text>
                    <Text style={globalStyles.midText}>装车数：{item.car_count ? `${item.car_count}` : ''}</Text>
                </View>
                <View style={[styles.listItemBody, { padding: 5 }]}>
                    <Text style={globalStyles.midText}>司机：{item.drive_name ? `${item.drive_name}` : ''}</Text>
                    <Text style={globalStyles.midText}>货车：{item.truck_num ? `${item.truck_num}` : ''}</Text>
                </View>
                <View style={[styles.listItemBody, { padding: 5 }]}>
                    <Text style={globalStyles.midText}>计划执行时间：{item.plan_date ? `${moment(item.plan_date).format('YYYY-MM-DD')}` : ''}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const SyncedRoute = props => {
    console.log('props', props)
    const { syncedRouteRecuer: { data: { syncedRouteInfo }, getSyncedRoute: { isResultStatus } },
        getCarListForSyncedRouteWaiting, getCarListForSyncedRoute, parent, sceneKey, loadTaskId } = props
    if (isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>
                <ListHeaderComponent require={syncedRouteInfo.require[0]} />
                <FlatList
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={{ padding: 5 }}
                    data={syncedRouteInfo.routeLoadTask}
                    renderItem={param => renderItem({ ...param, getCarListForSyncedRouteWaiting, loadTaskId, getCarListForSyncedRoute, parent, sceneKey })} />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        syncedRouteRecuer: state.syncedRouteRecuer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarListForSyncedRoute: req => {
        dispatch(reduxActions.carListForSyncedRoute.getCarListForSyncedRoute(req))
    },
    getCarListForSyncedRouteWaiting: () => {
        dispatch(reduxActions.carListForSyncedRoute.getCarListForSyncedRouteWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SyncedRoute)

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