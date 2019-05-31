import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Container, Content } from 'native-base'
import { RichTextBox } from '../../components/form'
import * as reduxActions from '../../reduxActions'
import ModalWaiting from '../../components/ModalWaiting'

const OrderNotRouteRemarkEditor = props => {
    const { orderListNotRouteReducer: { saveOrderRemark: { isResultStatus } } } = props
    return (
        <Container>
            <Content>
                <Field
                    name='remark'
                    label='备注'
                    component={RichTextBox}
                />
            </Content>
            <ModalWaiting visible={isResultStatus == 1} title={'提交中...'} />
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { orderId } = ownProps
    const order = state.orderListNotRouteReducer.data.orderListNotRoute.find(item => item.id == orderId)
    return {
        initialValues: {
            remark: order.admin_mark
        },
        orderListNotRouteReducer: state.orderListNotRouteReducer
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'orderNRRemarkForm',
    onSubmit: (values, dispatch, props) => {
        const { orderId } = props
        dispatch(reduxActions.orderListNotRoute.saveOrderRemark({ formValues:values, orderId }))
    }
})(OrderNotRouteRemarkEditor))