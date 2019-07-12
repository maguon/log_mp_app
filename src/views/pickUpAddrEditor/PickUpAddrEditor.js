import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    InteractionManager
} from 'react-native'
import { Container, Content, Icon } from 'native-base'
import globalStyles from '../../style/GlobalStyles'
import serviceTypeList from '../../config/service_type.json'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as reduxActions from '../../reduxActions'
import { Actions } from 'react-native-router-flux'
import ModalWaiting from '../../components/ModalWaiting'

const PickUpAddr = props => {
    let { input: { onChange, value, ...restProps },
        label = '',
        city = '',
        cityIcon,
        onPress } = props
    return (
        <TouchableOpacity style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}
            onPress={() => onPress({ onChange })}>
            <View style={[styles.listItemPadding, { alignSelf: 'flex-start' }]}>
                {cityIcon}
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ paddingLeft: 7.5, paddingTop: 7.5, paddingBottom: 5 }}>
                    <Text style={[globalStyles.xlText, { fontWeight: 'bold' }]}>{city}</Text>
                </View>
                <View style={{ paddingLeft: 7.5, paddingBottom: 5 }}>
                    <Text style={globalStyles.midText}>{label}{value.value}</Text>
                </View>
            </View>
            <View style={{ marginRight: 7.5 }}>
                <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
            </View>
        </TouchableOpacity>
    )
}


const PickUpAddrEditor = props => {
    const { pickUpAddrEditorReducer: {
        data: {
            order: {
                service_type, send_address, send_name, send_phone, recv_phone, recv_name,
                recv_address, start_city, start_id, end_city, end_id, id }
        } ,
        savePickUpAddr:{isResultStatus}},
        getPickUpAddrListWaiting,
        getPickUpAddrList,
        sceneKey } = props
    const serviceType = new Map(serviceTypeList).get(service_type)
    // console.log('props', props)
    return (
        <Container>
            <Content>
                <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>服务方式</Text>
                    </View>
                    <View style={{ marginRight: 7.5 }}>
                        <Text style={globalStyles.midText}>{serviceType ? `${serviceType}` : ''}</Text>
                    </View>
                </View>
                {service_type == 2 && <Field
                    name='sendAddressPoint'
                    label='发货地址：'
                    city={`发货城市：${start_city ? start_city : ''}`}
                    cityIcon={<Icon name='ios-pin' style={{ color: '#ed2162' }} />}
                    component={PickUpAddr}
                    onPress={({ onChange }) => {
                        getPickUpAddrListWaiting()
                        Actions.pickUpAddrList({
                            onSelect: (param) => {
                                const { city_id, address } = param
                                onChange({ id: city_id, value: address, item: param })
                                Actions.popTo(sceneKey)
                            },
                            preSceneKey: sceneKey
                        })
                        InteractionManager.runAfterInteractions(() => getPickUpAddrList({ cityId: start_id }))
                    }}
                />}

                {service_type == 2 && <Field
                    name='recvAddressPoint'
                    label='收货地址：'
                    city={`收货城市：${end_city ? end_city : ''}`}
                    cityIcon={<Icon name='ios-pin' style={{ color: '#f5a531' }} />}
                    component={PickUpAddr}
                    onPress={({ onChange }) => {
                        getPickUpAddrListWaiting()
                        Actions.pickUpAddrList({
                            onSelect: (param) => {
                                const { city_id, address } = param
                                onChange({ id: city_id, value: address, item: param })
                                Actions.popTo(sceneKey)
                            },
                            preSceneKey: sceneKey
                        })
                        InteractionManager.runAfterInteractions(() => getPickUpAddrList({ cityId: end_id }))
                    }}
                />}

                {!send_address && !send_name && !send_phone && <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>发货信息</Text>
                    </View>
                </View>}
                {!recv_address && !recv_name && !recv_phone && <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>收货信息</Text>
                    </View>
                </View>}
                {!(!send_address && !send_name && !send_phone) && <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <View style={[styles.listItemPadding, { alignSelf: 'flex-start' }]}>
                        <Icon name='ios-person' style={{ color: '#ed2162' }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ paddingLeft: 7.5, paddingTop: 7.5, paddingBottom: 5 }}>
                            <Text style={[globalStyles.xlText, { fontWeight: 'bold' }]}>发货人：{send_name ? `${send_name}` : ''}</Text>
                        </View>
                        <View style={{ paddingLeft: 7.5, paddingBottom: 5 }}>
                            <Text style={globalStyles.midText}>电话：{send_phone ? `${send_phone}` : ''}</Text>
                        </View>
                        <View style={{ paddingLeft: 7.5, paddingBottom: 7.5 }}>
                            <Text style={globalStyles.midText}>地址：{send_address ? `${send_address}` : ''}</Text>
                        </View>
                    </View>
                </View>}
                {!(!recv_address && !recv_name && !recv_phone) && <View style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}>
                    <View style={[styles.listItemPadding, { alignSelf: 'flex-start' }]}>
                        <Icon name='ios-person' style={{ color: '#f5a531' }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ paddingLeft: 7.5, paddingTop: 7.5, paddingBottom: 5 }}>
                            <Text style={[globalStyles.xlText, { fontWeight: 'bold' }]}>收货人：{recv_name ? `${recv_name}` : ''}</Text>
                        </View>
                        <View style={{ paddingLeft: 7.5, paddingBottom: 5 }}>
                            <Text style={globalStyles.midText}>电话：{recv_phone ? `${recv_phone}` : ''}</Text>
                        </View>
                        <View style={{ paddingLeft: 7.5, paddingBottom: 7.5 }}>
                            <Text style={globalStyles.midText}>地址：{recv_address ? `${recv_address}` : ''}</Text>
                        </View>
                    </View>
                </View>}
            </Content>
            <ModalWaiting visible={isResultStatus == 1} title={'提交中...'} />
        </Container>
    )
}

const styles = StyleSheet.create({
    listItemHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#fff',
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
    }
})


const mapStateToProps = (state) => {
    const { pickUpAddrEditorReducer: { data: { order } } } = state
    return {
        initialValues: {
            sendAddressPoint: {
                id: order.send_address_point_id,
                value: order.send_address_point
            },
            recvAddressPoint: {
                id: order.recv_address_point_id,
                value: order.recv_address_point
            }
        },
        pickUpAddrEditorReducer: state.pickUpAddrEditorReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getPickUpAddrList: req => {
        dispatch(reduxActions.pickUpAddrList.getPickUpAddrList(req))
    },
    getPickUpAddrListWaiting: () => {
        dispatch(reduxActions.pickUpAddrList.getPickUpAddrListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'pickUpAddrEditorForm',
    onSubmit: (values, dispatch, props) => {
        dispatch(reduxActions.pickUpAddrEditor.savePickUpAddr({ values }))
    }
})(PickUpAddrEditor))