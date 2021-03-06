import React, { Component } from 'react'
import { Text, View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, InteractionManager, ToastAndroid, RefreshControl } from 'react-native'
import { Container, Icon } from 'native-base'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../../../style/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Actions } from 'react-native-router-flux'
import * as reduxActions from '../../../reduxActions'
import moment from 'moment'
import { moneyFormat } from '../../../util/util'
import serviceTypeList from '../../../config/service_type.json'

const renderListEmpty = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
            <Text style={globalStyles.midText}>暂无协商记录</Text>
        </View>
    )
}

const renderListItem = props => {
    const { item: { id, created_on, car_num, total_trans_price, total_insure_price, end_city, start_city, service_type,
        created_type }, item, sceneKey, getOrderCarList, getOrderCarListWaiting, initOrder } = props
    const serviceType = new Map(serviceTypeList).get(service_type)

    return (
        <TouchableOpacity onPress={() => {
            getOrderCarListWaiting()
            initOrder({ order: item })
            Actions.order({ preSceneKey: sceneKey })
            InteractionManager.runAfterInteractions(() => getOrderCarList({ orderId: id }))
        }}>
            <View style={[styles.listItemHeader, styles.listItemBorderBottom]}>
                <Text style={[globalStyles.midText, styles.listItemHeaderNo]}>询价编号：{`${id}`}</Text>
                <Text style={[globalStyles.midText, styles.listItemHeaderDate]}>{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
            </View>
            <View style={[styles.listItemBorderBottom, { flexDirection: 'row', padding: 7.5, alignItems: 'center' }]}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', padding: 7.5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons name='truck' style={{ color: '#d58dac', fontSize: 20 }} />
                            <Text style={[globalStyles.largeText, { paddingLeft: 10 }]}>{start_city ? `${start_city}` : ''}</Text>
                            <Icon name='md-arrow-forward' style={{ paddingHorizontal: 10, color: '#00cade', fontSize: 20 }} />
                            <Text style={[globalStyles.largeText]}>{end_city ? `${end_city}` : ''}</Text>
                            {created_type == 1 && <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#f49c20', marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[globalStyles.midText, { color: '#fff' }]}>内</Text>
                            </View>}
                            {created_type == 2 && <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#bd417c', marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[globalStyles.midText, { color: '#fff' }]}>外</Text>
                            </View>}
                            {created_type == 3 && <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#105fab', marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[globalStyles.midText, { color: '#fff' }]}>自</Text>
                            </View>}
                        </View>
                        <View>
                            <Text style={[globalStyles.midText]}>{serviceType ? `${serviceType}` : ''}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7.5 }}>
                        <View>
                            <Text style={[globalStyles.midText]}>运送车辆：{car_num ? `${car_num}` : '0'}</Text>
                        </View>
                        <View>
                            <Text style={[globalStyles.midText]}>应付费用：<Text style={[{ color: '#d82983' }]}>{`${moneyFormat(total_insure_price + total_trans_price, 2)}`}</Text>元</Text>
                        </View>
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
        <View style={styles.footerContainer}>
            <ActivityIndicator color={styleColor} styleAttr='Small' />
            <Text style={[globalStyles.smallText, styles.footerText]}>正在加载...</Text>
        </View>
    )
}

class OrderListNotInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loadListIsFinished: false
        }
    }

    componentDidMount() {
        const { getOrderListNotInfoWaiting, getOrderListNotInfo } = this.props
        getOrderListNotInfoWaiting()
        InteractionManager.runAfterInteractions(getOrderListNotInfo)
    }

    render() {
        const { orderListNotInfoReducer: { getOrderListNotInfo: { isResultStatus }, data: { orderListNotInfo, isCompleted } },
            getOrderListNotInfoMore, orderListNotInfoReducer, getOrderListNotInfo, getOrderListNotInfoWaiting, initOrder,
            getOrderCarList, getOrderCarListWaiting, sceneKey } = this.props

        return (
            <Container>
                <FlatList
                    refreshControl={<RefreshControl
                        refreshing={isResultStatus == 1}
                        onRefresh={() => {
                            getOrderListNotInfoWaiting()
                            InteractionManager.runAfterInteractions(getOrderListNotInfo)
                        }}
                        progressBackgroundColor={'rgba(255,255,255,0)'}
                        tintColor={'rgba(0,0,0,0)'}
                        colors={[styleColor]}
                    />}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (isResultStatus == 2 && !isCompleted) {
                            getOrderListNotInfoMore()
                        } else {
                            if (!this.state.loadListIsFinished) {
                                ToastAndroid.show('已全部加载完毕！', 10)
                                this.setState({
                                    loadListIsFinished: true
                                })
                            }
                        }
                    }}
                    ListEmptyComponent={orderListNotInfoReducer.getOrderListNotInfo.isResultStatus != 1 && orderListNotInfo.length == 0 && renderListEmpty}
                    contentContainerStyle={[styles.list]}
                    keyExtractor={(item, index) => index}
                    data={orderListNotInfo}
                    renderItem={param => renderListItem({ ...param, sceneKey, initOrder, getOrderCarList, getOrderCarListWaiting })}
                    ListFooterComponent={orderListNotInfoReducer.getOrderListNotInfoMore.isResultStatus == 1 ? renderListFooter : <View style={{ height: 15 }} />}
                />
            </Container>
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


const mapStateToProps = (state) => {
    return {
        orderListNotInfoReducer: state.orderListNotInfoReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getOrderListNotInfo: req => {
        dispatch(reduxActions.orderListNotInfo.getOrderListNotInfo(req))
    },
    getOrderListNotInfoWaiting: () => {
        dispatch(reduxActions.orderListNotInfo.getOrderListNotInfoWaiting())
    },
    getOrderListNotInfoMore: () => {
        dispatch(reduxActions.orderListNotInfo.getOrderListNotInfoMore())
    },
    getOrderCarList: req => {
        dispatch(reduxActions.orderCarList.getOrderCarList(req))
    },
    getOrderCarListWaiting: () => {
        dispatch(reduxActions.orderCarList.getOrderCarListWaiting())
    },
    initOrder: req => {
        dispatch(reduxActions.order.initOrder(req))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderListNotInfo)