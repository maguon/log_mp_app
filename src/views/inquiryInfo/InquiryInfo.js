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
import * as reduxActions from '../../reduxActions'
import { Container, Content, Icon, Button } from 'native-base'
import globalStyles, { styleColor } from '../../style/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'
import { moneyFormat } from '../../util/util'
import { RichTextBox } from '../../components/form'


const InquiryInfo = props => {
    const { inquiry: { id, created_on, remark, start_city, end_city, status, phone, car_num,
        service_type, ora_insure_price, ora_trans_price, user_name, cancel_time,
        inquiry_time, total_insure_price, total_trans_price },
        inquiry, sceneKey, getInquiryCarListWaiting, getInquiryCarList, cancalInquiry, produceOrder } = props
    // console.log('props', props)
    return (
        <Container>
            <Content>
                <View style={[styles.listItemHeader, styles.listItemBorderBottom]}>
                    <Text style={[globalStyles.midText, styles.listItemHeaderNo]}>询价编号：{`${id}`}</Text>
                    <Text style={[globalStyles.midText, styles.listItemHeaderDate]}>{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
                </View>
                <View style={[styles.listItemPadding, styles.listItemBorderBottom, { backgroundColor: '#f5edf3' }]}>
                    <View style={[styles.listItemPadding, styles.listItemBody]}>
                        <View style={styles.listItemBody}>
                            <Text style={[globalStyles.xlText, globalStyles.styleColor, { fontWeight: 'bold' }]}>{start_city ? start_city : ''}</Text>
                            <Icon name='md-arrow-forward' style={{ paddingHorizontal: 10, color: '#00cade', fontSize: 20 }} />
                            <Text style={[globalStyles.xlText, globalStyles.styleColor, { fontWeight: 'bold' }]}>{end_city ? end_city : ''}</Text>
                        </View>
                        <View>
                            <Text style={[globalStyles.midText, styles.fontColor]}>
                                {status == 0 && '待协商'}
                                {status == 1 && '已协商'}
                                {status == 2 && '已生成订单'}
                                {status == 3 && '取消订单'}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.listItemPadding, styles.listItemBody]}>
                        <View>
                            <Text style={[globalStyles.midText]}>{user_name ? user_name : ''} {phone ? phone : ''}</Text>
                        </View>
                        <View>
                            <Icon name='md-call' style={styles.fontColor} />
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.listItemPadding, styles.listItemBorderBottom, styles.listItemBody]}
                    onPress={() => {
                        getInquiryCarListWaiting()
                        Actions.inquiryCarList({ preSceneKey: sceneKey, inquiryId: id })
                        InteractionManager.runAfterInteractions(() => getInquiryCarList({ inquiryId: id }))
                    }}>
                    <View style={styles.listItemPadding}>
                        <Text style={[globalStyles.midText]}><Text style={{ fontWeight: 'bold' }}>运送车辆：</Text>{car_num ? car_num : ''}</Text>
                    </View>
                    <View style={[styles.listItemPadding, styles.listItemBody]}>
                        <Text style={[globalStyles.midText]}>
                            {service_type == 1 && '上门提货'}
                            {service_type == 2 && '当地自提'}
                        </Text>
                        <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                    </View>
                </TouchableOpacity>
                <View style={[styles.listItemPadding, styles.listItemBorderBottom, styles.listItemBody]}>
                    <View style={styles.listItemPadding}>
                        <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>预计费用</Text>
                    </View>
                    <View style={[styles.listItemBody]}>
                        <Text style={[globalStyles.xlText, styles.fontColor, { fontWeight: '400' }]}>{`${moneyFormat(ora_insure_price + ora_trans_price, 2)}`}</Text>
                        <Text style={[styles.listItemPadding, globalStyles.midText]}>元</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.listItemPadding, styles.listItemBorderBottom, styles.listItemBody]}
                    onPress={() => {
                        if (status == 2 || status == 3) {
                            Actions.consultInfo({ preSceneKey: sceneKey, inquiry })
                        } else {
                            Actions.consult({ preSceneKey: sceneKey, inquiry })
                        }
                    }}>
                    <View style={styles.listItemPadding}>
                        <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>协商费用</Text>
                    </View>
                    <View style={[styles.listItemPadding, styles.listItemBody]}>
                        <View style={[styles.listItemBody]}>
                            <Text style={[globalStyles.xlText, styles.fontColor, { fontWeight: '400' }]}>{`${(total_insure_price + total_trans_price)}`}</Text>
                            <Text style={[globalStyles.midText, { paddingLeft: 7.5 }]}>元</Text>
                        </View>
                        <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                    </View>
                </TouchableOpacity>
                <View style={[styles.listItemPadding, styles.listItemBorderBottom]}>
                    <View style={styles.listItemPadding}>
                        <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>协商描述</Text>
                    </View>
                    <View style={styles.listItemPadding}>
                        <Text style={[globalStyles.midText]}>{remark ? remark : ''}</Text>
                    </View>
                </View>
                {status == 2 && <View style={[styles.listItemPadding, styles.listItemBorderBottom, styles.listItemBody]}>
                    <View style={styles.listItemPadding}>
                        <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>生成订单时间</Text>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={[globalStyles.midText]}>{inquiry_time ? `${moment(inquiry_time).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
                    </View>
                </View>}
                {status == 3 && <View style={[styles.listItemPadding, styles.listItemBorderBottom, styles.listItemBody]}>
                    <View style={styles.listItemPadding}>
                        <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>取消订单时间</Text>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={[globalStyles.midText]}>{cancel_time ? `${moment(cancel_time).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
                    </View>
                </View>}
                {status == 1 && <View style={[styles.listItemPadding, styles.listItemBorderBottom, styles.listItemBody]}>
                    <View style={[styles.listItemPadding, { flex: 1 }]}>
                        <Button full bordered style={[{ flex: 1, borderColor: styleColor }]} onPress={() => {
                            Alert.alert(
                                '',
                                '确定取消订单？',
                                [
                                    { text: '取消', onPress: () => { }, style: 'cancel' },
                                    { text: '确定', onPress: () => cancalInquiry({ inquiryId: id }) },
                                ],
                                { cancelable: false }
                            )
                        }}>
                            <Text style={[globalStyles.largeText, styles.fontColor]}>取消订单</Text>
                        </Button>
                    </View>
                    <View style={[styles.listItemPadding, { flex: 1 }]}>
                        <Button full style={[globalStyles.styleBackgroundColor, { flex: 1 }]} onPress={() => {
                            Alert.alert(
                                '',
                                '确定将该询价生成订单？',
                                [
                                    { text: '取消', onPress: () => { }, style: 'cancel' },
                                    { text: '确定', onPress: () => produceOrder({ inquiryId: id }) },
                                ],
                                { cancelable: false }
                            )
                        }}>
                            <Text style={[globalStyles.largeText, { color: '#fff' }]}>生成订单</Text>
                        </Button>
                    </View>
                </View>}
                {status == 0 && <Button full style={[globalStyles.styleBackgroundColor, { margin: 15 }]} onPress={() => { Actions.consult({ inquiry, preSceneKey: sceneKey }) }}>
                    <Text style={[globalStyles.largeText, { color: '#fff' }]}>协商费用</Text>
                </Button>}
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    listItemHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#fff',
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

const mapStateToProps = (state, ownProps) => {
    const { inquiryListReducer: { data: { inquiryList } } } = state
    const { inquiryId } = ownProps
    // console.log('ownProps',ownProps)
    return {
        inquiry: inquiryList.find(item => item.id == inquiryId)
    }
}


const mapDispatchToProps = (dispatch) => ({
    getInquiryCarList: req => {
        dispatch(reduxActions.inquiryCarList.getInquiryCarList(req))
    },
    getInquiryCarListWaiting: () => {
        dispatch(reduxActions.inquiryCarList.getInquiryCarListWaiting())
    },
    cancalInquiry: req => {
        dispatch(reduxActions.inquiryInfo.cancalInquiry(req))
    },
    produceOrder: req => {
        dispatch(reduxActions.inquiryInfo.produceOrder(req))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(InquiryInfo) 