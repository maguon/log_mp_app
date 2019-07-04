import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from  'react-redux'

const RouteTaskListForOrder = props => {
    return (
        <View>
            <Text>RouteTaskListForOrder</Text>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        routeTaskListForOrderReducer: state.routeTaskListForOrderReducer
    }
}

export default connect(mapStateToProps)(RouteTaskListForOrder)