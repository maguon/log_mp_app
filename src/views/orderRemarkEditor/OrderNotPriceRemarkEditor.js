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

const OrderNotPriceRemarkEditor = props => {
    const { orderListNotPriceReducer: { saveOrderRemark: { isResultStatus } } } = props
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
    const order = state.orderListNotPriceReducer.data.orderListNotPrice.find(item => item.id == orderId)
    // console.log('order')
    return {
        initialValues: {
            remark: order.admin_mark
        },
        orderListNotPriceReducer: state.orderListNotPriceReducer
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'orderNPRemarkForm',
    onSubmit: (values, dispatch, props) => {
        const { orderId } = props
        dispatch(reduxActions.orderListNotPrice.saveOrderRemark({ formValues:values, orderId }))
    }
})(OrderNotPriceRemarkEditor))