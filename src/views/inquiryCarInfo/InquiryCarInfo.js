import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Switch
} from 'react-native'
import { Container, Content, ActionSheet, Button, Icon } from 'native-base'
import globalStyles from '../../style/GlobalStyles'

const InquiryCarInfo = props => {
    return (
        <Container style={{ backgroundColor: '#f4f0f4' }}>
            <Content>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <Text style={[styles.listItemPadding, globalStyles.midText, { fontWeight: 'bold' }]}>车型</Text>
                    <Text style={[styles.listItemPadding, globalStyles.midText]}>标准轿车</Text>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <View style={[styles.listItemBody, { flex: 1 }]}>
                        <Text style={[styles.listItemPadding, globalStyles.midText, { fontWeight: 'bold' }]}>估值(元)</Text>
                        <Text style={[globalStyles.midText, { paddingRight: 15, }]}>200000</Text>
                    </View>
                    <View style={[styles.listItemBody, { borderLeftWidth: 0.5, borderLeftColor: '#dfdfdf' }]}>
                        <Icon style={{ paddingRight: 7.5, paddingLeft: 15, color: 'green' }} name='ios-checkmark-circle' />
                        <Text style={[styles.listItemPadding, globalStyles.midText]}>新车</Text>
                    </View>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <Text style={[styles.listItemPadding, globalStyles.midText, { fontWeight: 'bold' }]}>车辆保险</Text>
                    <Switch value={false} trackColor={{ true: 'green' }} />
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <Text style={[styles.listItemPadding, globalStyles.midText, { fontWeight: 'bold' }]}>预计费用</Text>
                    <Text style={[styles.listItemPadding, globalStyles.midText]}><Text style={styles.fontColor}>1600.00</Text> 元</Text>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <Text style={[styles.listItemPadding, globalStyles.midText, { fontWeight: 'bold' }]}>预计费用</Text>
                    <Text style={[styles.listItemPadding, globalStyles.midText]}><Text style={styles.fontColor}>1600.00</Text> 元</Text>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <Text style={[styles.listItemPadding, globalStyles.midText, { fontWeight: 'bold' }]}>预计保费</Text>
                    <Text style={[styles.listItemPadding, globalStyles.midText]}><Text style={styles.fontColor}>100.00</Text> 元</Text>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <Text style={[styles.listItemPadding, globalStyles.midText, { fontWeight: 'bold' }]}>数量</Text>
                    <Text style={[styles.listItemPadding, globalStyles.midText, styles.fontColor]}>1</Text>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding]}>
                    <Text style={[styles.listItemPadding, globalStyles.midText, { fontWeight: 'bold' }]}>预计费用</Text>
                    <Text style={[styles.listItemPadding, globalStyles.midText]}><Text style={styles.fontColor}>1700</Text> 元</Text>
                </View>
            </Content>
        </Container>
    )
}

export default InquiryCarInfo

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