import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Select, DatePicker, RichTextBox, TextBox, PickerBox } from '../../components/form'
import { Container, Content } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import * as reduxActions from '../../reduxActions'
import { connect } from 'react-redux'

const CreateRoute = props => {
    const { getCityListWaiting, getCityList } = props
    return (
        <Container>
            <Content>
                <Field
                    name='routeStart'
                    label='始发城市'
                    component={Select}
                    onPress={({ onChange }) => {
                        getCityListWaiting()
                        Actions.cityListAtRouteBlock({
                            onSelect: (param) => {
                                const { id, city_name } = param
                                onChange({ id, value: city_name, item: param })
                                Actions.popTo(sceneKey)
                            },
                            preSceneKey: sceneKey
                        })
                        InteractionManager.runAfterInteractions(getCityList)
                    }}
                />
                <Field
                    name='routeStartAddr'
                    label='始发地址'
                    component={TextBox}
                />
                <Field
                    name='routeEnd'
                    label='目的城市'
                    component={Select}
                    onPress={({ onChange }) => {
                        getCityListWaiting()
                        Actions.cityListAtRouteBlock({
                            onSelect: (param) => {
                                const { id, city_name } = param
                                onChange({ id, value: city_name, item: param })
                                Actions.popTo(sceneKey)
                            },
                            preSceneKey: sceneKey
                        })
                        InteractionManager.runAfterInteractions(getCityList)
                    }}
                />
                <Field
                    name='routeEndAddr'
                    label='目的地址'
                    component={TextBox}
                />
                <Field
                    name='routeEnd'
                    label='供应商'
                    component={Select}
                    onPress={({ onChange }) => {
                        getCityListWaiting()
                        Actions.cityListAtRouteBlock({
                            onSelect: (param) => {
                                const { id, city_name } = param
                                onChange({ id, value: city_name, item: param })
                                Actions.popTo(sceneKey)
                            },
                            preSceneKey: sceneKey
                        })
                        InteractionManager.runAfterInteractions(getCityList)
                    }}
                />
                <Field
                    label='运输方式'
                    name='transType'
                    listTitle='运输方式'
                    itemList={[{ id: '1', value: '陆运' }, { id: '2', value: '航运' }]}
                    component={PickerBox} />
                <Field
                    name='planDateEnd'
                    label='计划发运日期'
                    component={DatePicker}
                />
            </Content>
        </Container>
    )
}


const mapDispatchToProps = (dispatch) => ({
    getCityListWaiting: () => {
        dispatch(reduxActions.cityList.getCityListWaiting())
    },
    getCityList: () => {
        dispatch(reduxActions.cityList.getCityList())
    }
})

export default connect(null, mapDispatchToProps)(reduxForm({
    form: 'createRouteForm',
    onSubmit: (values, dispatch, props) => {

    }
})(CreateRoute))