import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'

const HomeToolButton = props => {
    const { sceneKey } = props
    return (
        <TouchableOpacity onPress={() => Actions.createOrder({ preSceneKey: sceneKey })}>
            <Icon name='ios-add' style={{ color: '#fff' }} />
        </TouchableOpacity>
    )
}

export default HomeToolButton