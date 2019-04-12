import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { Container, Content, Spinner } from 'native-base'
import globalStyles ,{styleColor} from '../../style/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import carModal from '../../config/car_modal.json'
import serviceTypeList from '../../config/service_type.json'

const CarListItem = props => {
    const { item: { car_num, plan_total, safe_status, old_car, one_insure_price, one_trans_price, id }, item, i, sceneKey } = props
    const cartype = new Map(carModal).get(item.model_id)
    return (
        <TouchableOpacity
            key={i}
            onPress={() => Actions.inquiryCarInfo({ preSceneKey: sceneKey, inquiryCarId: id })}
            style={[styles.listItemBody, styles.listItemPadding, styles.listItemBorderBottom, { backgroundColor: '#fff' }]}>
            <View style={[{ flex: 1 }]}>
                <View style={[styles.listItemPadding, styles.listItemBody]}>
                    <View>
                        <Text style={[globalStyles.largeText, { fontWeight: 'bold' }]}>{cartype.name ? `${cartype.name}` : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {old_car == 1 && <View style={{ backgroundColor: '#bd417c', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[globalStyles.midText, { color: '#fff' }]}>新</Text>
                        </View>}
                        {safe_status == 1 && <View style={{ backgroundColor: '#47a11d', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                            <Text style={[globalStyles.midText, { color: '#fff' }]}>保</Text>
                        </View>}
                    </View>
                </View>
                <View style={[styles.listItemPadding, styles.listItemBody]}>
                    <Text style={globalStyles.midText}>估值：{plan_total ? `${plan_total}` : ''}元</Text>
                    <Text style={globalStyles.midText}>数量：{car_num ? `${car_num}` : ""}</Text>
                </View>
                <View style={[styles.listItemPadding, styles.listItemBody]}>
                    <Text style={globalStyles.midText}>预计费用</Text>
                    <Text style={globalStyles.midText}><Text style={globalStyles.xlText}>{one_trans_price + one_insure_price}</Text> 元</Text>
                </View>
            </View>
            <View style={styles.listItemPadding}>
                <FontAwesome name='angle-right' style={{ fontSize: 20, paddingLeft: 15 }} />
            </View>
        </TouchableOpacity>
    )
}

const CarList = props => {
    const { list, sceneKey } = props
    return list.map((item, i) => {
        return <CarListItem item={item} key={i} sceneKey={sceneKey} />
    })
}

const InquiryCarList = props => {
    // console.log('props', props)
    const { inquiryCarListReducer: { data: { inquiryCarList }, getInquiryCarList: { isResultStatus } }, inquiry: { ora_trans_price, service_type, ora_insure_price, car_num }
        , sceneKey } = props

    const serviceType = new Map(serviceTypeList).get(service_type)
    if (isResultStatus == 1) {
        return (
            <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container style={{ backgroundColor: '#f4f4f4' }}>
                <Content>
                    <View style={[styles.listItemHeader, styles.listItemBorderBottom]}>
                        <View>
                            <Text style={[globalStyles.midText]}>询价车辆：<Text style={styles.fontColor}>{car_num ? `${car_num}` : ''}</Text></Text>
                        </View>
                        <View>
                            <Text style={[globalStyles.midText]}>{serviceType}</Text>
                        </View>
                    </View>
                    {CarList({ list: inquiryCarList, sceneKey })}
                    <View style={[styles.listItemPadding, styles.listItemBorderBottom]}>
                        <View style={[styles.listItemBody, styles.listItemPadding]}>
                            <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>预计运费</Text>
                            <Text style={globalStyles.midText}><Text style={styles.fontColor}>{ora_trans_price ? `${ora_trans_price}` : ''}</Text> 元</Text>
                        </View>
                        <View style={[styles.listItemBody, styles.listItemPadding]}>
                            <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>预计保费</Text>
                            <Text style={globalStyles.midText}><Text style={styles.fontColor}>{ora_insure_price ? `${ora_insure_price}` : ''}</Text> 元</Text>
                        </View>
                    </View>
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={[globalStyles.largeText, styles.listItemPadding, { fontWeight: 'bold' }]}>预计费用</Text>
                        <Text style={{ paddingHorizontal: 7.5 }}><Text style={[globalStyles.xlText, styles.fontColor]}>{(ora_insure_price + ora_trans_price)}</Text> 元</Text>
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { inquiryListReducer: { data: { inquiryList } } } = state
    const { inquiryId } = ownProps
    return {
        inquiry: inquiryList.find(item => item.id == inquiryId),
        inquiryCarListReducer: state.inquiryCarListReducer
    }
}



export default connect(mapStateToProps)(InquiryCarList)



const styles = StyleSheet.create({
    listItemHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15
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