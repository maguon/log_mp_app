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

const startCityRequiredValidator = requiredObj('始发城市必选')
const endCityRequiredValidator = requiredObj('目的城市必选')
const serviceTypeRequiredValidator = requiredObj('服务方式必选')
const departureTimeRequiredValidator = required('发运日期必选')

const FeePrice = props => {
    console.log('props', props)
    const { getRouteCityListWaiting, getRouteCityList, getCityListWaiting, getCityList, formValues, sceneKey, dispatch } = props

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
                                    const { id, value } = param
                                    onChange({ id, value, item: param })
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
                    last
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
            actTransPrice: '0.00'
        },
        // addOrderCarReducer: state.addOrderCarReducer,
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
    changeRouteCity:req=>{
        
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'feePriceForm',
    onSubmit: (values, dispatch, props) => {
        // console.log('addOrderCarForm')
        // dispatch(reduxActions.addOrderCar.addOrderCar({ formValues: values, order: props.order }))
    },
    onChange: (values, dispatch, props, previousValues) => {
        // console.log('props', props)
        // if (values.modelType && values.valuation) {
        //     if (!previousValues.modelType
        //         || !previousValues.valuation
        //         || values.modelType.id != previousValues.modelType.id
        //         || values.valuation != previousValues.valuation
        //         || values.safeStatus != previousValues.safeStatus
        //         || values.oldCar != previousValues.oldCar) {
        //         dispatch(reduxActions.addOrderCar.getTransAndInsurePrice({ formValues: values, order: props.order }))
        //     }
        // }
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
        backgroundColor: '#fff'
    },
    fontColor: {
        color: '#bd417c'
    }
})