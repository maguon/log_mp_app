import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from  'react-redux'

const RouteCarList = props => {
    return (
        <View>
            <Text>RouteCarList</Text>
        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        routeCarListReducer: state.routeCarListReducer
    }
}

export default connect(mapStateToProps)(RouteCarList)