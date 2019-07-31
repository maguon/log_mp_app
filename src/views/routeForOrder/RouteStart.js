import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, Button } from 'native-base'
import globalStyles, { styleColor } from '../../style/GlobalStyles'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'

const RouteStart = props => {
    const { changeRouteStatus, requireTaskInfo: { id, order_id } } = props
    console.log('props', props)
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button full style={{ backgroundColor: styleColor, margin: 20 }}
                onPress={() => changeRouteStatus({ requireTaskId: id, status: 1, orderId: order_id })}>
                <Text style={[globalStyles.midText, { color: '#fff' }]} >开始安排</Text>
            </Button>
        </View>
    )
}

const mapDispatchToProps = (dispatch) => ({
    changeRouteStatus: req => {
        dispatch(reduxActions.routeForOrder.changeRouteStatus(req))
    }
})

export default connect(null, mapDispatchToProps)(RouteStart) 