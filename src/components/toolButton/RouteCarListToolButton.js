import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import * as routerDirection from '../../util/RouterDirection'

const RouteCarListToolButton = props => {
    const { sceneKey, parent } = props
    return (
        <TouchableOpacity onPress={() => {
            routerDirection.carListForRoute(parent)({ preSceneKey: sceneKey })
        }}>
            <Icon name='ios-add' style={{ color: '#fff' }} />
        </TouchableOpacity>
    )
}

export default RouteCarListToolButton