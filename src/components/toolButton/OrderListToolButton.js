import React from 'react'
import { Text, TouchableOpacity, DeviceEventEmitter, View } from 'react-native'
import { Icon } from 'native-base'
import { initialize } from 'redux-form'
import { connect } from 'react-redux'
import globalStyles from '../../style/GlobalStyles'
import { Actions } from 'react-native-router-flux'

const OrderListToolButton = props => {
    const { dispatch, orderListReducer: { data: { searchParam } } ,sceneKey} = props
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => {
                dispatch(initialize('searchOrderForm', searchParam))
                DeviceEventEmitter.emit('openOrderListDrawer')
            }}>
                <Icon name='ios-search' style={{ color: '#fff' }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft:15 }} onPress={() => Actions.createOrderAtOrderBlock({ preSceneKey: sceneKey })}>
                <Icon name='ios-add' style={{ color: '#fff' }} />
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        orderListReducer: state.orderListReducer
    }
}

export default connect(mapStateToProps)(OrderListToolButton)