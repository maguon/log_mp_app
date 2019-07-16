import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Input, Label, Icon, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../../style/GlobalStyles'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { Actions } from 'react-native-router-flux'

const renderListItem = props => {
    const { item: { supplier_short }, item, onSelect } = props
    return (
        <TouchableOpacity
            style={styles.item}
            onPress={() => {
                onSelect(item)
                // Actions.pop()
            }}>
            <Text style={globalStyles.midText}>{supplier_short ? `${supplier_short}` : ''}</Text>
        </TouchableOpacity>
    )
}

const SupplierList = props => {
    const { onSelect, supplierListReducer: { data: { supplierList }, getSupplierList } } = props
    console.log('getSupplierList', getSupplierList)
    if (getSupplierList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    }
    else {
        return (
            <Container>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={supplierList}
                    renderItem={(param) => renderListItem({ onSelect, ...param })} />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        marginHorizontal: 15,
        paddingVertical: 15,
        borderColor: '#ddd',
        borderBottomWidth: 0.3,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

const mapStateToProps = (state) => {
    return {
        supplierListReducer: state.supplierListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SupplierList)