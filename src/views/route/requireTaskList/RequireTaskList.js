import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Icon } from 'native-base'
import globalStyles from '../../../style/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const renderItem = props => {
    console.log('props', props)
    return (
        <View>
            <View style={[styles.listItemHeader, styles.listItemBorderBottom]}>
                <Text style={[globalStyles.midText, styles.listItemHeaderNo]}>路线编号：2144454578</Text>
                <Text style={[globalStyles.midText, styles.listItemHeaderDate]}>2018-05-06 18:50:20</Text>
            </View>
            <View style={[styles.listItemPadding, styles.listItemBorderBottom, { flexDirection: 'row', alignItems: 'center' }]}>
                <View style={{ flex: 1 }}>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={[globalStyles.xlText, { color: '#000' }]}>大连</Text>
                            <Icon name='md-arrow-forward' style={{ paddingHorizontal: 10, color: '#00cade', fontSize: 20 }} />
                            <Text style={[globalStyles.xlText, { color: '#000' }]}>烟台</Text>
                        </View>
                        <Text style={[globalStyles.midText,styles.fontColor]}>待发运</Text>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={[globalStyles.midText]}>顺通物流</Text>
                        <Text style={[globalStyles.midText]}>运送车辆：3</Text>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={[globalStyles.midText]}>计划发运日期：2018-08-26</Text>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={[globalStyles.midText]}>支付供应商</Text>
                        <Text style={[globalStyles.midText]}><Text style={[globalStyles.xlText,styles.fontColor]}>3400.00</Text> 元</Text>
                    </View>
                </View>
                <View>
                    <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                </View>
            </View>
        </View>
    )
}

const RequireTaskList = props => {
    console.log('props', props)
    const { requireTaskListReducer: { data: { requireTaskList } } } = props
    console.log('requireTaskList', requireTaskList)

    return (
        <Container>
            <FlatList
                data={requireTaskList}
                renderItem={renderItem} />
            {/* <Text>RequireTaskList</Text> */}
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        requireTaskListReducer: state.requireTaskListReducer
    }
}

export default connect(mapStateToProps)(RequireTaskList)


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
    }
})