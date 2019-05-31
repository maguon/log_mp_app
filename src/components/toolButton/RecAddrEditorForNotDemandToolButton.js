import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { submit } from 'redux-form'
import { connect } from 'react-redux'
import globalStyles from '../../style/GlobalStyles'

const recAddrEditorForNotDemandToolButton = props => {
    const { dispatch } = props
    return (
        <TouchableOpacity onPress={() => dispatch(submit('recAddrForNDForm'))}>
            <Text style={[globalStyles.midText, { color: '#fff' }]}>保存</Text>
        </TouchableOpacity>
    )
}

export default connect()(recAddrEditorForNotDemandToolButton)