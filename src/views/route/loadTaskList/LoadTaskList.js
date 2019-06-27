import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    RefreshControl
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Icon } from 'native-base'
import globalStyles,{styleColor} from '../../../style/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'


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
    // console.log('props', props)
    const { item: { id, created_on, plan_date, route_start, route_end, car_count, require_status, supplier_short, trans_type, total_trans_price, total_insure_price } } = props
    let _total_insure_price = total_insure_price ? total_insure_price : 0
    let _total_trans_price = total_trans_price ? total_trans_price : 0

    return (
        <TouchableOpacity onPress={() => { }}>
            <View style={[styles.listItemHeader, styles.listItemBorderBottom]}>
                <Text style={[globalStyles.midText, styles.listItemHeaderNo]}>路线编号：{id ? `${id}` : ''}</Text>
                <Text style={[globalStyles.midText, styles.listItemHeaderDate]}>{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
            </View>
            <View style={[styles.listItemPadding, styles.listItemBorderBottom, { flexDirection: 'row', alignItems: 'center' }]}>
                <View style={{ flex: 1 }}>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={[globalStyles.xlText, { color: '#000' }]}>{route_start ? `${route_start}` : ''}</Text>
                            <Icon name='md-arrow-forward' style={{ paddingHorizontal: 10, color: '#00cade', fontSize: 20 }} />
                            <Text style={[globalStyles.xlText, { color: '#000' }]}>{route_end ? `${route_end}` : ''}</Text>
                            {trans_type == 1 && <MaterialCommunityIcons name='truck-fast' style={{ paddingLeft: 10, color: '#00cade', fontSize: 22 }} />}
                            {trans_type == 2 && <FontAwesome name='ship' style={{ paddingLeft: 10, color: '#00cade', fontSize: 20 }} />}
                        </View>
                        {require_status == 0 && <Text style={[globalStyles.midText, styles.fontColor]}>待发运</Text>}
                        {require_status == 1 && <Text style={[globalStyles.midText, styles.fontColor]}>已发运</Text>}
                        {require_status == 9 && <Text style={[globalStyles.midText, styles.fontColor]}>已送达</Text>}
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={[globalStyles.midText]}>{supplier_short ? `${supplier_short}` : ''}</Text>
                        <Text style={[globalStyles.midText]}>运送车辆：{car_count ? `${car_count}` : ''}</Text>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={[globalStyles.midText]}>计划发运日期：{plan_date ? `${moment(plan_date).format('YYYY-MM-DD')}` : ''}</Text>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={[globalStyles.midText]}>支付供应商</Text>
                        <Text style={[globalStyles.midText]}><Text style={[globalStyles.xlText, styles.fontColor]}>{(_total_trans_price + _total_insure_price)}</Text> 元</Text>
                    </View>
                </View>
                <View>
                    <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const LoadTaskList = props => {
    console.log('props', props)
    const { loadTaskListReducer: {
        data: { loadTaskList, isCompleted },
        getLoadTaskList: { isResultStatus } },
        loadTaskListReducer,
        getLoadTaskListMore,
        getLoadTaskListWaiting,
        getLoadTaskList } = props
    console.log('loadTaskList', loadTaskList)

    return (
        <Container>
            <FlatList
                refreshControl={<RefreshControl
                    refreshing={isResultStatus == 1}
                    onRefresh={() => {
                        getLoadTaskListWaiting()
                        InteractionManager.runAfterInteractions(getLoadTaskList)
                    }}
                    progressBackgroundColor={'rgba(255,255,255,0)'}
                    tintColor={'rgba(0,0,0,0)'}
                    colors={[styleColor]}
                />}
                keyExtractor={(item, index) => index}
                onEndReachedThreshold={0.2}
                onEndReached={() => {
                    if (isResultStatus == 2 && !isCompleted) {
                        getLoadTaskListMore()
                    } else {
                        // if (!this.state.loadListIsFinished) {
                        //     ToastAndroid.show('已全部加载完毕！', 10)
                        //     this.setState({
                        //         loadListIsFinished: true
                        //     })
                        // }
                    }
                }}
                ListEmptyComponent={loadTaskListReducer.getLoadTaskList.isResultStatus != 1 && loadTaskList.length == 0 && renderListEmpty}
                ListFooterComponent={loadTaskListReducer.getLoadTaskListMore.isResultStatus == 1 ? renderListFooter : <View style={{ height: 15 }} />}
                data={loadTaskList}
                renderItem={renderItem} />
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        loadTaskListReducer: state.loadTaskListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getLoadTaskListMore: () => {

    },
    getLoadTaskList: () => {

    },
    getLoadTaskListWaiting: () => {

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadTaskList)


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