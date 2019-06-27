import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Icon } from 'native-base'
import globalStyles, { styleColor } from '../../../style/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'


const renderListEmpty = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
            <Text style={globalStyles.midText}>暂无订单需求</Text>
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
    const { item: { id, created_on, route_start, route_end, car_num, total_insure_price, total_trans_price, service_type } } = props
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
                            <MaterialCommunityIcons name='truck' style={{ color: '#d58dac', fontSize: 20 }} />
                            <Text style={[globalStyles.xlText, { color: '#000', paddingLeft: 10 }]}>{route_start ? `${route_start}` : ''}</Text>
                            <Icon name='md-arrow-forward' style={{ paddingHorizontal: 10, color: '#00cade', fontSize: 20 }} />
                            <Text style={[globalStyles.xlText, { color: '#000' }]}>{route_end ? `${route_end}` : ''}</Text>
                        </View>
                        {service_type == 2 && <Text style={[globalStyles.midText, styles.fontColor]}>当地自提</Text>}
                        {service_type == 1 && <Text style={[globalStyles.midText, styles.fontColor]}>上门服务</Text>}
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={[globalStyles.midText]}>运送车辆：{car_num ? `${car_num}` : ''}</Text>
                        <Text style={[globalStyles.midText]}>支付供应商<Text style={[globalStyles.xlText, styles.fontColor]}>{(_total_insure_price + _total_trans_price)}</Text> 元</Text>
                    </View>
                </View>
                <View>
                    <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const RequireTaskList = props => {
    console.log('props', props)
    const { requireTaskListReducer: { data: { requireTaskList }, getRequireTaskList: { isResultStatus } } } = props
    console.log('requireTaskList', requireTaskList)

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
                data={requireTaskList}
                renderItem={renderItem} />
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        requireTaskListReducer: state.requireTaskListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRequireTaskListMore: () => {

    },
    getRequireTaskList: () => {

    },
    getRequireTaskListWaiting: () => {

    }
})


export default connect(mapStateToProps, mapDispatchToProps)(RequireTaskList)


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