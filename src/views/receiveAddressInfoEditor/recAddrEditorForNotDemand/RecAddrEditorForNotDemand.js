import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { TextBox, RichTextBox } from '../../../components/form'
import { Container, Content } from 'native-base'
import { connect } from 'react-redux'
import * as reduxActions from '../../../reduxActions'
import ModalWaiting from '../../../components/ModalWaiting'

const RecAddrEditorForNotDemand = props => {
    const { recAddrEditorForNotDemandReducer: { receiveAddressInfo: { isResultStatus } } } = props
    return (
        <Container>
            <Content>
                <Field
                    name='receiver'
                    label='收货人'
                    component={TextBox}
                />
                <Field
                    name='receivePhone'
                    label='联系电话'
                    component={TextBox}
                />
                <Field
                    name='receiveAddress'
                    label='收货地址'
                    component={RichTextBox}
                />
            </Content>
            <ModalWaiting visible={isResultStatus == 1} title={'提交中...'} />
        </Container>
    )
}


const mapStateToProps = (state, ownProps) => {
    const { orderListNotDemandReducer: { data: { orderListNotDemand } } } = state
    const { orderId } = ownProps
    const order = orderListNotDemand.find(item => item.id == orderId)
    return {
        initialValues: {
            receiver: order.recv_name,
            receivePhone: order.recv_phone,
            receiveAddress: order.recv_address
        },
        recAddrEditorForNotDemandReducer: state.recAddrEditorForNotDemandReducer
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'recAddrForNDForm',
    onSubmit: (values, dispatch, props) => {
        const { orderId } = props
        dispatch(reduxActions.recAddrEditorForNotDemand.receiveAddressInfo({ orderId, ...values }))
    }
})(RecAddrEditorForNotDemand))