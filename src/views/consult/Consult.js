import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import { Container, Content } from 'native-base'
import globalStyles from '../../style/GlobalStyles'
import { reduxForm, Field, change, getFormValues } from 'redux-form'
import { TextBox, RichTextBox, TextBoxMoney } from '../../components/form'
import * as reduxActions from '../../reduxActions'
import ModalWaiting from '../../components/ModalWaiting'
import { connect } from 'react-redux'
import { moneyFormat } from '../../util/util'
import { moneyValidator } from '../../util/Validator'

const Consult = props => {
    const { consultReducer: { consultPrice: { isResultStatus } },
        inquiry: { ora_insure_price, ora_trans_price },
        formValues, dispatch } = props

    const totalTransPrice = formValues && formValues.totalTransPrice && !isNaN(parseFloat(formValues.totalInsurePrice)) ? parseFloat(formValues.totalTransPrice) : 0.00
    const totalInsurePrice = formValues && formValues.totalInsurePrice && !isNaN(parseFloat(formValues.totalInsurePrice)) ? parseFloat(formValues.totalInsurePrice) : 0.00
    const totalPrice = `${moneyFormat(totalTransPrice + totalInsurePrice)}`

    return (
        <Container >
            <Content>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom, { backgroundColor: '#f4f0f4' }]}>
                    <Text style={[globalStyles.midText, styles.listItemPadding]}>预计运费</Text>
                    <Text style={[globalStyles.midText, styles.fontColor, { paddingRight: 7.5 }]}>{ora_trans_price ? `${ora_trans_price}` : ''} 元</Text>
                </View>
                <View style={[styles.listItemBorderBottom]}>
                    <Field
                        last
                        parse={(value, name) => {
                            const index = `${value}`.indexOf('.')
                            const length = `${value}`.length
                            if (index >= 0 && (length - index) > 3) {
                                return `${value}`.slice(0, index + 3)
                            }
                            return value
                        }}
                        onFocus={(event, name) => { if (!totalTransPrice) dispatch(change('consultForm', 'totalTransPrice', '')) }}
                        name='totalTransPrice'
                        label='协商运费(元)'
                        component={TextBox}
                    />
                </View>
                <View style={[styles.listItemBody, styles.listItemBorderBottom, styles.listItemPadding, { backgroundColor: '#f4f0f4' }]}>
                    <Text style={[globalStyles.midText, styles.listItemPadding]}>预计保费</Text>
                    <Text style={[globalStyles.midText, styles.fontColor, { paddingRight: 7.5 }]}>{ora_insure_price ? `${ora_insure_price}` : ''} 元</Text>
                </View>
                <View style={[styles.listItemBorderBottom]}>
                    <Field
                        last
                        parse={(value, name) => {
                            const index = `${value}`.indexOf('.')
                            const length = `${value}`.length
                            if (index >= 0 && (length - index) > 3) {
                                return `${value}`.slice(0, index + 3)
                            }
                            return value
                        }}
                        onFocus={(event, name) => { if (!totalInsurePrice) dispatch(change('consultForm', 'totalInsurePrice', '')) }}
                        name='totalInsurePrice'
                        label='协商保费(元)'
                        component={TextBox}
                    />
                </View>
                <View style={[styles.listItemBody, styles.listItemBorderBottom, styles.listItemPadding, { backgroundColor: '#f4f0f4' }]}>
                    <Text style={[globalStyles.midText, styles.listItemPadding]}>协商费用</Text>
                    <Text style={[globalStyles.midText, styles.fontColor, { paddingRight: 7.5 }]}>{totalPrice} 元</Text>
                </View>
                <Field
                    last
                    name='remark'
                    label='协商描述'
                    component={RichTextBox}
                />
            </Content>
            <ModalWaiting visible={isResultStatus == 1} title={'提交中...'} />
        </Container>
    )
}

const styles = StyleSheet.create({
    listItemPadding: {
        padding: 7.5
    },
    listItemBorderBottom: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#dfdfdf'
    },
    listItemBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    fontColor: {
        color: '#bd417c'
    }

})

const mapStateToProps = (state, ownProps) => {
    const { inquiry: { total_insure_price, total_trans_price, remark } } = ownProps
    // console.log('ownProps',ownProps)
    return {
        consultReducer: state.consultReducer,
        initialValues: {
            totalTransPrice: total_trans_price ? `${total_trans_price}` : '0.00',
            totalInsurePrice: total_insure_price ? `${total_insure_price}` : '0.00',
            remark: remark ? `${remark}` : ''
        },
        formValues: getFormValues('consultForm')(state)
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'consultForm',
    onSubmit: (values, dispatch, props) => {
        const { inquiry } = props
        dispatch(reduxActions.consult.consultPrice({ formValues: values, inquiry }))
    }
})(Consult))
