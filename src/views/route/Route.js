import React, { Component } from 'react'
import {
    InteractionManager,
    DrawerLayoutAndroid,
    DeviceEventEmitter
} from 'react-native'
import { Container, Tab, Tabs } from 'native-base'
import RequireTaskList from './requireTaskList/RequireTaskList'
import LoadTaskList from './loadTaskList/LoadTaskList'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'
import { initialize } from 'redux-form'
import globalStyles from '../../style/GlobalStyles'
import RequireSearch from './RequireSearch'
import LoadTaskSearch from './LoadTaskSearch'

const drawerWidth = 300

class Route extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabsIndex: 0
        }
    }

    componentDidMount() {
        const { getRequireTaskList, getRequireTaskListWaiting, getLoadTaskListWaiting,
            getLoadTaskList, initForm } = this.props

        this.listener = DeviceEventEmitter.addListener('openDrawer', (e) => {
            const { requireTaskListReducer, loadTaskListReducer } = this.props
            this.drawer.openDrawer()
            if (this.state.tabsIndex == 0) {
                initForm('requireSearchForm', requireTaskListReducer.data.searchParam)
            } else {
                initForm('loadTaskSearchForm', loadTaskListReducer.data.searchParam)
            }

        })

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
        const { sceneKey,parent } = this.props
        return (
            <DrawerLayoutAndroid
                ref={ref => this.drawer = ref}
                drawerWidth={drawerWidth}
                drawerPosition={DrawerLayoutAndroid.positions.Right}
                renderNavigationView={() => {
                    if (this.state.tabsIndex == 0) {
                        return (
                            <RequireSearch sceneKey={sceneKey} closeDrawer={() => this.drawer.closeDrawer()} />
                        )
                    } else {
                        return (
                            <LoadTaskSearch sceneKey={sceneKey} closeDrawer={() => this.drawer.closeDrawer()} />
                        )
                    }
                }}>
                <Container>
                    <Tabs onChangeTab={param => {
                        InteractionManager.runAfterInteractions(() => {
                            this.setState({ tabsIndex: param.i })
                        })
                    }}>
                        <Tab
                            tabStyle={globalStyles.styleBackgroundColor}
                            activeTabStyle={globalStyles.styleBackgroundColor}
                            activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                            textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                            heading="订单需求">
                            <RequireTaskList sceneKey={sceneKey}  parent={parent}/>
                        </Tab>
                        <Tab
                            tabStyle={globalStyles.styleBackgroundColor}
                            activeTabStyle={globalStyles.styleBackgroundColor}
                            activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                            textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                            heading="路线">
                            <LoadTaskList sceneKey={sceneKey} parent={parent} />
                        </Tab>
                    </Tabs>
                </Container>
            </DrawerLayoutAndroid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        requireTaskListReducer: state.requireTaskListReducer,
        loadTaskListReducer: state.loadTaskListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRequireTaskList: () => {
        dispatch(reduxActions.requireTaskList.getRequireTaskList())
    },
    getRequireTaskListWaiting: () => {
        dispatch(reduxActions.requireTaskList.getRequireTaskListWaiting())
    },
    getLoadTaskList: () => {
        dispatch(reduxActions.loadTaskList.getLoadTaskList())
    },
    getLoadTaskListWaiting: () => {
        dispatch(reduxActions.loadTaskList.getLoadTaskListWaiting())
    },
    initForm: (formName, searchParam) => {
        dispatch(initialize(formName, searchParam))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Route)