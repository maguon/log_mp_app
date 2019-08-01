import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity, InteractionManager } from 'react-native'
import { Container, Icon, Spinner } from 'native-base'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../../style/GlobalStyles'
import moment from 'moment'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as reduxActions from '../../reduxActions'
import { Actions } from 'react-native-router-flux'
import * as routerDirection from '../../util/RouterDirection'

const renderItem = props => {
    const { item,  setLoadTaskInfo, sceneKey, parent,requireTaskInfo } = props

    const _supplier_trans_price = item.supplier_trans_price ? item.supplier_trans_price : 0
    const _supplier_insure_price = item.supplier_insure_price ? item.supplier_insure_price : 0
    
    return (
        <TouchableOpacity style={styles.listItemBorderBottom}
            onPress={() => {
                setLoadTaskInfo(item)
                routerDirection.loadTaskInfo(parent)({ preSceneKey: sceneKey,requireTaskInfo })
            }}>
            <View style={[styles.listItemHeader, styles.listItemBorderBottom]}>
                <Text style={globalStyles.midText}>线路编号：{item.id ? `${item.id}` : ''}</Text>
                <Text style={globalStyles.midText}>{item.created_on ? `${moment(item.created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
            </View>
            <View style={[styles.listItemPadding, { flexDirection: 'row', alignItems: 'center' }]}>
                <View style={{ flex: 1 }}>
                    <View style={styles.listItemBody}>
                        <View style={[styles.listItemPadding, { flexDirection: 'row', alignItems: 'center' }]}>
                            <Text style={[globalStyles.xlText, { color: '#000' }]}>{item.route_start ? `${item.route_start}` : ''}</Text>
                            <Icon name='md-arrow-forward' style={{ paddingHorizontal: 10, color: '#00cade', fontSize: 20 }} />
                            <Text style={[globalStyles.xlText, { color: '#000' }]}>{item.route_end ? `${item.route_end}` : ''}</Text>
                            {item.trans_type == 1 && <MaterialCommunityIcons name='truck-fast' style={{ paddingLeft: 10, color: '#00cade', fontSize: 22 }} />}
                            {item.trans_type == 2 && <FontAwesome name='ship' style={{ paddingLeft: 10, color: '#00cade', fontSize: 20 }} />}
                        </View>
                        <View style={[styles.listItemPadding]}>
                            {item.load_task_status == 1 && <Text style={[globalStyles.midText, styles.fontColor]}>待发运</Text>}
                            {item.load_task_status == 2 && <Text style={[globalStyles.midText, styles.fontColor]}>已发运</Text>}
                            {item.load_task_status == 3 && <Text style={[globalStyles.midText, styles.fontColor]}>已送达</Text>}
                        </View>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={globalStyles.midText}>{item.supplier_short ? `${item.supplier_short}` : ''}</Text>
                        <Text style={globalStyles.midText}>运送车辆：{item.car_count ? `${item.car_count}` : '0'}</Text>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={globalStyles.midText}>计划发运时间：{item.plan_date ? `${item.plan_date}` : ''}</Text>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={globalStyles.midText}>支付供应商</Text>
                        <Text style={globalStyles.midText}><Text style={styles.fontColor}>{`${(_supplier_trans_price + _supplier_insure_price)}`}</Text> 元</Text>
                    </View>
                </View>
                <View>
                    <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const renderListEmpty = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
            <Text style={globalStyles.midText}>暂无路线</Text>
        </View>
    )
}

const renderListFooter = props => {
    const { totalSupplierInsurePrice, totalSupplierTransPrice } = props
    return (
        <View style={[{ backgroundColor: '#f5edf3' }]}>
            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                <Text style={[styles.listItemPadding, globalStyles.midText]}>供应商运费总额</Text>
                <Text style={[styles.listItemPadding, globalStyles.midText]}><Text style={styles.fontColor}>{totalSupplierTransPrice}</Text> 元</Text>
            </View>
            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                <Text style={[styles.listItemPadding, globalStyles.midText]}>供应商保费总额</Text>
                <Text style={[styles.listItemPadding, globalStyles.midText]}><Text style={styles.fontColor}>{totalSupplierInsurePrice}</Text> 元</Text>
            </View>
            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                <Text style={[styles.listItemPadding, globalStyles.midText]}>支付供应商总额</Text>
                <Text style={[styles.listItemPadding, globalStyles.midText]}><Text style={styles.fontColor}>{`${(totalSupplierTransPrice + totalSupplierInsurePrice)}`}</Text> 元</Text>
            </View>
        </View>
    )
}


const RouteTaskListForOrder = props => {
    const { routeTaskListForOrderReducer: { data: { routeTaskListForOrder },
        getRouteTaskListForOrder: { isResultStatus } },
        routeTaskListForOrderReducer, setLoadTaskInfo,
         sceneKey, order, parent,requireTaskInfo } = props
    const totalSupplierInsurePrice = routeTaskListForOrder.reduce((prev, curr) => {
        const currSupplierInsurePrice = curr.supplier_insure_price ? curr.supplier_insure_price : 0
        return prev + currSupplierInsurePrice
    }, 0)

    const totalSupplierTransPrice = routeTaskListForOrder.reduce((prev, curr) => {
        const currSupplierTransPrice = curr.supplier_trans_price ? curr.supplier_trans_price : 0
        return prev + currSupplierTransPrice
    }, 0)
    console.log('props',props)
    // console.log('props',props)

    if (isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={routeTaskListForOrder}
                    ListEmptyComponent={routeTaskListForOrderReducer.getRouteTaskListForOrder.isResultStatus != 1 && routeTaskListForOrder.length == 0 && renderListEmpty}
                    ListFooterComponent={() => {
                        if (routeTaskListForOrder.length > 0) {
                            return renderListFooter({ totalSupplierInsurePrice, totalSupplierTransPrice })
                        } else {
                            return <View />
                        }
                    }}
                    renderItem={param => renderItem({ ...param, order,  setLoadTaskInfo, parent, sceneKey,requireTaskInfo })}
                />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        routeTaskListForOrderReducer: state.routeTaskListForOrderReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    setLoadTaskInfo: param => {
        dispatch(reduxActions.loadTaskInfo.setLoadTaskInfo(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RouteTaskListForOrder)


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