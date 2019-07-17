import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import { Container, Icon, Spinner } from 'native-base'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../../style/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import car_modal_list from '../../config/car_modal.json'

const renderItem = props => {
    const { item } = props
    const car_modal = new Map(car_modal_list).get(item.model_type)

    const _supplier_trans_price = item.supplier_trans_price ? item.supplier_trans_price : 0
    const _supplier_insure_price = item.supplier_insure_price ? item.supplier_insure_price : 0
    return (
        <View onPress={() => { }}
            style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom, { marginTop: 10, backgroundColor: '#fff' }]}>
            <View style={[{ flex: 1 }]}>
                <View style={[styles.listItemPadding, styles.listItemBody]}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Icon name='ios-car' style={{ color: '#7baddf' }} />
                        <Text style={[globalStyles.largeText, { marginLeft: 5 }]}>{item.vin ? `${item.vin}` : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {item.old_car == 1 && <View style={{ backgroundColor: '#bd417c', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[globalStyles.midText, { color: '#fff' }]}>新</Text>
                        </View>}
                        {item.safe_status == 1 && <View style={{ backgroundColor: '#47a11d', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                            <Text style={[globalStyles.midText, { color: '#fff' }]}>保</Text>
                        </View>}
                    </View>
                </View>
                <View style={[styles.listItemPadding, styles.listItemBody]}>
                    <Text style={globalStyles.midText}>{car_modal.name ? `${car_modal.name}` : ''}（{item.brand ? `${item.brand}` : ''}-{item.brand_type ? `${item.brand_type}` : ''}）</Text>
                    <Text style={globalStyles.midText}>估值：<Text style={styles.fontColor}>{item.valuation ? `${item.valuation}` : '0'}</Text> 元</Text>
                </View>
                <View style={[styles.listItemPadding, styles.listItemBody]}>
                    <Text style={globalStyles.midText}>运费：<Text style={styles.fontColor}>{item.supplier_trans_price ? `${item.supplier_trans_price}` : '0'}</Text> 元</Text>
                    <Text style={globalStyles.midText}>保费：<Text style={styles.fontColor}>{item.supplier_insure_price ? `${item.supplier_insure_price}` : '0'}</Text> 元</Text>
                </View>
                <View style={[styles.listItemPadding, styles.listItemBody]}>
                    <Text style={globalStyles.midText}>支付供应商</Text>
                    <Text style={globalStyles.midText}><Text style={styles.fontColor}>{`${(_supplier_trans_price + _supplier_insure_price)}`}</Text> 元</Text>
                </View>
            </View>
        </View>
    )
}

const renderListEmpty = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
            <Text style={globalStyles.midText}>暂无运输车辆</Text>
        </View>
    )
}

const renderListFooter = props => {
    const { totalSupplierTransPrice, totalSupplierInsurePrice } = props
    return (
        <View style={[{ backgroundColor: '#f5edf3' }]}>
            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                <Text style={[styles.listItemPadding, globalStyles.midText]}>供应商运费总额</Text>
                <Text style={[styles.listItemPadding, globalStyles.midText]}><Text style={styles.fontColor}>{`${totalSupplierTransPrice}`}</Text> 元</Text>
            </View>
            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                <Text style={[styles.listItemPadding, globalStyles.midText]}>供应商保费总额</Text>
                <Text style={[styles.listItemPadding, globalStyles.midText]}><Text style={styles.fontColor}>{`${totalSupplierInsurePrice}`}</Text> 元</Text>
            </View>
            <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                <Text style={[styles.listItemPadding, globalStyles.midText]}>支付供应商总额</Text>
                <Text style={[styles.listItemPadding, globalStyles.midText]}><Text style={styles.fontColor}>{`${(totalSupplierTransPrice + totalSupplierInsurePrice)}`}</Text> 元</Text>
            </View>
        </View>
    )
}

const renderListHeader = props => {
    const { car_count } = props
    return (
        <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom, { backgroundColor: '#fff' }]}>
            <Text style={[globalStyles.midText, styles.listItemPadding, styles.fontColor]}>输送车辆：{car_count}</Text>
        </View>
    )
}

const RouteCarList = props => {
    const { routeCarListReducer: { data: { routeCarList }, getRouteCarList: { isResultStatus } }, routeCarListReducer } = props
    const totalSupplierInsurePrice = routeCarList.reduce((prev, curr) => {
        const currSupplierInsurePrice = curr.supplier_insure_price ? curr.supplier_insure_price : 0
        return prev + currSupplierInsurePrice
    }, 0)


    const totalSupplierTransPrice = routeCarList.reduce((prev, curr) => {
        const currSupplierTransPrice = curr.supplier_trans_price ? curr.supplier_trans_price : 0
        return prev + currSupplierTransPrice
    }, 0)

    console.log('isResultStatus', isResultStatus)
    if (isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container style={{ backgroundColor: '#f4f0f4' }}>
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={routeCarList}
                    ListHeaderComponent={() => {
                        if (routeCarList.length > 0) {
                            return renderListHeader({ car_count: routeCarList.length })
                        } else {
                            return <View />
                        }
                    }}
                    ListEmptyComponent={routeCarListReducer.getRouteCarList.isResultStatus != 1 && routeCarList.length == 0 && renderListEmpty}
                    ListFooterComponent={() => {
                        if (routeCarList.length > 0) {
                            return renderListFooter({ totalSupplierInsurePrice, totalSupplierTransPrice })
                        } else {
                            return <View />
                        }
                    }}
                    renderItem={renderItem}
                />
            </Container>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        routeCarListReducer: state.routeCarListReducer
    }
}

export default connect(mapStateToProps)(RouteCarList)


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