import React, { Component } from 'react'
import { Text, View, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'
import { reduxForm, Field, getFormValues, destroy } from 'redux-form'
import { Container, Content, Button } from 'native-base'
import { TextBox, DatePicker, PickerBox, Select } from '../../components/form'
import globalStyles, { styleColor } from '../../style/GlobalStyles'
import { Actions } from 'react-native-router-flux'

const drawerWidth = 300

const LoadTaskSearch = props => {
    const { getCityListWaiting, getCityList, sceneKey, closeDrawer, handleSubmit, dispatch } = props
    return (
        <Container>
            <Content>
                <Field
                    name='loadTaskId'
                    label='线路编号'
                    component={TextBox}
                />
                <Field
                    itemStyle={{ width: drawerWidth - 30 }}
                    label='运输方式'
                    name='transType'
                    listTitle='运输方式'
                    itemList={[{ id: '1', value: '陆运' }, { id: '2', value: '航运' }]}
                    component={PickerBox} />
                <Field
                    name='routeStart'
                    label='始发城市'
                    itemStyle={{ width: drawerWidth - 30 }}
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
                    name='routeEnd'
                    label='目的城市'
                    itemStyle={{ width: drawerWidth - 30 }}
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
                    name='createdOnStart'
                    label='创建时间（始）'
                    itemStyle={{ width: drawerWidth - 30 }}
                    component={DatePicker}
                />
                <Field
                    name='createdOnEnd'
                    label='创建时间（终）'
                    itemStyle={{ width: drawerWidth - 30 }}
                    component={DatePicker}
                />
                <Field
                    name='planDateStart'
                    label='计划发运时间（始）'
                    itemStyle={{ width: drawerWidth - 30 }}
                    component={DatePicker}
                />
                <Field
                    name='planDateEnd'
                    label='计划发运时间（终）'
                    itemStyle={{ width: drawerWidth - 30 }}
                    component={DatePicker}
                />
                <View style={[{ justifyContent: 'space-between', flexDirection: 'row' }]}>
                    <Button style={[{
                        flex: 1, marginLeft: 15, backgroundColor: '#ff5807',
                        marginVertical: 15, justifyContent: 'center', alignItems: 'center',
                        borderBottomRightRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 20,
                        borderTopLeftRadius: 20
                    }]}
                        onPress={() => {
                            dispatch(destroy('loadTaskSearchForm'))
                        }}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>重置</Text>
                    </Button>
                    <Button onPress={() => {
                        handleSubmit()
                        closeDrawer()
                    }} style={[{ flex: 1, marginRight: 15, backgroundColor: styleColor, marginVertical: 15, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 0, borderTopLeftRadius: 0, borderBottomRightRadius: 20, borderTopRightRadius: 20 }]}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>确定</Text>
                    </Button>
                </View>
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
    form: 'loadTaskSearchForm',
    onSubmit: (values, dispatch, props) => {
        dispatch(reduxActions.loadTaskList.getLoadTaskListWaiting())
        InteractionManager.runAfterInteractions(() => dispatch(reduxActions.loadTaskList.getLoadTaskList(values)))
    }
})(LoadTaskSearch))