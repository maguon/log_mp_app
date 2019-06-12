import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { Container, Content, Icon, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../style/GlobalStyles'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
// import carModal from '../../config/car_modal.json'
import serviceTypeList from '../../config/service_type.json'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import carModal from '../../config/car_modal.json'
import * as reduxActions from '../../reduxActions'
import ModalWaiting from '../../components/ModalWaiting'

const CarListItem = props => {
    const { item: { vin, act_insure_price, act_trans_price, id, valuation, model_type, safe_status, old_car },
        item, i, getTransAndInsurePrice, delOrderCar, sceneKey, order } = props
    const cartype = new Map(carModal).get(model_type)
    // console.log('props', props)
    // console.log('order', order)
    return (
        <TouchableOpacity
            key={i}
            onPress={() => {
                getTransAndInsurePrice({
                    distance: order.distance,
                    serviceType: order.service_type,
                    modelType: model_type,
                    oldCar: old_car,
                    valuation: valuation,
                    safeStatus: safe_status
                })
                if (order.created_type == 1) {
                    Actions.orderCarEditor({ preSceneKey: sceneKey, orderCarId: id, order })
                } else {
                    Actions.orderCarInfo({ preSceneKey: sceneKey, orderCarId: id, orderId: order.id })
                }
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
                    <Text style={globalStyles.midText}>估值：{valuation ? `${valuation}` : '0'}元</Text>
                </View>
                <View style={[styles.listItemPadding, styles.listItemBody]}>
                    <Text style={globalStyles.midText}>应付费用</Text>
                    <Text style={globalStyles.midText}><Text style={globalStyles.xlText}>{act_insure_price + act_trans_price}</Text> 元</Text>
                </View>
            </View>
            <View style={[styles.listItemPadding, {}]}>

                {order.created_type == 1 && <TouchableOpacity onPress={() => delOrderCar({ orderItemId: id })} style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                    <Icon name='ios-close' style={styles.fontColor} />
                </TouchableOpacity>}
                <View style={{ flex: 2, justifyContent: order.created_type == 1 ? 'flex-start' : 'center' }}>
                    <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                </View>
            </View>
        </TouchableOpacity>
    )
}


const EmptyList = props => {
    const { title } = props
    return (
        <View style={{ alignSelf: 'center', margin: 20 }}>
            <Text style={[globalStyles.midText, styles.fontColor]}>{title}</Text>
        </View>
    )
}


const CarList = props => {
    const { list, sceneKey, delOrderCar, getTransAndInsurePrice,order
         } = props
    return list.map((item, i) => {
        return <CarListItem
            item={item}
            key={i}
            sceneKey={sceneKey}
            getTransAndInsurePrice={getTransAndInsurePrice}
            order={order}
            delOrderCar={delOrderCar} />
    })
}

const OrderCarList = props => {
    const { sceneKey, getTransAndInsurePrice, delOrderCar,
        orderReducer: { data: { order: { total_insure_price, car_num, total_trans_price, created_type }, 
        order } },
        orderCarListReducer: { data: { orderCarList }, getOrderCarList }, orderCarListReducer } = props
    // console.log('props',props)
    if (getOrderCarList.isResultStatus == 1) {
        return (
            <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Spinner color={styleColor} />
            </Container>
        )
    }
    else {
        return (
            <Container style={{ backgroundColor: '#f4f0f4' }}>
                <Content>
                    <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                        <View style={styles.listItemPadding}>
                            <Text style={[globalStyles.midText, globalStyles.styleColor]}>运送车辆：{car_num ? `${car_num}` : '0'}</Text>
                        </View>
                        {created_type == 1 && <TouchableOpacity onPress={() => Actions.addOrderCar({ preSceneKey: sceneKey, order })}>
                            <Icon name='ios-add' style={[styles.fontColor, { paddingRight: 7.5 }]} />
                        </TouchableOpacity>}
                    </View>
                    {orderCarList.length == 0 && <EmptyList title={created_type == 1 ? '请点击右上角“+”加号添加车辆信息' : '暂无车辆信息'} />}
                    {CarList({ list: orderCarList, sceneKey, delOrderCar, getTransAndInsurePrice, order })}
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
                <ModalWaiting visible={orderCarListReducer.delOrderCar.isResultStatus == 1} />
            </Container>
        )
    }
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
    return {
        orderCarListReducer: state.orderCarListReducer,
        orderReducer: state.orderReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    delOrderCar: req => {
        const { orderId } = ownProps
        dispatch(reduxActions.orderCarList.delOrderCar({ ...req, orderId }))
    },
    getTransAndInsurePrice: req => {
        dispatch(reduxActions.orderCarEditor.getTransAndInsurePrice(req))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderCarList)