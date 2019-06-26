import React, { Component } from 'react'
import { Text, View, Switch, StyleSheet } from 'react-native'
import { TextBox, PickerBox, SwitchBox, CheckBox } from '../../components/form'
import { reduxForm, Field, getFormValues } from 'redux-form'
import { Container, Content, Icon } from 'native-base'
import carModal from '../../config/car_modal.json'
import globalStyles from '../../style/GlobalStyles'
import { connect } from 'react-redux'
import { moneyFormat } from '../../util/util'
import * as reduxActions from '../../reduxActions'
import ModalWaiting from '../../components/ModalWaiting'

const OrderCarFeeEditor = props => {
    const { orderCarFeeEditorReducer: { updateOrderCarFee: { isResultStatus } }, formValues } = props
    const actTransPrice = formValues && formValues.actTransPrice && !isNaN(parseFloat(formValues.actTransPrice)) ? parseFloat(formValues.actTransPrice) : 0.00
    const actInsurePrice = formValues && formValues.actInsurePrice && !isNaN(parseFloat(formValues.actInsurePrice)) ? parseFloat(formValues.actInsurePrice) : 0.00
    const actPrice = `${moneyFormat(actTransPrice + actInsurePrice)}`
    const { orderCar: { vin, model_type, valuation, brand, brand_type, old_car, safe_status, } } = props
    const cartype = new Map(carModal).get(model_type)
    return (
        <Container style={{ backgroundColor: '#f6f1f5' }}>
            <Content>
                <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody, { backgroundColor: '#f6f1f5' }]}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>车型</Text>
                    </View>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>{cartype ? `${cartype.name}` : ''}</Text>
                    </View>
                </View>
                <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody,{ backgroundColor: '#f6f1f5' }]}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>vin</Text>
                    </View>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>{brand ? `${brand}` : ''}</Text>
                    </View>
                </View>
                <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody,{ backgroundColor: '#f6f1f5' }]}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>品牌</Text>
                    </View>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>{brand_type ? `${brand_type}` : ''}</Text>
                    </View>
                </View>
                <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody,{ backgroundColor: '#f6f1f5' }]}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>型号</Text>
                    </View>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>{vin ? `${vin}` : ''}</Text>
                    </View>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom,{ backgroundColor: '#f6f1f5' }]}>
                    <View style={[styles.listItemBody, { flex: 1 ,backgroundColor: '#f6f1f5'}]}>
                        <Text style={[styles.listItemPadding, globalStyles.midText]}>估值(元)</Text>
                        <Text style={[globalStyles.midText, { paddingRight: 15, }]}>{valuation ? `${valuation}` : ''}</Text>
                    </View>
                    <View style={[styles.listItemBody, { borderLeftWidth: 0.5, borderLeftColor: '#dfdfdf',backgroundColor: '#f6f1f5' }]}>
                        <Icon style={{ paddingRight: 7.5, paddingLeft: 15, color: old_car == 1 ? 'green' : '#777' }} name='ios-checkmark-circle' />
                        <Text style={[styles.listItemPadding, globalStyles.midText]}>新车</Text>
                    </View>
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom,{ backgroundColor: '#f6f1f5' }]}>
                    <Text style={[styles.listItemPadding, globalStyles.midText]}>车辆保险</Text>
                    <Switch value={safe_status == 1} trackColor={{ true: 'green' }} />
                </View>
                <View style={[styles.listItemBorderBottom,{ backgroundColor: '#fff' }]}>
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
                        name='actTransPrice'
                        label='应付运费(元)'
                        component={TextBox}
                    />
                </View>
                <View style={[styles.listItemBorderBottom,{ backgroundColor: '#fff' }]}>
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
                        name='actInsurePrice'
                        label='应付保费(元)'
                        component={TextBox}
                    />
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding,{ backgroundColor: '#f6f1f5' }]}>
                    <Text style={[styles.listItemPadding, globalStyles.midText]}>应付费用</Text>
                    <Text style={[styles.listItemPadding, globalStyles.midText]}><Text style={styles.fontColor}>{`${actPrice}`}</Text> 元</Text>
                </View>
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
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    fontColor: {
        color: '#bd417c'
    }
})

const mapStateToProps = (state, ownProps) => {
    const { orderCarListReducer: { data: { orderCarList } } } = state
    const { orderCarId } = ownProps
    const orderCar = orderCarList.find(item => item.id == orderCarId)
    const { act_insure_price, act_trans_price } = orderCar
    return {
        initialValues: {
            actInsurePrice: `${act_insure_price}`,
            actTransPrice: `${act_trans_price}`,
        },
        formValues: getFormValues('orderCarFeeEditorForm')(state),
        orderCarFeeEditorReducer: state.orderCarFeeEditorReducer,
        orderCar
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'orderCarFeeEditorForm',
    onSubmit: (values, dispatch, props) => {
        dispatch(reduxActions.orderCarFeeEditor.updateOrderCarFee({
            formValues: values, order: props.order, orderCarId: props.orderCarId
        }))
    }
})(OrderCarFeeEditor))