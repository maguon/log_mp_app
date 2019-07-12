import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { submit } from 'redux-form'
import { connect } from 'react-redux'
import globalStyles from '../../style/GlobalStyles'
import { View } from 'react-native'


const PickUpAddrEditorToolButton = props => {
    const { dispatch, pickUpAddrEditorReducer: { data: { order: { service_type } } } } = props
    if (service_type == 2) {
        return (
            <TouchableOpacity onPress={() => {
                dispatch(submit('pickUpAddrEditorForm'))
            }}>
                <Text style={[globalStyles.midText, { color: '#fff' }]}>保存</Text>
            </TouchableOpacity>
        )
    } else {
        return <View />
    }

}


const mapStateToProps = (state) => {
    return {
        pickUpAddrEditorReducer: state.pickUpAddrEditorReducer
    }
}

export default connect(mapStateToProps)(PickUpAddrEditorToolButton)