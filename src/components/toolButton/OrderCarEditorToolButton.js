import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { submit } from 'redux-form'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'
import globalStyles from '../../style/GlobalStyles'
import AlertModal from '../AlertModal'


class AddOrderCarToolButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false
        }
    }


    render() {
        const { dispatch, orderCarId, orderId } = this.props
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => {
                    this.setState({ modalVisible: true })

                }}>
                    <Text style={[globalStyles.midText, { color: '#fff' }]}>删除</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => { dispatch(submit('orderCarEditorForm')) }}>
                    <Text style={[globalStyles.midText, { color: '#fff' }]}>保存</Text>
                </TouchableOpacity>
                <AlertModal
                    title='确定要删除该信息？'
                    isVisible={this.state.modalVisible}
                    onPressOk={() => { dispatch(reduxActions.orderCarList.delOrderCar({ orderItemId: orderCarId, orderId })) }}
                    onPressCancel={() => { this.setState({ modalVisible: false }) }}
                    onRequestClose={() => { this.setState({ modalVisible: false }) }} />
            </View>
        )
    }
}

export default connect()(AddOrderCarToolButton)