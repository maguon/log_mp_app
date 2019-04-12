import React from 'react'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'

const LeftButton = props => {
    return (
        <Button transparent onPress={() => Actions.popTo(props.preSceneKey)}>
            <Icon name='arrow-back' />
        </Button>
    )
}

export default LeftButton