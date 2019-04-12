import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { Container, Content, Icon } from 'native-base'
import globalStyles from '../../style/GlobalStyles'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
// import carModal from '../../config/car_modal.json'
import serviceTypeList from '../../config/service_type.json'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import carModal from '../../config/car_modal.json'
import * as reduxActions from '../../reduxActions'

const CarListItem = props => {
    const { item: { vin, ora_insure_price, ora_trans_price, id, valuation, model_type, safe_status, old_car },
        item, i, delOrderCar, sceneKey } = props
    const cartype = new Map(carModal).get(model_type)
    // console.log('item', item)
    return (
        <TouchableOpacity
            key={i}
            onPress={() => { 
                Actions.orderCarEditor({ preSceneKey: sceneKey, orderCarId: id })
                //Actions.orderCarInfo({ preSceneKey: sceneKey, orderCarId: id })
             }}
            style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom, { backgroundColor: '#fff' }]}>
            <View style={[{ flex: 1 }]}>
                <View style={[styles.listItemPadding, styles.listItemBody]}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Icon name='ios-car' style={{ color: '#7baddf' }} />
                        <Text style={[globalStyles.largeText, { marginLeft: 5 }]}>{vin ? `${vin}` : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {old_car == 1 && <View style={{ backgroundColor: '#bd417c', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[globalStyles.midText, { color: '#fff' }]}>新</Text>
                        </View>}
                        {safe_status == 1 && <View style={{ backgroundColor: '#47a11d', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                            <Text style={[globalStyles.midText, { color: '#fff' }]}>保</Text>
                        </View>}
                    </View>
                </View>
                <View style={[styles.listItemPadding, styles.listItemBody]}>
                    <Text style={globalStyles.midText}>{cartype ? `${cartype.name}` : ""}</Text>

                    <Text style={globalStyles.midText}>估值：{valuation ? `${valuation}` : ''}元</Text>
                </View>
                <View style={[styles.listItemPadding, styles.listItemBody]}>
                    <Text style={globalStyles.midText}>应付费用</Text>
                    <Text style={globalStyles.midText}><Text style={globalStyles.xlText}>{ora_insure_price + ora_trans_price}</Text> 元</Text>
                </View>
            </View>
            <View style={[styles.listItemPadding, {}]}>
                <TouchableOpacity onPress={() => delOrderCar({ orderItemId: id })} style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                    <Icon name='ios-close' style={styles.fontColor} />
                </TouchableOpacity>
                <View style={{ flex: 2 }}>
                    <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const CarList = props => {
    const { list, sceneKey, delOrderCar } = props
    return list.map((item, i) => {
        return <CarListItem item={item} key={i} sceneKey={sceneKey} delOrderCar={delOrderCar} />
    })
}

const OrderCarList = props => {
    const { sceneKey, orderId, delOrderCar, order: { total_insure_price, car_num, total_trans_price }, order, orderCarListReducer: { data: { orderCarList } } } = props
    // console.log('orderCarList', orderCarList)
    // console.log('delOrderCar', delOrderCar)
    return (
        <Container style={{ backgroundColor: '#f4f0f4' }}>
            <Content>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <View style={styles.listItemPadding}>
                        <Text style={[globalStyles.midText, globalStyles.styleColor]}>运送车辆：{car_num ? `${car_num}` : '0'}</Text>
                    </View>
                    <TouchableOpacity onPress={() => Actions.addOrderCar({ preSceneKey: sceneKey, order })}>
                        <Icon name='ios-add' style={[styles.fontColor, { paddingRight: 7.5 }]} />
                    </TouchableOpacity>
                </View>
                {orderCarList.length == 0 && <View style={{ alignSelf: 'center', margin: 20 }}>
                    <Text style={[globalStyles.midText, styles.fontColor]}>请点击右上角“+”加号添加车辆信息</Text>
                </View>}
                {CarList({ list: orderCarList, sceneKey, delOrderCar })}
                {orderCarList.length > 0 && <View style={[styles.listItemPadding, styles.listItemBorderBottom]}>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>应付运费</Text>
                        <Text style={globalStyles.midText}><Text style={styles.fontColor}>{total_trans_price ? `${total_trans_price}` : '0'}</Text> 元</Text>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>应付保费</Text>
                        <Text style={globalStyles.midText}><Text style={styles.fontColor}>{total_insure_price ? `${total_insure_price}` : '0'}</Text> 元</Text>
                    </View>
                </View>}
                {orderCarList.length > 0 && <View style={[styles.listItemBody, styles.listItemPadding]}>
                    <Text style={[globalStyles.largeText, styles.listItemPadding, { fontWeight: 'bold' }]}>应付费用</Text>
                    <Text style={{ paddingHorizontal: 7.5 }}><Text style={[globalStyles.xlText, styles.fontColor]}>{`${(total_insure_price + total_trans_price)}`}</Text> 元</Text>
                </View>}
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
    const { orderListNotInfoReducer: { data: { orderListNotInfo } } } = state
    const { orderId } = ownProps
    return {
        order: orderListNotInfo.find(item => item.id == orderId),
        // inquiry: inquiryList.find(item => item.id == inquiryId),
        orderCarListReducer: state.orderCarListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    delOrderCar: req => {
        dispatch(reduxActions.orderCarList.delOrderCar(req))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(OrderCarList)