import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { submit } from 'redux-form'
import { connect } from 'react-redux'
import globalStyles from '../../style/GlobalStyles'

const OrderNotInfoRemarkEditorToolButton = props => {
    const { dispatch } = props
    return (
        <TouchableOpacity onPress={() => {
            dispatch(submit('orderNIRemarkForm'))
        }}>
            <Text style={[globalStyles.midText, { color: '#fff' }]}>保存</Text>
        </TouchableOpacity>
    )
}

export default connect()(OrderNotInfoRemarkEditorToolButton)