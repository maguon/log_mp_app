import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { submit } from 'redux-form'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'
import globalStyles from '../../style/GlobalStyles'

const AddOrderCarToolButton = props => {
    const { dispatch, orderCarId } = props
    // console.log('props', props)
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => { dispatch(reduxActions.orderCarList.delOrderCar({ orderItemId: orderCarId })) }}>
                <Text style={[globalStyles.midText, { color: '#fff' }]}>删除</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => { dispatch(submit('orderCarEditorForm')) }}>
                <Text style={[globalStyles.midText, { color: '#fff' }]}>保存</Text>
            </TouchableOpacity>
        </View>
    )
}

export default connect()(AddOrderCarToolButton)