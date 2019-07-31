import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Container } from 'native-base'
import RouteStart from './RouteStart'
import RouteTaskListForOrder from '../routeTaskListForOrder/RouteTaskListForOrder'

const RouteForOrder = props => {
    const { routeForOrderReducer: { data: { requireTaskInfo } } } = props
    // console.log('props',props)

    if (requireTaskInfo.status == 0) {
        return <RouteStart requireTaskInfo={requireTaskInfo} />
    } else {
        return <RouteTaskListForOrder requireTaskInfo={requireTaskInfo} />
    }

}

const mapStateToProps = (state) => {
    return {
        routeForOrderReducer: state.routeForOrderReducer
    }
}

export default connect(mapStateToProps)(RouteForOrder)