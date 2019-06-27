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
import globalStyles from '../../../style/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'

const renderItem = props => {
    const { item: { id, created_on, departure_time, route_start, route_end, car_num, status } } = props
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
                            {/* <FontAwesome name='ship' style={{ paddingLeft: 10, color: '#00cade', fontSize: 20 }} />
                            <MaterialCommunityIcons name='truck-fast' style={{ paddingLeft: 10, color: '#00cade', fontSize: 22 }} /> */}
                        </View>
                        {status == 0 && <Text style={[globalStyles.midText, styles.fontColor]}>待发运</Text>}
                        {status == 1 && <Text style={[globalStyles.midText, styles.fontColor]}>已发运</Text>}
                        {status == 9 && <Text style={[globalStyles.midText, styles.fontColor]}>已送达</Text>}
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        {/* <Text style={[globalStyles.midText]}>顺通物流</Text> */}
                        <Text style={[globalStyles.midText]}>运送车辆：{car_num ? `${car_num}` : ''}</Text>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={[globalStyles.midText]}>计划发运日期：{departure_time ? `${moment(departure_time).format('YYYY-MM-DD')}` : ''}</Text>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        {/* <Text style={[globalStyles.midText]}>支付供应商</Text> */}
                        {/* <Text style={[globalStyles.midText]}><Text style={[globalStyles.xlText, styles.fontColor]}>3400.00</Text> 元</Text> */}
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
    const { requireTaskListReducer: { data: { requireTaskList } } } = props
    console.log('requireTaskList', requireTaskList)

    return (
        <Container>
            <FlatList
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

export default connect(mapStateToProps)(RequireTaskList)


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
    }
})