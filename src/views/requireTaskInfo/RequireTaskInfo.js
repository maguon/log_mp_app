import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Button, Icon } from 'native-base'
import globalStyles from '../../style/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import service_type_list from '../../config/service_type.json'


const RequireTaskInfo = props => {
    console.log('props', props)
    const { requireTaskInfoReducer: {
        data: {
            requireTaskInfo: {
                order_id, created_on, route_start, route_end, real_name, departure_time, order_created_on, car_num,
                order_remark, admin_mark, total_insure_price, total_trans_price, service_type,status
            }, requireTaskInfo } } } = props
    console.log('requireTaskInfo', requireTaskInfo)
    const _total_trans_price = total_trans_price ? total_trans_price : 0
    const _total_insure_price = total_insure_price ? total_insure_price : 0

    const serviceType = new Map(service_type_list).get(service_type)
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
                                待安排
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
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <View style={[styles.listItemPadding]}>
                        <Text style={[globalStyles.midText]}>收发货信息</Text>
                    </View>
                    <View style={[styles.listItemPadding, { flexDirection: 'row' }]}>
                        <Text style={[globalStyles.midText]}>{serviceType}</Text>
                        <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                    </View>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <View style={[styles.listItemPadding]}>
                        <Text style={[globalStyles.midText]}>运送车辆</Text>
                    </View>
                    <View style={[styles.listItemPadding, { flexDirection: 'row' }]}>
                        <Text style={[globalStyles.midText]}>{car_num ? `${car_num}` : ''}</Text>
                        <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                    </View>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <View style={[styles.listItemPadding]}>
                        <Text style={[globalStyles.midText]}>路线安排</Text>
                    </View>
                    <View style={[styles.listItemPadding, { flexDirection: 'row' }]}>
                        <Text style={[globalStyles.midText]}>3</Text>
                        <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                    </View>
                </View>
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
            </Content>
        </Container>
    )
}


const mapStateToProps = (state, ownProps) => {
    return {
        requireTaskInfoReducer: state.requireTaskInfoReducer
    }
}

export default connect(mapStateToProps)(RequireTaskInfo)

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