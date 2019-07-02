import React from 'react'
import { Text, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import { Icon } from 'native-base'
import { initialize } from 'redux-form'
import { connect } from 'react-redux'
import globalStyles from '../../style/GlobalStyles'

const OrderListToolButton = props => {
    // console.log('props', props)
    const { dispatch, orderListReducer: { data: { searchParam } } } = props
    // console.log('searchParam', searchParam)

    return (
        <TouchableOpacity onPress={() => {
            dispatch(initialize('searchOrderForm', searchParam))
            DeviceEventEmitter.emit('openOrderListDrawer')
        }}>
            <Icon name='ios-search' style={{ color: '#fff' }} />
        </TouchableOpacity>
    )
}

const mapStateToProps = (state) => {
    return {
        orderListReducer: state.orderListReducer
    }
}

export default connect(mapStateToProps)(OrderListToolButton)