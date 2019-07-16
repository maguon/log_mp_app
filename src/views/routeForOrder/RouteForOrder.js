import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Container } from 'native-base'
import RouteStart from './RouteStart'
import RouteTaskListForOrder from '../routeTaskListForOrder/RouteTaskListForOrder'

const RouteForOrder = props => {
    console.log('props', props)
    const { routeForOrderReducer: { data: { requireTaskInfo: { status } } } } = props
    if (status == 0) {
        return <RouteStart {...props} />
    } else {
        return <RouteTaskListForOrder {...props} />
    }

}

const mapStateToProps = (state) => {
    return {
        routeForOrderReducer: state.routeForOrderReducer
    }
}

export default connect(mapStateToProps)(RouteForOrder)