import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList
} from 'react-native'
import {connect} from 'react-redux'
import {Container} from 'native-base'


const RequireTaskList = props => {
    console.log('props',props)
    return (
        <Container>
            <Text>RequireTaskList</Text>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        requireTaskListReducer: state.requireTaskListReducer
    }
}

export default connect(mapStateToProps)(RequireTaskList)