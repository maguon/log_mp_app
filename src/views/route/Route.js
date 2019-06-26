import React, { Component } from 'react'
import {
    Text,
    View,
    InteractionManager
} from 'react-native'
import { Container } from 'native-base'
import RequireTaskList from './requireTaskList/RequireTaskList'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'

class Route extends Component {


    componentDidMount() {
        const {getRequireTaskList,getRequireTaskListWaiting} =this.props
        getRequireTaskListWaiting()
        InteractionManager.runAfterInteractions(()=>getRequireTaskList())
    }

    render() {
        return (
            <Container>
                <Text>route</Text>
                <RequireTaskList />
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRequireTaskList: () => {
        dispatch(reduxActions.requireTaskList.getRequireTaskList())
    },
    getRequireTaskListWaiting: () => {
        dispatch(reduxActions.requireTaskList.getRequireTaskListWaiting())
    }
})

export default connect(null, mapDispatchToProps)(Route)