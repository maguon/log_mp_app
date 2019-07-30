import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'native-base'
import { submit } from 'redux-form'
import { connect } from 'react-redux'
import globalStyles from '../../style/GlobalStyles'
import * as routerDirection from '../../util/RouterDirection'

const routeTaskListForOrderToolButton = props => {
    const { parent, sceneKey, requireTaskInfo } = props
    if (requireTaskInfo.status == 1) {
        return (
            <TouchableOpacity onPress={() => routerDirection.createRoute(parent)({ preSceneKey: sceneKey, requireTaskInfo: props.requireTaskInfo })}>
                <Icon name='ios-add' style={{ color: '#fff' }} />
            </TouchableOpacity>
        )
    } else {
        return (
            <View />
        )
    }

}

export default routeTaskListForOrderToolButton