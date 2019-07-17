import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    RefreshControl,
    InteractionManager,
    ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Icon, Spinner } from 'native-base'
import * as reduxActions from '../../../reduxActions'
import globalStyles, { styleColor } from '../../../style/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import { Actions } from 'react-native-router-flux';
import * as routerDirection from '../../../util/RouterDirection'


const renderListEmpty = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
            <Text style={globalStyles.midText}>暂无路线</Text>
        </View>
    )
}


const renderListFooter = props => {
    return (
        <View style={styles.footerContainer}>
            <ActivityIndicator color={styleColor} styleAttr='Small' />
            <Text style={[globalStyles.smallText, styles.footerText]}>正在加载...</Text>
        </View>
    )
}

const renderItem = props => {
    const { item: { id, created_on, plan_date, route_start, load_task_status, route_end, car_count, require_status, supplier_short, trans_type,
        supplier_trans_price, supplier_insure_price }, item, sceneKey, setLoadTaskInfo, parent } = props
     console.log('parent', parent)

    let _supplier_insure_price = supplier_insure_price ? supplier_insure_price : 0
    let _supplier_trans_price = supplier_trans_price ? supplier_trans_price : 0

    return (
        <TouchableOpacity onPress={() => {
            setLoadTaskInfo(item)
            routerDirection.loadTaskInfo(parent)({ preSceneKey: sceneKey })
        }}>
            <View style={[styles.listItemHeader, styles.listItemBorderBottom]}>
                <Text style={[globalStyles.midText, styles.listItemHeaderNo]}>路线编号：{id ? `${id}` : ''}</Text>
                <Text style={[globalStyles.midText, styles.listItemHeaderDate]}>{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
            </View>
            <View style={[styles.listItemPadding, styles.listItemBorderBottom, { flexDirection: 'row', alignItems: 'center' }]}>
                <View style={{ flex: 1 }}>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={[globalStyles.xlText, { color: '#000' }]}>{route_start ? `${route_start}` : ''}</Text>
                            <Icon name='md-arrow-forward' style={{ paddingHorizontal: 10, color: '#00cade', fontSize: 20 }} />
                            <Text style={[globalStyles.xlText, { color: '#000' }]}>{route_end ? `${route_end}` : ''}</Text>
                            {trans_type == 1 && <MaterialCommunityIcons name='truck-fast' style={{ paddingLeft: 10, color: '#00cade', fontSize: 22 }} />}
                            {trans_type == 2 && <FontAwesome name='ship' style={{ paddingLeft: 10, color: '#00cade', fontSize: 20 }} />}
                        </View>
                        {load_task_status == 1 && <Text style={[globalStyles.midText, styles.fontColor]}>待发运</Text>}
                        {load_task_status == 2 && <Text style={[globalStyles.midText, styles.fontColor]}>已发运</Text>}
                        {load_task_status == 3 && <Text style={[globalStyles.midText, styles.fontColor]}>已送达</Text>}
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={[globalStyles.midText]}>{supplier_short ? `${supplier_short}` : ''}</Text>
                        <Text style={[globalStyles.midText]}>运送车辆：{car_count ? `${car_count}` : '0'}</Text>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={[globalStyles.midText]}>计划发运日期：{plan_date ? `${moment(plan_date).format('YYYY-MM-DD')}` : ''}</Text>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={[globalStyles.midText]}>支付供应商：</Text>
                        <Text style={[globalStyles.midText]}><Text style={[globalStyles.xlText, styles.fontColor]}>{(_supplier_insure_price + _supplier_trans_price)}</Text> 元</Text>
                    </View>
                </View>
                <View>
                    <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const LoadTaskList = props => {
    // console.log('props', props)
    const { loadTaskListReducer: {
        data: { loadTaskList, isCompleted },
        getLoadTaskList: { isResultStatus } },
        loadTaskListReducer,
        getLoadTaskListMore,
        getLoadTaskListWaiting,
        getLoadTaskList,
        setLoadTaskInfo,
        sceneKey,
        parent } = props
     console.log('parent', parent)

    // console.log('loadTaskList', loadTaskList)
    if (isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>
                <FlatList
                    keyExtractor={(item, index) => index}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (isResultStatus == 2 && !isCompleted) {
                            getLoadTaskListMore()
                        } else {
                            // if (!this.state.loadListIsFinished) {
                            //     ToastAndroid.show('已全部加载完毕！', 10)
                            //     this.setState({
                            //         loadListIsFinished: true
                            //     })
                            // }
                        }
                    }}
                    ListEmptyComponent={loadTaskListReducer.getLoadTaskList.isResultStatus != 1 && loadTaskList.length == 0 && renderListEmpty}
                    ListFooterComponent={loadTaskListReducer.getLoadTaskListMore.isResultStatus == 1 ? renderListFooter : <View style={{ height: 15 }} />}
                    data={loadTaskList}
                    renderItem={param => renderItem({ ...param, sceneKey, setLoadTaskInfo, parent })} />
            </Container>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        loadTaskListReducer: state.loadTaskListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getLoadTaskListMore: () => {
        dispatch(reduxActions.loadTaskList.getLoadTaskListMore())
    },
    getLoadTaskList: () => {
        dispatch(reduxActions.loadTaskList.getLoadTaskList())
    },
    getLoadTaskListWaiting: () => {
        dispatch(reduxActions.loadTaskList.getLoadTaskListWaiting())
    },
    setLoadTaskInfo: param => {
        dispatch(reduxActions.loadTaskInfo.setLoadTaskInfo(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadTaskList)

const styles = StyleSheet.create({
    listItemHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#f5edf3',
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    listItemHeaderNo: {
        color: '#766978',
        fontWeight: '300'
    },
    listItemHeaderDate: {
        color: '#a098a1'
    },
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
        alignItems: 'center'
    },
    fontColor: {
        color: '#bd417c'
    },
    footerContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    footerText: {
        paddingLeft: 10
    }
})