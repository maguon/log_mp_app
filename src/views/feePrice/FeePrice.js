import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    InteractionManager,
    ToastAndroid
} from 'react-native'
import { reduxForm, Field, getFormValues, change } from 'redux-form'
import { connect } from 'react-redux'
import { TextBox, PickerBox, CheckBox, SwitchBox, Select } from '../../components/form'
import { Container, Content } from 'native-base'
import { requiredObj, required } from '../../util/Validator'
import ModalWaiting from '../../components/ModalWaiting'
import carModal from '../../config/car_modal.json'
import * as reduxActions from '../../reduxActions'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../style/GlobalStyles'

const startCityRequiredValidator = requiredObj('始发城市必选')
const endCityRequiredValidator = requiredObj('目的城市必选')
const serviceTypeRequiredValidator = requiredObj('服务方式必选')
const departureTimeRequiredValidator = required('发运日期必选')

const FeePrice = props => {
    // console.log('props', props)
    const { getRouteCityListWaiting, getRouteCityList, validatRoute, getCityListWaiting,
        getCityList, formValues, sceneKey, feePriceReducer: { data: { transAndInsurePrice: { insure, trans } } } } = props

    // console.log('transAndInsurePrice', transAndInsurePrice)
    const _insure = insure ? insure : 0
    const _trans = trans ? trans : 0
    const totalfee = _insure + _trans

    const carModalList = carModal.map(item => {
        return {
            id: item[0],
            value: item[1].name
        }
    })
    return (
        <Container>
            <Content>
                <Field
                    name='startCity'
                    label='始发城市'
                    component={Select}
                    validate={[startCityRequiredValidator]}
                    onPress={({ onChange }) => {
                        getCityListWaiting()
                        Actions.cityListAtFeePriceBlock({
                            onSelect: (param) => {
                                const { id, city_name } = param
                                onChange({ id, value: city_name, item: param })
                                Actions.popTo('feePrice')
                                if (formValues && formValues.endCity)
                                    validatRoute({ routeStartId: id, routeEndId: formValues.endCity.id })
                            },
                            preSceneKey: sceneKey
                        })
                        InteractionManager.runAfterInteractions(getCityList)
                    }}
                />
                <Field
                    name='endCity'
                    label='目的城市'
                    component={Select}
                    validate={[endCityRequiredValidator]}
                    onPress={({ onChange }) => {
                        if (formValues && formValues.startCity) {
                            getRouteCityListWaiting()
                            Actions.routeCityListAtFeePriceBlock({
                                onSelect: (param) => {
                                    const { id, value, item: { distance }, item } = param
                                    onChange({ id, value: `${value} ${distance}km`, item })
                                    Actions.popTo('feePrice')
                                },
                                preSceneKey: sceneKey,
                                routeStartId: formValues.startCity.id
                            })
                            InteractionManager.runAfterInteractions(() => getRouteCityList({ routeStartId: formValues.startCity.id }))
                        } else {
                            ToastAndroid.show('请先选择始发城市！', 10)
                        }
                    }}
                />
                <Field
                    validate={[serviceTypeRequiredValidator]}
                    label='服务方式'
                    name='serviceType'
                    listTitle='服务方式'
                    itemList={[{ id: '1', value: '上门提货' }, { id: '2', value: '当地自提' }]}
                    component={PickerBox} />
                <Field
                    label='车型'
                    name='modelType'
                    listTitle='车型列表'
                    itemList={carModalList}
                    component={PickerBox} />
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
                <View style={[{ backgroundColor: '#f5edf3' }]}>
                    <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                        <Text style={[styles.listItemPadding, globalStyles.midText]}>预计运费</Text>
                        <Text style={[styles.listItemPadding, globalStyles.midText]}><Text style={styles.fontColor}>{`${_trans}`}</Text> 元</Text>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                        <Text style={[styles.listItemPadding, globalStyles.midText]}>预计保费</Text>
                        <Text style={[styles.listItemPadding, globalStyles.midText]}><Text style={styles.fontColor}>{`${_insure}`}</Text> 元</Text>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                        <Text style={[styles.listItemPadding, globalStyles.midText]}>预计费用</Text>
                        <Text style={[styles.listItemPadding, globalStyles.midText]}><Text style={styles.fontColor}>{`${totalfee}`}</Text> 元</Text>
                    </View>
                </View>
            </Content>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        initialValues: {
            safeStatus: false,
            oldCar: false,
            actInsurePrice: '0.00',
            actTransPrice: '0.00',
            startCity: {},
            endCity: {}
        },
        feePriceReducer: state.feePriceReducer,
        formValues: getFormValues('feePriceForm')(state)
    }
}


const mapDispatchToProps = (dispatch) => ({
    getCityList: () => {
        dispatch(reduxActions.cityList.getCityList())
    },
    getCityListWaiting: () => {
        dispatch(reduxActions.cityList.getCityListWaiting())
    },
    getRouteCityListWaiting: () => {
        dispatch(reduxActions.routeCityList.getRouteCityListWaiting())
    },
    getRouteCityList: req => {
        dispatch(reduxActions.routeCityList.getRouteCityList(req))
    },
    validatRoute: req => {
        dispatch(reduxActions.feePrice.validatRoute(req))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'feePriceForm',
    onChange: (values, dispatch, props, previousValues) => {
        if (values.startCity && values.endCity && values.serviceType && values.modelType && values.valuation) {
            if ( values.endCity.id != previousValues.endCity.id
                || values.endCity.item.distance != previousValues.endCity.item.distance
                || values.modelType.id != previousValues.modelType.id
                || values.serviceType.id != previousValues.serviceType.id
                || values.valuation != previousValues.valuation
                || values.safeStatus != previousValues.safeStatus
                || values.oldCar != previousValues.oldCar) {
                dispatch(reduxActions.feePrice.getTransAndInsurePrice({ formValues: values }))
            }
        }
    }
})(FeePrice))


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
    },
    fontColor: {
        color: '#bd417c'
    }
})