import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import { Icon } from 'native-base'
import globalStyles from '../../style/GlobalStyles'

const { width } = Dimensions.get('window')
const margin = 15

const CheckBox = props => {
    const { input: { onChange, value, },label = ''} = props
    return (
        <View style={[styles.body, styles.inputContainer]} >
            <TouchableOpacity onPress={()=>{
                onChange(!value)
            }}>
                <Icon style={{ color: value  ? 'green' : '#777' }} name='ios-checkmark-circle' />
            </TouchableOpacity >
            <Text style={[globalStyles.midText, { marginLeft: 5 }]}>{label}</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    body: {
        borderColor: '#ddd',
        marginLeft: margin,
        paddingRight: margin
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        textAlignVertical: 'center',
        textAlign: 'right',
        flex: 1,
        marginTop: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 0
    },
    label: {
        marginVertical: margin
    },
    labelError: {
        marginTop: margin,
        marginBottom: 0
    },
    warnColor: {
        color: 'red'
    },
    errView: {
        marginBottom: margin
    }
})

export default CheckBox