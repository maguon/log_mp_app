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



const OrderCarEditor = props => {
    const carModalList = carModal.map(item => {
        return {
            id: item[0],
            value: item[1].name
        }

    })

    const { orderCarEditorReducer: { data: { transAndInsurePrice: { insure, trans } },updateOrderCar: { isResultStatus } }, dispatch, formValues } = props
    const actTransPrice = formValues && formValues.actTransPrice && !isNaN(parseFloat(formValues.actTransPrice)) ? parseFloat(formValues.actTransPrice) : 0.00
    const actInsurePrice = formValues && formValues.actInsurePrice && !isNaN(parseFloat(formValues.actInsurePrice)) ? parseFloat(formValues.actInsurePrice) : 0.00
    const actPrice = `${moneyFormat(actTransPrice + actInsurePrice)}`
    
    return (
        <Container>
            <Content>
                <View style={[styles.listItemBorderBottom]}>
                    <Field
                        label='车型'
                        last
                        name='modelType'
                        listTitle='车型列表'
                        itemList={carModalList}
                        component={PickerBox} />
                </View>
                <View style={[styles.listItemBorderBottom]}>
                    <Field
                        name='vin'
                        last
                        label='vin'
                        component={TextBox}
                    />
                </View>
                <View style={[styles.listItemBorderBottom]}>
                    <Field
                        name='brand'
                        last
                        label='品牌'
                        component={TextBox}
                    />
                </View>
                <View style={[styles.listItemBorderBottom]}>
                    <Field
                        name='brandType'
                        last
                        label='型号'
                        component={TextBox}
                    />
                </View>
                <View style={[styles.listItemBody, styles.listItemBorderBottom]}>
                    <View style={{ flex: 1 }}>
                        <Field
                            last
                            name='valuation'
                            label='车辆估值(元)'
                            component={TextBox}
                        />
                    </View>
                    <View style={[styles.listItemBody, { borderLeftWidth: 0.5, borderLeftColor: '#dfdfdf' }]}>
                        <Field
                            name='oldCar'
                            label='新车'
                            component={CheckBox}
                        />
                    </View>
                </View>
                <View style={[styles.listItemBorderBottom]}>
                    <Field
                        last
                        name='safeStatus'
                        label='车辆保险'
                        component={SwitchBox}
                    />
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom, { backgroundColor: '#f6f1f5' }]}>
                    <Text style={[styles.listItemPadding, globalStyles.midText]}>预计运费</Text>
                    <Text style={[styles.listItemPadding, globalStyles.midText]}><Text style={styles.fontColor}>{trans ? `${trans}` : '0'}</Text> 元</Text>
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
                        onFocus={(event, name) => {
                            if (!actTransPrice) dispatch(change('orderCarEditorForm', 'actTransPrice', ''))
                        }}
                        name='actTransPrice'
                        label='应付运费(元)'
                        component={TextBox}
                    />
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom, { backgroundColor: '#f6f1f5' }]}>
                    <Text style={[styles.listItemPadding, globalStyles.midText]}>预计保费</Text>
                    <Text style={[styles.listItemPadding, globalStyles.midText]}><Text style={styles.fontColor}>{insure ? `${insure}` : '0'}</Text> 元</Text>
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
                        onFocus={(event, name) => {
                            if (!actInsurePrice)
                                dispatch(change('orderCarEditorForm', 'actInsurePrice', ''))
                        }}
                        name='actInsurePrice'
                        label='应付保费(元)'
                        component={TextBox}
                    />
                </View>
                <View style={[styles.listItemBody, styles.listItemPadding, { backgroundColor: '#f6f1f5' }]}>
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
    const { orderCarListReducer: { data: { orderCarList } },
        orderListNotInfoReducer: { data: { orderListNotInfo } } } = state
    const { orderCarId, orderId } = ownProps
    const orderCar = orderCarList.find(item => item.id == orderCarId)
    const { safe_status, act_insure_price, vin, act_trans_price, old_car, valuation, brand, brand_type, model_type } = orderCar
    const cartype = new Map(carModal).get(model_type)
    return {
        initialValues: {
            safeStatus: safe_status == 1 ? true : false,
            brand,
            brandType: brand_type,
            vin,
            valuation: `${valuation}`,
            actInsurePrice: `${act_insure_price}`,
            actTransPrice: `${act_trans_price}`,
            modelType: { id: model_type, value: cartype.name },
            oldCar: old_car == 1 ? true : false,
        },
        formValues: getFormValues('orderCarEditorForm')(state),
        orderCarEditorReducer: state.orderCarEditorReducer,
        order: orderListNotInfo.find(item => item.id == orderId)
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'orderCarEditorForm',
    onSubmit: (values, dispatch, props) => {
        dispatch(reduxActions.orderCarEditor.updateOrderCar({
            formValues: values, order: props.order, orderCarId: props.orderCarId
        }))
    },
    onChange: (values, dispatch, props, previousValues) => {
        const { order } = props
        if (values.modelType && values.valuation) {
            if (!previousValues.modelType
                || !previousValues.valuation
                || values.modelType.id != previousValues.modelType.id
                || values.valuation != previousValues.valuation
                || values.safeStatus != previousValues.safeStatus
                || values.oldCar != previousValues.oldCar) {
                dispatch(reduxActions.orderCarEditor.getTransAndInsurePrice({
                    distance: order.distance,
                    serviceType: order.service_type,
                    modelType: values.modelType.id,
                    oldCar: values.oldCar,
                    valuation: values.valuation,
                    safeStatus: values.safeStatus ? 1 : 0
                }))
            }
        }
    }
})(OrderCarEditor))