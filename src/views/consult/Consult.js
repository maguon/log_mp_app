import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { Container, Content } from 'native-base'
import globalStyles from '../../style/GlobalStyles'

const Consult = props => {
    return (
        <Container >
            <Content>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom, { backgroundColor: '#f4f0f4' }]}>
                    <Text style={[globalStyles.midText, styles.listItemPadding, { fontWeight: 'bold' }]}>预计运费</Text>
                    <Text style={[globalStyles.midText, styles.fontColor, { paddingRight: 7.5 }]}>2900.00 元</Text>
                </View>
                <View style={[styles.listItemBody, styles.listItemBorderBottom, styles.listItemPadding]}>
                    <Text style={[globalStyles.midText, styles.listItemPadding, { fontWeight: 'bold' }]}>协商运费(元)</Text>
                    <Text style={[globalStyles.midText, { paddingRight: 7.5 }]}>1600.00</Text>
                </View>
                <View style={[styles.listItemBody, styles.listItemBorderBottom, styles.listItemPadding, { backgroundColor: '#f4f0f4' }]}>
                    <Text style={[globalStyles.midText, styles.listItemPadding, { fontWeight: 'bold' }]}>预计保费</Text>
                    <Text style={[globalStyles.midText, styles.fontColor, { paddingRight: 7.5 }]}>100.00 元</Text>
                </View>
                <View style={[styles.listItemBody, styles.listItemBorderBottom, styles.listItemPadding]}>
                    <Text style={[globalStyles.midText, styles.listItemPadding, { fontWeight: 'bold' }]}>协商保费(元)</Text>
                    <Text style={[globalStyles.midText, { paddingRight: 7.5 }]}>100.00</Text>
                </View>
                <View style={[styles.listItemBody, styles.listItemBorderBottom, styles.listItemPadding, { backgroundColor: '#f4f0f4' }]}>
                    <Text style={[globalStyles.midText, styles.listItemPadding, { fontWeight: 'bold' }]}>协商费用</Text>
                    <Text style={[globalStyles.midText, styles.fontColor, { paddingRight: 7.5 }]}>1700.00 元</Text>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding]}>
                    <Text style={[globalStyles.midText, styles.listItemPadding, { fontWeight: 'bold' }]}>协商描述</Text>
                    
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
        alignItems: 'center'
    },
    fontColor: {
        color: '#bd417c'
    }

})

export default Consult