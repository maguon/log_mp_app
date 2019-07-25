import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Switch
} from 'react-native'
import { Container, Content, ActionSheet, Button, Icon } from 'native-base'
import globalStyles from '../../style/GlobalStyles'
import { connect } from 'react-redux'
import carModal from '../../config/car_modal.json'

const InquiryCarInfo = props => {
    const { inquiryCar: { car_num, model_id, one_trans_price, one_insure_price, plan_total, safe_status, old_car }, inquiryCar } = props
    const model = new Map(carModal).get(model_id)

    return (
        <Container style={{ backgroundColor: '#f4f0f4' }}>
            <Content>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <Text style={[styles.listItemPadding, globalStyles.midText, { fontWeight: 'bold' }]}>车型</Text>
                    <Text style={[styles.listItemPadding, globalStyles.midText]}>{model.name}</Text>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <View style={[styles.listItemBody, { flex: 1 }]}>
                        <Text style={[styles.listItemPadding, globalStyles.midText, { fontWeight: 'bold' }]}>估值(元)</Text>
                        <Text style={[globalStyles.midText, { paddingRight: 15, }]}>{plan_total ? `${plan_total}` : ''}</Text>
                    </View>
                    <View style={[styles.listItemBody, { borderLeftWidth: 0.5, borderLeftColor: '#dfdfdf' }]}>
                        <Icon style={{ paddingRight: 7.5, paddingLeft: 15, color: old_car == 1 ? 'green' : '#777' }} name='ios-checkmark-circle' />
                        <Text style={[styles.listItemPadding, globalStyles.midText]}>新车</Text>
                    </View>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <Text style={[styles.listItemPadding, globalStyles.midText, { fontWeight: 'bold' }]}>车辆保险</Text>
                    <Switch value={safe_status == 1} trackColor={{ true: 'green' }} />
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <Text style={[styles.listItemPadding, globalStyles.midText, { fontWeight: 'bold' }]}>预计运费</Text>
                    <Text style={[styles.listItemPadding, globalStyles.midText]}><Text style={styles.fontColor}>{one_trans_price ? `${one_trans_price}` : ""}</Text> 元</Text>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <Text style={[styles.listItemPadding, globalStyles.midText, { fontWeight: 'bold' }]}>预计保费</Text>
                    <Text style={[styles.listItemPadding, globalStyles.midText]}><Text style={styles.fontColor}>{one_insure_price ? `${one_insure_price}` : ""}</Text> 元</Text>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <Text style={[styles.listItemPadding, globalStyles.midText, { fontWeight: 'bold' }]}>数量</Text>
                    <Text style={[styles.listItemPadding, globalStyles.midText, styles.fontColor]}>{car_num ? `${car_num}` : ''}</Text>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding]}>
                    <Text style={[styles.listItemPadding, globalStyles.midText, { fontWeight: 'bold' }]}>预计费用</Text>
                    <Text style={[styles.listItemPadding, globalStyles.midText]}><Text style={styles.fontColor}>{(one_insure_price + one_trans_price)}</Text> 元</Text>
                </View>
            </Content>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { inquiryCarListReducer: { data: { inquiryCarList } } } = state
    const { inquiryCarId } = ownProps
    return {
        inquiryCar: inquiryCarList.find(item => item.id == inquiryCarId)
    }
}

export default connect(mapStateToProps)(InquiryCarInfo)

const styles = StyleSheet.create({
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
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    fontColor: {
        color: '#bd417c'
    }
})