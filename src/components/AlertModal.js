import React, { Component } from 'react'
import { Text, View, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import globalStyles, { styleColor } from '../style/GlobalStyles'

const ConfirmModal = ({ onPressOk, onPressCancel, isVisible, title, onRequestClose }) => {
    return (
        <Modal
            animationType='fade'
            transparent
            visible={isVisible}
            onRequestClose={onRequestClose}
        >
            <View style={styles.modalStyle}>
                <View style={[styles.subView]}>
                    <Text style={[globalStyles.midText, styles.titleText]}>
                        {title}
                    </Text>
                    <View style={styles.horizontalLine} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity
                            style={{ padding: 10 }}
                            onPress={onPressCancel}>
                            <Text style={[globalStyles.midText, styles.buttonText]}>取消 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ padding: 10 }}
                            onPress={onPressOk}>
                            <Text style={[globalStyles.midText, styles.buttonText]}>确定</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

var styles = StyleSheet.create({
    // modal的样式  
    modalStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    // modal上子View的样式  
    subView: {
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        marginHorizontal: 30,
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 5
    },
    // 标题  
    titleText: {
        padding: 15,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // 水平的分割线  
    horizontalLine: {
        marginTop: 5,
        height: 0.5,
        backgroundColor: '#ccc',
    },
    buttonText: {
        fontSize: 16,
        color: styleColor,
        textAlign: 'center'
    },
})

export default ConfirmModal
