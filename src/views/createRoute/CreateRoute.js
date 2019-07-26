import React, { Component } from 'react'
import { Text, View, InteractionManager } from 'react-native'
import { Select, DatePicker, RichTextBox, TextBox, PickerBox } from '../../components/form'
import { Container, Content } from 'native-base'
import { reduxForm, Field } from 'redux-form'
import * as reduxActions from '../../reduxActions'
import { connect } from 'react-redux'
import * as routerDirection from '../../util/RouterDirection'
import { Actions } from 'react-native-router-flux'
import ModalWaiting from '../../components/ModalWaiting'

const CreateRoute = props => {
    const { getCityListWaiting, getCityList, getSupplierList, getSupplierListWaiting, parent, sceneKey,
        createRouteReducer: { createRoute: { isResultStatus } } } = props
    return (
        <Container>
            <Content>
                <Field
                    name='routeStart'
                    label='始发城市'
                    component={Select}
                    onPress={({ onChange }) => {
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
                    }}
                />
                <Field
                    name='routeStartDetail'
                    label='始发地址'
                    component={TextBox}
                />
                <Field
                    name='routeEnd'
                    label='目的城市'
                    component={Select}
                    onPress={({ onChange }) => {
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
                    }}
                />
                <Field
                    name='routeEndDetail'
                    label='目的地址'
                    component={TextBox}
                />
                <Field
                    name='supplier'
                    label='供应商'
                    component={Select}
                    onPress={({ onChange }) => {
                        getSupplierListWaiting()
                        routerDirection.supplierList(parent)({
                            onSelect: (param) => {
                                const { id, supplier_short } = param
                                onChange({ id, value: supplier_short, item: param })
                                Actions.popTo(sceneKey)
                            },
                            preSceneKey: sceneKey
                        })
                        InteractionManager.runAfterInteractions(getSupplierList)
                    }}
                />
                <Field
                    label='运输方式'
                    name='transType'
                    listTitle='运输方式'
                    itemList={[{ id: '1', value: '陆运' }, { id: '2', value: '航运' }]}
                    component={PickerBox} />
                <Field
                    name='planDate'
                    label='计划发运日期'
                    component={DatePicker}
                />
            </Content>
            <ModalWaiting visible={isResultStatus == 1} title={'提交中...'} />
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        createRouteReducer: state.createRouteReducer
    }
}


const mapDispatchToProps = (dispatch) => ({
    getCityListWaiting: () => {
        dispatch(reduxActions.cityList.getCityListWaiting())
    },
    getCityList: () => {
        dispatch(reduxActions.cityList.getCityList())
    },
    getSupplierList: () => {
        dispatch(reduxActions.supplierList.getSupplierList())
    },
    getSupplierListWaiting: () => {
        dispatch(reduxActions.supplierList.getSupplierListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'createRouteForm',
    onSubmit: (values, dispatch, props) => {
        const { requireTaskInfo } = props
        dispatch(reduxActions.createRoute.createRoute({ values, orderId: requireTaskInfo.order_id, requireId: requireTaskInfo.id }))
    }
})(CreateRoute))