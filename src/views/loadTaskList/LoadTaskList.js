import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { Container } from 'native-base'

const renderItem = props => {
    console.log('props',props)
    return (
        <View>
            {/* <View style={[styles.listItemHeader, styles.listItemBorderBottom]}>
                <Text style={[globalStyles.midText, styles.listItemHeaderNo]}>询价编号：{`${id}`}</Text>
                <Text style={[globalStyles.midText, styles.listItemHeaderDate]}>{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
            </View> */}
            <Text>renderItem</Text>
        </View>
    )
}

const LoadTaskList = props => {
    console.log('RouteTaskListprops', props)
    const { loadTaskListReducer: { data: { loadTaskList } } } = props
    return (
        <Container>
            <FlatList
                data={loadTaskList}
                renderItem={renderItem} />
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        loadTaskListReducer: state.loadTaskListReducer
    }
}

export default connect(mapStateToProps)(LoadTaskList)


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