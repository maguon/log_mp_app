import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { Container, Spinner, ListItem } from 'native-base'
import globalStyles, { styleColor } from '../../../style/GlobalStyles'
import { connect } from 'react-redux'

const renderListEmpty = props => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
            <Text style={globalStyles.midText}>暂无可选商品车</Text>
        </View>
    )
}

const renderListItem = props => {
    const { item: { vin, valuation, brand_type, brand, supplier_insure_price, supplier_trans_price }, item, onSelect } = props
    const _supplier_trans_price = supplier_trans_price ? supplier_trans_price : 0
    const _supplier_insure_price = supplier_insure_price ? supplier_insure_price : 0

    return (
        <TouchableOpacity style={[styles.listItemPadding, styles.listItemBorderBottom]} onPress={() => {
            onSelect(item)
         }}>
            <View style={[styles.listItemBody, styles.listItemPadding]}>
                <Text style={globalStyles.midText}>{vin ? `${vin}` : ''}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ backgroundColor: '#bd417c', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>新</Text>
                    </View>
                    <View style={{ backgroundColor: '#47a11d', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>保</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.listItemBody, styles.listItemPadding]}>
                <Text style={globalStyles.midText}>{brand_type ? `${brand_type}` : ''}{brand ? `（${brand}）` : ''}</Text>
                <Text style={globalStyles.midText}>估值：{valuation ? `${valuation}` : '0'}元</Text>
            </View>
            <View style={[styles.listItemBody, styles.listItemPadding]}>
                <Text style={globalStyles.midText}>运费：{_supplier_trans_price}元</Text>
                <Text style={globalStyles.midText}>保费：{_supplier_insure_price}元</Text>
            </View>
            <View style={[styles.listItemBody, styles.listItemPadding]}>
                <Text style={globalStyles.midText}>应付费用：{`${(_supplier_trans_price + _supplier_insure_price)}`}</Text>
            </View>
        </TouchableOpacity>
    )
}

const CarListForRoute = props => {
    const { onSelect, carListForRouteReducer: { data: { carList }, getCarListForRoute } } = props
    if (getCarListForRoute.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    }
    else {
        return (
            <Container>
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={carList}
                    ListEmptyComponent={renderListEmpty}
                    renderItem={(param) => renderListItem({ onSelect, ...param })} />
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        carListForRouteReducer: state.carListForRouteReducer
    }
}

export default connect(mapStateToProps)(CarListForRoute)

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