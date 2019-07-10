import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { TextBox, RichTextBox } from '../../components/form'
import { Container, Content } from 'native-base'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'
import ModalWaiting from '../../components/ModalWaiting'

const RecAddrEditor = props => {
    const { addrEditorReducer: {
        saveRecAddr: { isResultStatus }
    } } = props
    // console.log('props', props)
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
    const {
        addrEditorReducer: {
            data: {
                order
            }
        }
    } = state
    return {
        initialValues: {
            receiver: order.recv_name,
            receivePhone: order.recv_phone,
            receiveAddress: order.recv_address
        },
        addrEditorReducer: state.addrEditorReducer
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'recAddrEditorForm',
    onSubmit: (values, dispatch, props) => {
        const {
            addrEditorReducer: {
                data: {
                    order
                }
            }, sceneName } = props
        dispatch(reduxActions.addrEditor.saveRecAddr({ orderId: order.id, sceneName, ...values }))
    }
})(RecAddrEditor))