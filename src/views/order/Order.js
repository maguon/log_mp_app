import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Container } from 'native-base'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'
import OrderNotInfo from './OrderNotInfo'
import OrderNotDemand from './OrderNotDemand'
import OrderNotPrice from './OrderNotPrice'
import OrderNotRoute from './OrderNotRoute'
import ModalWaiting from '../../components/ModalWaiting'


const Order = props => {
    const { orderReducer: { data: { order: { status } } },
        orderCarListReducer: { getOrderCarList: { isResultStatus } }
    } = props
    // console.log('status',status)
    if (isResultStatus == 1) {
        return (
            <Container>
                <ModalWaiting visible={isResultStatus == 1} />
            </Container>
        )
    } else {
        return (
            <Container>
                {status == 0 && <OrderNotInfo {...props} />}
                {status == 1 && <OrderNotPrice {...props} />}
                {status == 2 && <OrderNotDemand {...props} />}
                {status == 3 && <OrderNotRoute {...props} />}
            </Container>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        orderReducer: state.orderReducer,
        orderCarListReducer: state.orderCarListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    modifyOrderRemark: req => {
        dispatch(reduxActions.order.modifyOrderRemark(req))
    },
    cancelOrder: req => {
        dispatch(reduxActions.order.cancelOrder(req))
    },
    changeOrderStatus: req => {
        dispatch(reduxActions.order.changeOrderStatus(req))
    },
    getPaymentList: req => {
        dispatch(reduxActions.payment.getPaymentList(req))
    },
    getPaymentListWaiting: () => {
        dispatch(reduxActions.payment.getPaymentListWaiting())
    },
    getRouteTaskInfo: req => {
        dispatch(reduxActions.loadTaskList.getRouteTaskInfo(req))
    },
    getRouteTaskInfoWaiting: () => {
        dispatch(reduxActions.loadTaskList.getRouteTaskInfoWaiting())
    },
    getLoadTaskList: req => {
        dispatch(reduxActions.loadTaskList.getLoadTaskList(req))
    },
    getLoadTaskListWaiting: () => {
        dispatch(reduxActions.loadTaskList.getLoadTaskListWaiting())
    },
    setOrder: req => {
        dispatch(reduxActions.addrEditor.setOrder(req))
    },
    createRequireTask: req => {
        dispatch(reduxActions.order.createRequireTask(req))
    },
    setRequireTaskInfo:req=>{
        dispatch(reduxActions.routeForOrder.setRequireTaskInfo(req))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Order)