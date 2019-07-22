import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity, InteractionManager } from 'react-native'
import { Container, Icon, Spinner } from 'native-base'
import globalStyles from '../../style/GlobalStyles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ListHeaderComponent = props => {
    return (
        <View style={[styles.listItemPadding, { backgroundColor: '#f1ebf1' }]}>
            <View style={[styles.listItemBody, styles.listItemPadding]}>
                <Text style={globalStyles.midText}>调度编号：10411</Text>
                <Text style={globalStyles.midText}>已送达</Text>
            </View>
            <View style={[styles.listItemBody]}>
                <View style={[styles.listItemPadding, { flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={[globalStyles.xlText, { color: '#000' }]}>沈阳</Text>
                    <Icon name='md-arrow-forward' style={{ paddingHorizontal: 10, color: '#00cade', fontSize: 20 }} />
                    <Text style={[globalStyles.xlText, { color: '#000' }]}>大连</Text>
                </View>
                <View style={[styles.listItemPadding]}>
                    <Text style={globalStyles.midText}>装车数：3</Text>
                </View>
            </View>
            <View style={[styles.listItemBody, styles.listItemPadding]}>
                <Text style={globalStyles.midText}>司机：王保全</Text>
                <Text style={globalStyles.midText}>货车：辽b12345</Text>
            </View>
            <View style={[styles.listItemBody, styles.listItemPadding, { alignSelf: 'flex-end' }]}>
                <Text style={globalStyles.midText}>计划执行时间：2018-05-18</Text>
            </View>
        </View>
    )
}


const renderItem = props => {
    return (
        <View style={{ flexDirection: "row", borderColor: '#dfdfdf', borderBottomWidth: 0.5,padding:15 }}>
            <Icon name='ios-car' style={[styles.fontColor,{fontSize:20}]}/>
            <Text style={[globalStyles.midText,{marginLeft:15}]}>vin21019846644</Text>
        </View>
    )
}


const CarListForSyncedRoute = props => {
    return (
        <Container>
            <ListHeaderComponent />
            <FlatList
                data={[1, 2, 3, 4]}
                renderItem={renderItem} />
        </Container>
    )
}


export default CarListForSyncedRoute


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