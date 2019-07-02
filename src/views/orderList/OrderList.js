import React, { Component } from 'react'
import {
    Text,
    View,
    DrawerLayoutAndroid,
    DeviceEventEmitter,
    FlatList,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'
import { Container, Content } from 'native-base'
import SearchOrder from './SearchOrder'



const drawerWidth = 300

const renderItem = props => {
    return (
        <View>
            <Text>renderItem</Text>
        </View>
    )
}

class OrderList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabsIndex: 0
        }
    }

    componentDidMount() {
        const { getOrderListWaiting, getOrderList } = this.props
        this.listener = DeviceEventEmitter.addListener('openOrderListDrawer', (e) => {
            this.drawer.openDrawer()
        })
        getOrderListWaiting()
        InteractionManager.runAfterInteractions(getOrderList)

    }

    componentWillUnmount() {
        this.listener.remove()
    }

    render() {
        // console.log('this.props', this.props)
        const { sceneKey, getOrderListMore,
            orderListReducer: { data: { orderList, isCompleted }, getOrderList: { isResultStatus } } } = this.props
        return (
            <Container>
                <DrawerLayoutAndroid
                    ref={ref => this.drawer = ref}
                    drawerWidth={drawerWidth}
                    drawerPosition={DrawerLayoutAndroid.positions.Right}
                    renderNavigationView={() => {
                        return <SearchOrder sceneKey={sceneKey} closeDrawer={() => this.drawer.closeDrawer()} />
                    }}>
                    <FlatList
                        keyExtractor={(item, index) => index}
                        onEndReachedThreshold={0.2}
                        onEndReached={() => {
                            if (isResultStatus == 2 && !isCompleted) {
                                getOrderListMore()
                            } else {
                                // if (!this.state.loadListIsFinished) {
                                //     ToastAndroid.show('已全部加载完毕！', 10)
                                //     this.setState({
                                //         loadListIsFinished: true
                                //     })
                                // }
                            }
                        }}
                        data={orderList}
                        renderItem={renderItem} />
                </DrawerLayoutAndroid>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orderListReducer: state.orderListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getOrderListMore: () => {
        dispatch(reduxActions.orderList.getOrderListMore())
    },
    getOrderList: () => {
        dispatch(reduxActions.orderList.getOrderList())
    },
    getOrderListWaiting: () => {
        dispatch(reduxActions.orderList.getOrderListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)