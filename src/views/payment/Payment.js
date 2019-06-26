import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import { Container, Content } from 'native-base'
import globalStyles from '../../style/GlobalStyles'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import moment from 'moment'
import orderPaymentStatusList from '../../config/order_payment_status.json'

const RenderPaymentList = props => {
    // console.log('props', props)
    const paymentList = props.paymentList.map((item, index) => {
        if (item.payment_type == 1) {
            return renderWeChatPayment({ item, index })
        } else if (item.payment_type == 2) {
            return renderBankCardPayment({ item, index })
        } else {
            return renderOtherPayment({ item, index })
        }
    })
    return (
        <View style={{ marginTop: 15 }}>
            {paymentList}
        </View>
    )
}

const renderBankCardPayment = props => {
    const { item, index } = props
    // console.log('item', item)
    return (
        <View key={index} style={[styles.listItemPadding, styles.listItemBorderBottom, { backgroundColor: '#fff' }]}>
            <View style={[styles.listItemPadding, styles.listItemBody]}>
                <Text style={[globalStyles.xlText]}>支付金额：<Text style={[styles.fontColor]}>{item.total_fee ? `${item.total_fee}` : ''}</Text>元</Text>
                {item.status == 0 && <Text style={[globalStyles.midText, styles.fontColor]}>审核中</Text>}
                {item.status == 1 && <Text style={[globalStyles.midText, styles.fontColor]}>已审核</Text>}
            </View>
            <View style={[styles.listItemPadding, styles.listItemBody]}>
                <View style={[, { flexDirection: 'row', }]}>
                    <FontAwesomeIcon name='credit-card-alt' style={[styles.fontColor, { fontSize: 20 }]} />
                    <Text style={[globalStyles.largeText, { marginLeft: 10 }]}>{item.bank ? `${item.bank}` : ''}：{item.bank_code ? `${item.bank_code}` : ''}</Text>
                </View>
                <Text style={[globalStyles.largeText]}>{item.account_name ? `${item.account_name}` : ''}</Text>
            </View>
            <View style={[styles.listItemPadding, styles.listItemBody]}>
                <Text style={[globalStyles.midText]}>支付时间：{item.created_on ? `${moment(item.created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
            </View>
        </View>
    )
}

const renderWeChatPayment = props => {
    const { item, index } = props
    return (
        <View key={index} style={[styles.listItemPadding, styles.listItemBorderBottom, { backgroundColor: '#fff' }]}>
            <View style={[styles.listItemPadding, styles.listItemBody]}>
                <Text style={[globalStyles.xlText]}>支付金额：<Text style={[styles.fontColor]}>{item.total_fee ? `${item.total_fee}` : ''}</Text>元</Text>
            </View>
            <View style={[styles.listItemPadding, { flexDirection: 'row', }]}>
                <FontAwesomeIcon name='wechat' style={[styles.fontColor, { fontSize: 20 }]} />
                <Text style={[globalStyles.largeText, { marginLeft: 10 }]}>微信</Text>
            </View>
            <View style={[styles.listItemPadding, styles.listItemBody]}>
                <Text style={[globalStyles.midText]}>支付时间：{item.created_on ? `${moment(item.created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
            </View>
        </View>
    )
}

const renderOtherPayment = props => {
    const { item, index } = props
    return (
        <View key={index} style={[styles.listItemPadding, styles.listItemBorderBottom, { backgroundColor: '#fff' }]}>
            <Text style={[globalStyles.xlText]}>无法识别的支付类型</Text>
        </View>
    )
}


const Payment = props => {
    // console.log('props', props)
    const { paymentReucer: { data: { paymentList } }, order: { total_insure_price, total_trans_price, real_payment_price, payment_status } } = props
    const paymentCount = paymentList.reduce((prev, curr) => {
        if (curr.type == 0 && curr.status == 1) {
            return {
                ...prev,
                refund: prev.refund + curr.total_fee,
                actFee: prev.refund + curr.total_fee
            }
        } else if (curr.type == 1 && curr.status == 1) {
            return {
                ...prev,
                paidFee: prev.paidFee + curr.total_fee,
                actFee: prev.refund + curr.total_fee
            }
        } else {
            return prev
        }
    }, { refund: 0, paidFee: 0, actFee: 0 })
    const orderPaymentStatus = new Map(orderPaymentStatusList).get(payment_status)
    return (
        <Container style={{ backgroundColor: '#f6f1f5' }}>
            <Content>
                <View style={[styles.listItemPadding, styles.listItemBorderBottom, { backgroundColor: '#fff' }]}>
                    <View style={[styles.listItemPadding, styles.listItemBody]}>
                        <Text style={[globalStyles.xlText]}>订单金额：<Text style={[styles.fontColor]}>{(total_insure_price + total_trans_price)}</Text>元</Text>
                        <Text style={[globalStyles.midText, styles.fontColor]}>{orderPaymentStatus ? `${orderPaymentStatus}` : '未知'}</Text>
                    </View>
                    <View style={[styles.listItemPadding, styles.listItemBody]}>
                        <Text style={[globalStyles.midText]}>实收款：<Text style={[styles.fontColor]}>{paymentCount.actFee ? `${paymentCount.actFee}` : '0'}</Text>元</Text>
                        <Text style={[globalStyles.midText]}>已支付：<Text style={[styles.fontColor]}>{paymentCount.paidFee ? `${paymentCount.paidFee}` : '0'}</Text>元</Text>
                        <Text style={[globalStyles.midText]}>已退款：<Text style={[styles.fontColor]}>{paymentCount.refund ? `${paymentCount.refund}` : '0'}</Text>元</Text>
                    </View>
                </View>
                {RenderPaymentList({ paymentList })}
            </Content>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        paymentReucer: state.paymentReucer
    }
}

export default connect(mapStateToProps)(Payment)

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