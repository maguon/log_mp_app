import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import { submit } from 'redux-form'
import { connect } from 'react-redux'
import globalStyles from '../../style/GlobalStyles'
import * as routerDirection from '../../util/RouterDirection'

const routeTaskListForOrderToolButton = props => {
    const { parent, sceneKey } = props
    return (
        <TouchableOpacity onPress={() => routerDirection.createRoute(parent)({ preSceneKey: sceneKey,requireTaskInfo:props.requireTaskInfo })}>
            <Icon name='ios-add' style={{ color: '#fff' }} />
        </TouchableOpacity>
    )
}

export default routeTaskListForOrderToolButton