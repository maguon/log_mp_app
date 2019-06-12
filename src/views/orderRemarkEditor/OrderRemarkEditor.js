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


const OrderRemarkEditor = props => {
    const { orderReducer: { modifyOrderRemark: { isResultStatus } } } = props
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
    const { order } = ownProps
    return {
        initialValues: {
            remark: order.admin_mark
        },
        orderReducer: state.orderReducer
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'orderRemarkForm',
    onSubmit: (values, dispatch, props) => {
        const { order } = props
        dispatch(reduxActions.order.modifyOrderRemark({ formValues: values, order }))
    }
})(OrderRemarkEditor))