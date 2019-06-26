import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Switch
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Icon } from 'native-base'
import globalStyles from '../../style/GlobalStyles'
import carModal from '../../config/car_modal.json'

const OrderCarInfo = props => {
    const { orderCar: { vin, model_type,valuation, brand, brand_type,old_car,safe_status, ora_insure_price, ora_trans_price } } = props
    const cartype = new Map(carModal).get(model_type)
    return (
        <Container>
            <Content>
                <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>车型</Text>
                    </View>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>{cartype ? `${cartype.name}` : ''}</Text>
                    </View>
                </View>
                <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>vin</Text>
                    </View>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>{brand ? `${brand}` : ''}</Text>
                    </View>
                </View>
                <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>品牌</Text>
                    </View>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>{brand_type ? `${brand_type}` : ''}</Text>
                    </View>
                </View>
                <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>型号</Text>
                    </View>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>{vin ? `${vin}` : ''}</Text>
                    </View>
                </View>

                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <View style={[styles.listItemBody, { flex: 1 }]}>
                        <Text style={[styles.listItemPadding, globalStyles.midText]}>估值(元)</Text>
                        <Text style={[globalStyles.midText, { paddingRight: 15 }]}>{valuation ? `${valuation}` : ''}</Text>
                    </View>
                    <View style={[styles.listItemBody, { borderLeftWidth: 0.5, borderLeftColor: '#dfdfdf' }]}>
                        <Icon style={{ paddingRight: 7.5, paddingLeft: 15, color: old_car == 1 ? 'green' : '#777' }} name='ios-checkmark-circle' />
                        <Text style={[styles.listItemPadding, globalStyles.midText]}>新车</Text>
                    </View>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <Text style={[styles.listItemPadding, globalStyles.midText]}>车辆保险</Text>
                    <Switch value={safe_status == 1} trackColor={{ true: 'green' }} />
                </View>


                <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>预计运费</Text>
                    </View>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>{ora_trans_price ? `${ora_trans_price}` : ''} 元</Text>
                    </View>
                </View>
                <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>预计保费</Text>
                    </View>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>{ora_insure_price ? `${ora_insure_price}` : ''} 元</Text>
                    </View>
                </View>
                <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>预计费用</Text>
                    </View>
                    <View style={styles.listItemPadding}>
                        <Text style={[globalStyles.midText]}><Text style={[globalStyles.largeText,styles.fontColor]}>{`${(ora_trans_price + ora_insure_price)}`}</Text> 元</Text>
                    </View>
                </View>
            </Content>
        </Container>
    )
}

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


const mapStateToProps = (state, ownProps) => {
    const { orderCarListReducer: { data: { orderCarList } } } = state
    const { orderCarId } = ownProps
    return {
        orderCar: orderCarList.find(item => item.id == orderCarId)
    }
}

export default connect(mapStateToProps)(OrderCarInfo)