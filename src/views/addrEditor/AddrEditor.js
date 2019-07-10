import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { Container, Content, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../style/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import serviceTypeList from '../../config/service_type.json'
import * as routerDirection from '../../util/RouterDirection'
import { connect } from 'react-redux'


const AddrEditor = props => {
    const { sceneKey, sceneName,
        addrEditorReducer: {
            data: {
                order: {
                    service_type, send_address, send_name, send_phone, recv_phone, recv_name, recv_address
                },
                order
            }
        },
        parent
    } = props
    
    const serviceType = new Map(serviceTypeList).get(service_type)
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
                {!send_address && !send_name && !send_phone && <TouchableOpacity
                    style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}
                    onPress={() => {
                        routerDirection.sendAddrEditor(parent)({ preSceneKey: sceneKey, sceneName })
                    }}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>发货信息</Text>
                    </View>
                    <View style={{ marginRight: 7.5 }}>
                        <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                    </View>
                </TouchableOpacity>}
                {!(!send_address && !send_name && !send_phone) && <TouchableOpacity
                    style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}
                    onPress={() => {
                        routerDirection.sendAddrEditor(parent)({ preSceneKey: sceneKey, sceneName })
                    }}>
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
                    <View style={{ marginRight: 7.5 }}>
                        <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                    </View>
                </TouchableOpacity>}
                {!recv_address && !recv_name && !recv_phone && <TouchableOpacity
                    style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}
                    onPress={() => {
                        routerDirection.recAddrEditor(parent)({ preSceneKey: sceneKey, sceneName })
                    }}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>收货信息</Text>
                    </View>
                    <View style={{ marginRight: 7.5 }}>
                        <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                    </View>
                </TouchableOpacity>}
                {!(!recv_address && !recv_name && !recv_phone) && <TouchableOpacity
                    style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom]}
                    onPress={() => {
                        routerDirection.recAddrEditor(parent)({ preSceneKey: sceneKey, sceneName })
                    }}>
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
                    <View style={{ marginRight: 7.5 }}>
                        <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
                    </View>
                </TouchableOpacity>}
            </Content>

        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        addrEditorReducer: state.addrEditorReducer
    }
}

export default connect(mapStateToProps)(AddrEditor)


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