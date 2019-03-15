import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import { Container, Content } from 'native-base'
import globalStyles from '../../style/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const CarListItem = props => {
    const { item, i } = props
    return (
        <View key={i} style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom, { backgroundColor: '#fff' }]}>
            <View style={[{ flex: 1 }]}>
                <View style={[styles.listItemPadding, styles.listItemBody]}>
                    <View>
                        <Text style={[globalStyles.largeText, { fontWeight: 'bold' }]}>标准轿车</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ backgroundColor: '#bd417c', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[globalStyles.midText, { color: '#fff' }]}>新</Text>
                        </View>
                        <View style={{ backgroundColor: '#47a11d', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                            <Text style={[globalStyles.midText, { color: '#fff' }]}>保</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.listItemPadding, styles.listItemBody]}>
                    <Text style={globalStyles.midText}>估值：240000.08元</Text>
                    <Text style={globalStyles.midText}>数量：1</Text>
                </View>
                <View style={[styles.listItemPadding, styles.listItemBody]}>
                    <Text style={globalStyles.midText}>预计费用</Text>
                    <Text style={globalStyles.midText}><Text style={globalStyles.xlText}>2400.08</Text> 元</Text>
                </View>
            </View>
            <View style={styles.listItemPadding}>
                <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
            </View>
        </View>
    )
}

const CarList = props => {
    const { list } = props
    return list.map((item, i) => {
        return <CarListItem item={item} i={i} />
    })
}


const InquiryCarList = props => {
    return (
        <Container style={{ backgroundColor: '#f4f4f4' }}>
            <Content>
                <View style={[styles.listItemHeader, styles.listItemBorderBottom]}>
                    <View>
                        <Text style={[globalStyles.midText]}>询价车辆：<Text style={styles.fontColor}>3</Text></Text>
                    </View>
                    <View>
                        <Text style={[globalStyles.midText]}>当地自提</Text>
                    </View>
                </View>
                {CarList({ list: [1, 2] })}
                <View style={[styles.listItemPadding, styles.listItemBorderBottom]}>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>预计运费</Text>
                        <Text style={globalStyles.midText}><Text style={styles.fontColor}>5000.00</Text> 元</Text>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>预计运费</Text>
                        <Text style={globalStyles.midText}><Text style={styles.fontColor}>100.00</Text> 元</Text>
                    </View>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding]}>
                    <Text style={[globalStyles.largeText, styles.listItemPadding, { fontWeight: 'bold' }]}>预计总费用</Text>
                    <Text style={{ paddingHorizontal: 7.5 }}><Text style={[globalStyles.xlText, styles.fontColor]}>5100.00</Text> 元</Text>
                </View>
            </Content>
        </Container>
    )
}

export default InquiryCarList



const styles = StyleSheet.create({
    listItemHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15
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