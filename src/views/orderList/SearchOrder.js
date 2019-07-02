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

const SearchOrder = props => {
    // console.log('props', props)
    const { getCityListWaiting, getCityList, sceneKey, handleSubmit, dispatch,closeDrawer } = props
    return (
        <Container>
            <Content>
                <Field
                    name='orderId'
                    label='订单编号'
                    component={TextBox}
                />
                <Field
                    itemStyle={{ width: drawerWidth - 30 }}
                    label='订单状态'
                    name='status'
                    listTitle='订单状态'
                    itemList={[{ id: '1', value: '陆运' }, { id: '2', value: '航运' }]}
                    component={PickerBox} />
                <Field
                    itemStyle={{ width: drawerWidth - 30 }}
                    label='支付状态'
                    name='paymentStatus'
                    listTitle='支付状态'
                    itemList={[{ id: '1', value: '陆运' }, { id: '2', value: '航运' }]}
                    component={PickerBox} />
                <Field
                    itemStyle={{ width: drawerWidth - 30 }}
                    label='服务方式'
                    name='serviceType'
                    listTitle='服务方式'
                    itemList={[{ id: '1', value: '陆运' }, { id: '2', value: '航运' }]}
                    component={PickerBox} />
                <Field
                    name='routeStart'
                    label='始发城市'
                    itemStyle={{ width: drawerWidth - 30 }}
                    component={Select}
                    onPress={({ onChange }) => {
                        getCityListWaiting()
                        Actions.cityListAtOrderBlock({
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
                        Actions.cityListAtOrderBlock({
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
                <View style={[{ justifyContent: 'space-between', flexDirection: 'row' }]}>
                    <Button style={[{
                        flex: 1, marginLeft: 15, backgroundColor: '#ff5807',
                        marginVertical: 15, justifyContent: 'center', alignItems: 'center',
                        borderBottomRightRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 20,
                        borderTopLeftRadius: 20
                    }]}
                        onPress={() => {
                            dispatch(destroy('searchOrderForm'))
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
    form: 'searchOrderForm',
    onSubmit: (values, dispatch, props) => {
        reduxActions.orderList.getOrderListWaiting()
        dispatch(reduxActions.orderList.getOrderList(values))
    }
})(SearchOrder))