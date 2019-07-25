import React from 'react'
import { TouchableOpacity, InteractionManager } from 'react-native'
import { Icon } from 'native-base'
import * as routerDirection from '../../util/RouterDirection'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'
import { Actions } from 'react-native-router-flux'

const RouteCarListToolButton = props => {
    const { sceneKey, parent, getCarListForRoute, getCarListForRouteWaiting, loadTaskInfo, addLoadTaskDetail } = props
    return (
        <TouchableOpacity onPress={() => {
            getCarListForRouteWaiting()
            routerDirection.carListForRoute(parent)({
                preSceneKey: sceneKey,
                onSelect: param => {
                    Actions.popTo(sceneKey)
                    InteractionManager.runAfterInteractions(() => {
                        addLoadTaskDetail({ loadTaskInfo, car: param })
                    })
                }
            })
            getCarListForRoute({ orderId: loadTaskInfo.order_id, loadTaskId: loadTaskInfo.id })
        }}>
            <Icon name='ios-add' style={{ color: '#fff' }} />
        </TouchableOpacity>
    )
}

const mapDispatchToProps = (dispatch) => ({
    getCarListForRoute: req => {
        dispatch(reduxActions.carListForRoute.getCarListForRoute(req))
    },
    getCarListForRouteWaiting: () => {
        dispatch(reduxActions.carListForRoute.getCarListForRouteWaiting())
    },
    addLoadTaskDetail: req => {
        dispatch(reduxActions.routeCarList.addLoadTaskDetail(req))
    }
})


export default connect(null, mapDispatchToProps)(RouteCarListToolButton)