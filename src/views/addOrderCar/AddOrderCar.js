import React, { Component } from 'react'
import { Text, View, Switch, StyleSheet } from 'react-native'
import { TextBox, PickerBox, CheckBox, SwitchBox } from '../../components/form'
import { reduxForm, Field, change, getFormValues } from 'redux-form'
import { Container, Content, Icon } from 'native-base'
import { connect } from 'react-redux'
import carModal from '../../config/car_modal.json'
import * as reduxActions from '../../reduxActions'
import globalStyles from '../../style/GlobalStyles'
import { moneyFormat } from '../../util/util'

const AddOrderCar = props => {
    console.log('props', props)
    const { addOrderCarReducer: { data: { transAndInsurePrice: { insure, trans } } }, dispatch, formValues } = props
    const actTransPrice = formValues && formValues.actTransPrice && !isNaN(parseFloat(formValues.actTransPrice)) ? parseFloat(formValues.actTransPrice) : 0.00
    const actInsurePrice = formValues && formValues.actInsurePrice && !isNaN(parseFloat(formValues.actInsurePrice)) ? parseFloat(formValues.actInsurePrice) : 0.00
    const actPrice = `${moneyFormat(actTransPrice + actInsurePrice)}`
    const carModalList = carModal.map(item => {
        return {
            id: item[0],
            value: item[1].name
        }
    })
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
                        onFocus={(event, name) => { if (!actTransPrice) dispatch(change('addOrderCarForm', 'actTransPrice', '')) }}
                        name='actTransPrice'
                        label='协商运费(元)'
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
                        onFocus={(event, name) => { if (!actInsurePrice) dispatch(change('addOrderCarForm', 'actInsurePrice', '')) }}
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
    return {
        initialValues: {
            safeStatus: false,
            oldCar: false,
            actInsurePrice: '0.00',
            actTransPrice: '0.00'
        },
        addOrderCarReducer: state.addOrderCarReducer,
        formValues: getFormValues('addOrderCarForm')(state)
    }
}


export default connect(mapStateToProps)(reduxForm({
    form: 'addOrderCarForm',
    onSubmit: (values, dispatch, props) => {
        // console.log('addOrderCarForm')
        dispatch(reduxActions.addOrderCar.addOrderCar({ formValues: values, order: props.order }))
    },
    onChange: (values, dispatch, props, previousValues) => {
        // console.log('props', props)
        if (values.modelType && values.valuation) {
            if (!previousValues.modelType
                || !previousValues.valuation
                || values.modelType.id != previousValues.modelType.id
                || values.valuation != previousValues.valuation
                || values.safeStatus != previousValues.safeStatus
                || values.oldCar != previousValues.oldCar) {
                dispatch(reduxActions.addOrderCar.getTransAndInsurePrice({ formValues: values, order: props.order }))
            }
        }
    }
})(AddOrderCar))