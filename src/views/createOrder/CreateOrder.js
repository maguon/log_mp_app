import React, { Component } from 'react'
import {
    Text,
    View,
    InteractionManager,
} from 'react-native'
import * as reduxActions from '../../reduxActions'
import { reduxForm, Field, getFormValues } from 'redux-form'
import { Select, PickerBox, DatePicker } from '../../components/form'
import { Container, Content } from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { requiredObj, required } from '../../util/Validator'
import ModalWaiting from '../../components/ModalWaiting'
import * as routerDirection from '../../util/RouterDirection'

const startCityRequiredValidator = requiredObj('始发城市必选')
const endCityRequiredValidator = requiredObj('目的城市必选')
const serviceTypeRequiredValidator = requiredObj('服务方式必选')
const departureTimeRequiredValidator = required('发运日期必选')

const CreateOrder = props => {
    const { getCityList, getCityListWaiting, sceneKey, getRouteCityListWaiting, getRouteCityList, formValues,
        createOrderReducer, parent } = props
    console.log('props', props)
    return (
        <Container>
            <Content>
                <Field
                    name='startCity'
                    label='始发城市'
                    component={Select}
                    validate={[startCityRequiredValidator]}
                    onPress={({ onChange }) => {
                        if (formValues && formValues.endCity) {
                            getRouteCityListWaiting()
                            routerDirection.routeCityList(parent)({
                                onSelect: (param) => {
                                    const { id, value } = param
                                    onChange({ id, value, item: param })
                                    Actions.popTo(sceneKey)
                                },
                                preSceneKey: sceneKey,
                                routeStartId: formValues.endCity.id
                            })
                            InteractionManager.runAfterInteractions(() => getRouteCityList({ routeStartId: formValues.endCity.id }))
                        } else {
                            getCityListWaiting()
                            routerDirection.cityList(parent)({
                                onSelect: (param) => {
                                    const { id, city_name } = param
                                    onChange({ id, value: city_name, item: param })
                                    Actions.popTo(sceneKey)
                                },
                                preSceneKey: sceneKey
                            })
                            InteractionManager.runAfterInteractions(getCityList)
                        }
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
                            routerDirection.routeCityList(parent)({
                                onSelect: (param) => {
                                    const { id, value } = param
                                    onChange({ id, value, item: param })
                                    Actions.popTo(sceneKey)
                                },
                                preSceneKey: sceneKey,
                                routeStartId: formValues.startCity.id
                            })
                            InteractionManager.runAfterInteractions(() => getRouteCityList({ routeStartId: formValues.startCity.id }))
                        } else {
                            getCityListWaiting()
                            routerDirection.cityList(parent)({
                                onSelect: (param) => {
                                    const { id, city_name } = param
                                    onChange({ id, value: city_name, item: param })
                                    Actions.popTo(sceneKey)
                                },
                                preSceneKey: sceneKey
                            })
                            InteractionManager.runAfterInteractions(getCityList)
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
                    name='departureTime'
                    label='发运日期'
                    validate={[departureTimeRequiredValidator]}
                    component={DatePicker} />
            </Content>
            <ModalWaiting visible={createOrderReducer.createOrder.isResultStatus == 1} title={'提交中...'} />
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        createOrderReducer: state.createOrderReducer,
        formValues: getFormValues('createOrderForm')(state)
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'createOrderForm',
    onSubmit: (values, dispatch, props) => {
        dispatch(reduxActions.createOrder.createOrder(values))
    }
})(CreateOrder))