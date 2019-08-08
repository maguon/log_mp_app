import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity, InteractionManager } from 'react-native'
import { Container, Icon, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../style/GlobalStyles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import supplierLoadTaskStatusJson from '../../config/SUPPLIER_LOAD_TASK_STATUS.json'
import moment from 'moment'

const ListHeaderComponent = props => {
    // console.log('props', props)
    const { syncedRouteInfo } = props
    const supplierLoadTaskStatus = new Map(supplierLoadTaskStatusJson).get(syncedRouteInfo.load_task_status)
    return (
        <View style={[styles.listItemPadding, { backgroundColor: '#f1ebf1' }]}>
            <View style={[styles.listItemBody, styles.listItemPadding]}>
                <Text style={globalStyles.midText}>调度编号：{syncedRouteInfo.id ? `${syncedRouteInfo.id}` : ''}</Text>
                <Text style={globalStyles.midText}>{supplierLoadTaskStatus ? `${supplierLoadTaskStatus}` : ''}</Text>
            </View>
            <View style={[styles.listItemBody]}>
                <View style={[styles.listItemPadding, { flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={[globalStyles.xlText, { color: '#000' }]}>{syncedRouteInfo.demand_route_start ? `${syncedRouteInfo.demand_route_start}` : ''}</Text>
                    <Icon name='md-arrow-forward' style={{ paddingHorizontal: 10, color: '#00cade', fontSize: 20 }} />
                    <Text style={[globalStyles.xlText, { color: '#000' }]}>{syncedRouteInfo.demand_route_end ? `${syncedRouteInfo.demand_route_end}` : ''}</Text>
                </View>
                <View style={[styles.listItemPadding]}>
                    <Text style={globalStyles.midText}>装车数：{syncedRouteInfo.car_count ? `${syncedRouteInfo.car_count}` : ''}</Text>
                </View>
            </View>
            <View style={[styles.listItemBody, styles.listItemPadding]}>
                <Text style={globalStyles.midText}>司机：{syncedRouteInfo.drive_name ? `${syncedRouteInfo.drive_name}` : ''}</Text>
                <Text style={globalStyles.midText}>货车：{syncedRouteInfo.truck_num ? `${syncedRouteInfo.truck_num}` : ''}</Text>
            </View>
            <View style={[styles.listItemBody, styles.listItemPadding, { alignSelf: 'flex-end' }]}>
                <Text style={globalStyles.midText}>计划执行时间：{syncedRouteInfo.plan_date ? `${moment(syncedRouteInfo.plan_date).format('YYYY-MM-DD')}` : ''}</Text>
            </View>
        </View>
    )
}


const renderItem = props => {
    // console.log('props', props)
    const { item } = props
    return (
        <View style={{ flexDirection: "row", borderColor: '#dfdfdf', borderBottomWidth: 0.5, padding: 15 }}>
            <Icon name='ios-car' style={[styles.fontColor, { fontSize: 20 }]} />
            <Text style={[globalStyles.midText, { marginLeft: 15 }]}>{item.vin ? `${item.vin}` : ''}</Text>
        </View>
    )
}


const CarListForSyncedRoute = props => {
    // console.log('props', props)
    const { carListForSyncedRouteReducer: { data: { carList }, getCarListForSyncedRoute: { isResultStatus } }, syncedRouteInfo } = props
    if (isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>
                <ListHeaderComponent syncedRouteInfo={syncedRouteInfo} />
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={carList}
                    renderItem={renderItem} />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        carListForSyncedRouteReducer: state.carListForSyncedRouteReducer
    }
}

export default connect(mapStateToProps)(CarListForSyncedRoute)

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