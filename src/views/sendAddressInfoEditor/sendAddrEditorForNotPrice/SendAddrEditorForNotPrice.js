import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { reduxForm, Field } from 'redux-form'
import { TextBox, RichTextBox } from '../../../components/form'
import { Container, Content, Button } from 'native-base'
import * as reduxActions from '../../../reduxActions'
import { connect } from 'react-redux'
import ModalWaiting from '../../../components/ModalWaiting'

const SendAddrEditorForNotPrice = props => {
    const { sendAddrEditorForNotPriceReducer: { saveSendAddr: { isResultStatus } } } = props
    return (
        <Container>
            <Content>
                <Field
                    name='sender'
                    label='发货人'
                    component={TextBox}
                />
                <Field
                    name='sendPhone'
                    label='联系电话'
                    component={TextBox}
                />
                <Field
                    name='sendAddress'
                    label='发货地址'
                    component={RichTextBox}
                />
            </Content>
            <ModalWaiting visible={isResultStatus == 1} title={'提交中...'} />
        </Container>
    )
}


const mapStateToProps = (state, ownProps) => {
    const { orderListNotPriceReducer: { data: { orderListNotPrice } } } = state
    const { orderId } = ownProps
    const order = orderListNotPrice.find(item => item.id == orderId)
    return {
        initialValues: {
            sender: order.send_name,
            sendPhone: order.send_phone,
            sendAddress: order.send_address
        },
        sendAddrEditorForNotPriceReducer: state.sendAddrEditorForNotPriceReducer
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'sendAddrForNPForm',
    onSubmit: (values, dispatch, props) => {
        const { orderId } = props
        dispatch(reduxActions.sendAddrEditorForNotPrice.saveSendAddr({ orderId, ...values }))
    }
})(SendAddrEditorForNotPrice))