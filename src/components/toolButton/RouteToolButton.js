import React from 'react'
import { Text, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import { Icon } from 'native-base'
import globalStyles from '../../style/GlobalStyles'

const ConsultToolButton = props => {
    return (
        <TouchableOpacity onPress={() => {
            DeviceEventEmitter.emit('openDrawer')
        }}>
            <Icon name='ios-search' style={{ color: '#fff' }} />
        </TouchableOpacity>
    )
}

export default ConsultToolButton