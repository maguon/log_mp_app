import React, { Component } from 'react'
import {
    Text,
    View,
    InteractionManager,
    DrawerLayoutAndroid,
    DeviceEventEmitter
} from 'react-native'
import { Container, Tab, Tabs, Button, Content } from 'native-base'
import RequireTaskList from './requireTaskList/RequireTaskList'
import LoadTaskList from './loadTaskList/LoadTaskList'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'
import { reduxForm, FormSection, Field } from 'redux-form'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../style/GlobalStyles'
import { TextBox, DatePicker, PickerBox, Select } from '../../components/form'

const drawerWidth = 300

const RequireSearch = props => {
    const { getCityListWaiting, getCityList, sceneKey, closeDrawer } = props
    console.log('props', props)
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
                    label='服务方式'
                    name='serviceType'
                    listTitle='服务方式'
                    itemList={[{ id: '1', value: '上门提货' }, { id: '2', value: '当地自提' }]}
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
                    label='创建事件（始）'
                    itemStyle={{ width: drawerWidth - 30 }}
                    component={DatePicker}
                />
                <Field
                    name='createdOnEnd'
                    label='创建事件（终）'
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
                        onPress={() => { }}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>重置</Text>
                    </Button>
                    <Button onPress={() => {
                        closeDrawer()
                    }} style={[{ flex: 1, marginRight: 15, backgroundColor: styleColor, marginVertical: 15, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 0, borderTopLeftRadius: 0, borderBottomRightRadius: 20, borderTopRightRadius: 20 }]}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>确定</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    )
}


const LoadTaskSearch = props => {
    const { getCityListWaiting, getCityList, sceneKey, closeDrawer } = props
    console.log('props', props)
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
                    label='服务方式'
                    name='serviceType'
                    listTitle='服务方式'
                    itemList={[{ id: '1', value: '上门提货' }, { id: '2', value: '当地自提' }]}
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
                    label='创建事件（始）'
                    itemStyle={{ width: drawerWidth - 30 }}
                    component={DatePicker}
                />
                <Field
                    name='createdOnEnd'
                    label='创建事件（终）'
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
                        onPress={() => { }}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>重置</Text>
                    </Button>
                    <Button onPress={() => {
                        // handleSubmit()
                        this.drawer.closeDrawer()
                    }} style={[{ flex: 1, marginRight: 15, backgroundColor: styleColor, marginVertical: 15, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 0, borderTopLeftRadius: 0, borderBottomRightRadius: 20, borderTopRightRadius: 20 }]}>
                        <Text style={[globalStyles.midText, { color: '#fff' }]}>确定</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    )
}

class Route extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabsIndex: 0
        }
    }

    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('openDrawer', (e) => {
            this.drawer.openDrawer()
        })
        const { getRequireTaskList, getRequireTaskListWaiting, getLoadTaskListWaiting, getLoadTaskList } = this.props
        getRequireTaskListWaiting()
        getLoadTaskListWaiting()
        InteractionManager.runAfterInteractions(() => {
            getRequireTaskList()
            getLoadTaskList()
        })
    }

    componentWillUnmount() {
        this.listener.remove()
    }

    render() {
        const { getCityList, getCityListWaiting, sceneKey, handleSubmit } = this.props
        return (
            <DrawerLayoutAndroid
                ref={ref => this.drawer = ref}
                drawerWidth={drawerWidth}
                drawerPosition={DrawerLayoutAndroid.positions.Right}
                renderNavigationView={() => {
                    if (this.state.tabsIndex == 0) {
                        return (
                            <FormSection name='requireSearch' >
                                <RequireSearch
                                    getCityListWaiting={getCityListWaiting}
                                    getCityList={getCityList}
                                    sceneKey={sceneKey}
                                    closeDrawer={() => this.drawer.closeDrawer()} />
                            </FormSection>
                        )
                    } else {
                        return (
                            <FormSection name='loadTaskSearch' >
                                <RequireSearch
                                    getCityListWaiting={getCityListWaiting}
                                    getCityList={getCityList}
                                    sceneKey={sceneKey}
                                    closeDrawer={() => this.drawer.closeDrawer()} />
                            </FormSection>

                        )
                    }
                }}>
                <Container>
                    <Tabs onChangeTab={param => {
                        InteractionManager.runAfterInteractions(() => this.setState({ tabsIndex: param.i }))
                    }}>
                        <Tab
                            tabStyle={globalStyles.styleBackgroundColor}
                            activeTabStyle={globalStyles.styleBackgroundColor}
                            activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                            textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                            heading="订单需求">
                            <RequireTaskList />

                        </Tab>
                        <Tab
                            tabStyle={globalStyles.styleBackgroundColor}
                            activeTabStyle={globalStyles.styleBackgroundColor}
                            activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                            textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                            heading="路线">
                            <LoadTaskList />

                        </Tab>
                    </Tabs>
                </Container>
            </DrawerLayoutAndroid>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    getRequireTaskList: () => {
        dispatch(reduxActions.requireTaskList.getRequireTaskList())
    },
    getRequireTaskListWaiting: () => {
        dispatch(reduxActions.requireTaskList.getRequireTaskListWaiting())
    },
    getCityList: () => {
        dispatch(reduxActions.cityList.getCityList())
    },
    getCityListWaiting: () => {
        dispatch(reduxActions.cityList.getCityListWaiting())
    },
    getLoadTaskList: () => {
        dispatch(reduxActions.loadTaskList.getLoadTaskList())
    },
    getLoadTaskListWaiting: () => {
        dispatch(reduxActions.loadTaskList.getLoadTaskListWaiting())
    }
})

export default connect(null, mapDispatchToProps)(reduxForm({
    form: 'routeSearchForm',
    onSubmit: (values, dispatch, props) => {
        console.log('values', values)
    }
})(Route))