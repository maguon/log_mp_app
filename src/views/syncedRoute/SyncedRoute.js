import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity, InteractionManager } from 'react-native'
import { Container, Icon, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../style/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ListHeaderComponent = props => {
    return (
        <View style={[styles.listItemPadding, { backgroundColor: '#f1ebf1' }]}>
            <View style={[styles.listItemBody, styles.listItemPadding]}>
                <Text style={globalStyles.midText}>需求编号：10411</Text>
                <Text style={globalStyles.midText}>已安排</Text>
            </View>
            <View style={[styles.listItemBody]}>
                <View style={[styles.listItemPadding, { flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={[globalStyles.xlText, { color: '#000' }]}>沈阳</Text>
                    <Icon name='md-arrow-forward' style={{ paddingHorizontal: 10, color: '#00cade', fontSize: 20 }} />
                    <Text style={[globalStyles.xlText, { color: '#000' }]}>大连</Text>
                    <MaterialCommunityIcons name='truck-fast' style={{ paddingLeft: 10, color: '#00cade', fontSize: 22 }} />
                    {/*      {item.trans_type == 2 && <FontAwesome name='ship' style={{ paddingLeft: 10, color: '#00cade', fontSize: 20 }} />} */}
                </View>
                <View style={[styles.listItemPadding]}>
                    <Text style={globalStyles.midText}>装车地：大连码头</Text>
                </View>
            </View>
            <View style={[styles.listItemBody, styles.listItemPadding]}>
                <Text style={globalStyles.midText}>派送车辆：15</Text>
                <Text style={globalStyles.midText}>派送车辆：0</Text>
            </View>
            <View style={[styles.listItemBody, styles.listItemPadding, { alignSelf: 'flex-end' }]}>
                <Text style={globalStyles.midText}>指令日期：2018-05-18</Text>
            </View>
            <View style={[styles.listItemBody, styles.listItemPadding, { alignSelf: 'flex-end' }]}>
                <Text style={globalStyles.midText}>需求生成日期：2018-08-16 11:20:31</Text>
            </View>
        </View>
    )
}


const renderItem = props => {
    return (
        <View style={[{ borderWidth: 0.5, borderColor: '#dfdfdf', margin: 5 }]}>
            <View style={[styles.listItemBody, { borderBottomWidth: 0.5, borderColor: '#dfdfdf', padding: 10, backgroundColor: '#f8f5f8' }]}>
                <Text style={globalStyles.midText}>调度编号：1048</Text>
                <Text style={[globalStyles.midText, styles.fontColor]}>已送达</Text>
            </View>
            <View style={{ padding: 5 }}>
                <View style={[styles.listItemBody, { padding: 5 }]}>
                    <Text style={[globalStyles.midText,{fontWeight:'bold'}]}>大连 -> 烟台</Text>
                    <Text style={globalStyles.midText}>装车数：3</Text>
                </View>
                <View style={[styles.listItemBody, { padding: 5 }]}>
                    <Text style={globalStyles.midText}>司机：王保全</Text>
                    <Text style={globalStyles.midText}>货车：辽B13245</Text>
                </View>
                <View style={[styles.listItemBody, { padding: 5 }]}>
                    <Text style={globalStyles.midText}>计划执行时间：2018-08-26</Text>
                </View>
            </View>

        </View>
    )
}

const SyncedRoute = props => {
    return (
        <Container>
            <ListHeaderComponent />
            <FlatList
                contentContainerStyle={{ padding: 5 }}
                data={[1, 2, 3]}
                renderItem={renderItem} />
        </Container>
    )
}

export default SyncedRoute


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