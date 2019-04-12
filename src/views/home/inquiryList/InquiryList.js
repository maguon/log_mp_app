import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    InteractionManager,
    FlatList,
    RefreshControl,
    ToastAndroid,
    ActivityIndicator
} from 'react-native'
import { Container, Tabs, Tab, TabHeading, Icon, Input, Content, Spinner, Button } from 'native-base'
import globalStyles, { styleColor } from '../../../style/GlobalStyles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { moneyFormat } from '../../../util/util'
import { Actions } from 'react-native-router-flux'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import * as reduxActions from '../../../reduxActions'
import moment from 'moment'


const renderListEmpty = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
            <Text style={globalStyles.midText}>暂无协商记录</Text>
        </View>
    )
}

const renderListItem = props => {
    const { item: { start_city = '', end_city = '', car_num = '0', status, id, service_type,
        total_insure_price = 0, total_trans_price = 0, ora_insure_price = 0, ora_trans_price = 0, created_on }, sceneKey } = props
    return (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => Actions.inquiryInfo({ inquiryId: id, preSceneKey: sceneKey })}>
            <View style={[styles.listItemHeader, styles.listItemBorderBottom]}>
                <Text style={[globalStyles.midText, styles.listItemHeaderNo]}>询价编号：{`${id}`}</Text>
                <Text style={[globalStyles.midText, styles.listItemHeaderDate]}>{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
            </View>
            <View style={[styles.listItemBorderBottom, { flexDirection: 'row', padding: 7.5, alignItems: 'center' }]}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', padding: 7.5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons name='truck' style={{ color: '#d58dac', fontSize: 20 }} />
                            <Text style={[globalStyles.largeText, { paddingLeft: 10 }]}>{`${start_city}`}</Text>
                            <Icon name='md-arrow-forward' style={{ paddingHorizontal: 10, color: '#00cade', fontSize: 20 }} />
                            <Text style={[globalStyles.largeText]}>{`${end_city}`}</Text>
                        </View>
                        <View>
                            <Text style={[globalStyles.midText, { color: '#d82983' }]}>
                                {status == 0 && '待协商'}
                                {status == 1 && '已协商'}
                                {status == 2 && '已生成订单'}
                                {status == 3 && '取消订单'}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7.5 }}>
                        <View>
                            <Text style={[globalStyles.midText]}>
                                {service_type == 1 && '上门提货'}
                                {service_type == 2 && '当地自提'}
                            </Text>
                        </View>
                        <View>
                            <Text style={[globalStyles.midText]}>运送车辆:{car_num}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7.5 }}>
                        <View>
                            <Text style={[globalStyles.midText]}>预计费用：<Text style={[{ color: '#d82983' }]}>{`${moneyFormat(ora_insure_price + ora_trans_price, 2)}`}</Text>元</Text>
                        </View>
                        {status != 0 && <View>
                            <Text style={[globalStyles.midText]}>协商费用：<Text style={[{ color: '#d82983' }]}>{`${moneyFormat(total_insure_price + total_trans_price, 2)}`}</Text>元</Text>
                        </View>}
                    </View>
                </View>
                <View>
                    <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                </View>
            </View>
        </TouchableOpacity>
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

class InquiryList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { getInquiryListWaiting, getInquiryList } = this.props
        getInquiryListWaiting()
        InteractionManager.runAfterInteractions(getInquiryList)
    }

    render() {
        const { inquiryListReducer: { data: { inquiryList, isCompleted, searchParam },
            getInquiryList: { isResultStatus } }, inquiryListReducer,
            getInquiryListWaiting, getInquiryList,  getInquiryListMore, sceneKey } = this.props
        // console.log('this.props',this.props)
        return (
                <Container>
                    <FlatList
                        refreshControl={<RefreshControl
                            refreshing={isResultStatus == 1}
                            onRefresh={() => {
                                getInquiryListWaiting()
                                InteractionManager.runAfterInteractions(() => getInquiryList(searchParam))
                            }}
                            progressBackgroundColor={'rgba(255,255,255,0)'}
                            tintColor={'rgba(0,0,0,0)'}
                            colors={[styleColor]}
                        />}
                        onEndReachedThreshold={0.2}
                        onEndReached={() => {
                            if (inquiryListReducer.getInquiryList.isResultStatus == 2 && !isCompleted) {
                                getInquiryListMore()
                            } else {
                                ToastAndroid.show('已全部加载完毕！', 10)
                            }
                        }}
                        ListEmptyComponent={inquiryListReducer.getInquiryList.isResultStatus != 1 && inquiryList.length == 0 && renderListEmpty}
                        contentContainerStyle={[styles.list]}
                        keyExtractor={(item, index) => index}
                        data={inquiryList}
                        renderItem={param => renderListItem({ ...param, sceneKey })}
                        ListFooterComponent={inquiryListReducer.getInquiryListMore.isResultStatus == 1 ? renderListFooter : <View style={{ height: 15 }} />}
                    />
                </Container>
        )
    }
}

const styles = StyleSheet.create({
    tBarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7.5,
        flexDirection: 'column'
    },
    tBar: {
        flexDirection: 'row',
        padding: 7.5
    },
    tBarItemText: {
        color: 'rgba(255,255,255,0.3)'
    },
    tBarItemActiveText: {
        color: '#fff'
    },
    tBarItemIcon: {
        color: 'rgba(255,255,255,0.3)',
        marginBottom: 5
    },
    tBarItemActiveIcon: {
        color: '#fff'
    },
    searchBar: {
        // height: 45,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end'
        // backgroundColor: '#777'
    },
    list: {
        // padding:7.5
    },
    listItem: {
        // padding:7.5,

    },
    listItemBorderBottom: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#dfdfdf'
    },
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


const mapStateToProps = (state) => {
    return {
        inquiryListReducer: state.inquiryListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getInquiryList: req => {
        dispatch(reduxActions.inquiryList.getInquiryList(req))
    },
    getInquiryListWaiting: () => {
        dispatch(reduxActions.inquiryList.getInquiryListWaiting())
    },
    getCityList: () => {
        dispatch(reduxActions.cityList.getCityList())
    },
    getCityListWaiting: () => {
        dispatch(reduxActions.cityList.getCityListWaiting())
    },
    getInquiryListMore: () => {
        dispatch(reduxActions.inquiryList.getInquiryListMore())

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(InquiryList)




