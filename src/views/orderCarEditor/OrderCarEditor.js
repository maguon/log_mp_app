import React, { Component } from 'react'
import { Text, View, Switch, StyleSheet } from 'react-native'
import { TextBox, PickerBox, SwitchBox, CheckBox } from '../../components/form'
import { reduxForm, Field, getFormValues } from 'redux-form'
import { Container, Content, Icon } from 'native-base'
import carModal from '../../config/car_modal.json'
import globalStyles from '../../style/GlobalStyles'
import { connect } from 'react-redux'
import { moneyFormat } from '../../util/util'

const OrderCarEditor = props => {
    const carModalList = carModal.map(item => {
        return {
            id: item[0],
            value: item[1].name
        }
    })
    const { orderCarEditorReducer: { data: { transAndInsurePrice: { insure, trans } } }, dispatch, formValues } = props
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
                        onFocus={(event, name) => { if (!actTransPrice) dispatch(change('orderCarEditorForm', 'actTransPrice', '')) }}
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
                        onFocus={(event, name) => { if (!actInsurePrice) dispatch(change('orderCarEditorForm', 'actInsurePrice', '')) }}
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
    const { orderCarListReducer: { data: { orderCarList } } } = state
    const { orderCarId } = ownProps
    const orderCar = orderCarList.find(item => item.id == orderCarId)
    const { safe_status, act_insure_price, vin, act_trans_price, valuation, brand, brand_type, model_type } = orderCar
    const cartype = new Map(carModal).get(model_type)
    console.log('orderCar', orderCar)
    console.log('cartype', cartype)
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
            oldCar: false
            // actInsurePrice: '0.00',
            // actTransPrice: '0.00'
        },
        formValues: getFormValues('orderCarEditorForm')(state),
        orderCarEditorReducer: state.orderCarEditorReducer
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'orderCarEditorForm',
    onSubmit: (values, dispatch, props) => {
        console.log('orderCarEditorForm')
    }
})(OrderCarEditor))