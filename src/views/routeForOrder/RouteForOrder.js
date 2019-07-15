import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'


const RouteForOrder = props => {
    return (
        <View>
            <Text>RouteForOrder</Text>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        routeForOrderReducer: state.routeForOrderReducer
    }
}

export default RouteForOrder