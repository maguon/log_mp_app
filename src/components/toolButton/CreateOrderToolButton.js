import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { submit } from 'redux-form'
import { connect } from 'react-redux'
import globalStyles from '../../style/GlobalStyles'

const CreateOrderToolButton = props => {

    const { dispatch } = props
    return (
        <TouchableOpacity onPress={() => dispatch(submit('createOrderForm'))}>
            <Text style={[globalStyles.midText, { color: '#fff' }]}>确定</Text>
        </TouchableOpacity>
    )
}

export default connect()(CreateOrderToolButton)