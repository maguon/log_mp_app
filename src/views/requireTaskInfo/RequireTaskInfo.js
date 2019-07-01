import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Content,Button } from 'native-base'
import globalStyles from '../../style/GlobalStyles'

const RequireTaskInfo = props => {
    console.log('props', props)
    const { requireTaskInfoReducer: { data: { requireTaskInfo } } } = props
    console.log('requireTaskInfo', requireTaskInfo)

    return (
        <Container>
            <Content>
                <View style={[styles.listItemHeader,styles.listItemBorderBottom]}>
                    <Text style={[globalStyles.midText]}>订单编号：344444444444</Text>
                    <Text style={[globalStyles.midText]}>2018-06-26 18:34:15</Text>
                </View>
                <View>

                </View>
                <View>
                    <Text>需求生成时间：2018-06-26 18:34:15</Text>
                </View>
                <View>
                    <View>
                        <Text>收发货信息</Text>
                    </View>
                    <View>
                        <Text>当地自提</Text>
                    </View>
                </View>
                <View>
                    <View>
                        <Text>运送车辆</Text>
                    </View>
                    <View>
                        <Text>2</Text>
                    </View>
                </View>
                <View>
                    <View>
                        <Text>路线安排</Text>
                    </View>
                    <View>
                        <Text>3</Text>
                    </View>
                </View>
                <View>
                    <Text>总费用</Text>
                    <Text>2600.00元</Text>
                </View>
                <View>
                    <Text>用户备注</Text>
                    <Text>用户备注用户备注用户备注用户备注</Text>
                </View>
                <View>
                    <Text>客户备注</Text>
                    <Text>客户备注客户备注客户备注客户备注</Text>
                </View>
                <Button full transparent onPress={()=>{}}>
                    <Text>取消需求</Text>
                </Button>
            </Content>
        </Container>
    )
}


const mapStateToProps = (state, ownProps) => {
    return {
        requireTaskInfoReducer: state.requireTaskInfoReducer
    }
}

export default connect(mapStateToProps)(RequireTaskInfo)

const styles = StyleSheet.create({
    listItemHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
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