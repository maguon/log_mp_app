import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    FlatList
} from 'react-native'
import { Container, Content, Icon, Spinner, ListItem } from 'native-base'
import globalStyles, { styleColor } from '../../../style/GlobalStyles'
import { connect } from 'react-redux'

const renderListEmpty = props => {
    return (
        <View>
            <Text>暂无地址</Text>
        </View>
    )
}

const renderListItem = props => {
    const { item: { address }, item, onSelect } = props
    return (
        <ListItem onPress={() => { onSelect(item) }}>
            <Text style={globalStyles.midText}>
                {address}
            </Text>
        </ListItem>
    )
}

const PickUpAddrList = props => {
    const { onSelect, pickUpAddrListReducer: { data: { pickUpAddrList }, getPickUpAddrList } } = props
    if (getPickUpAddrList.isResultStatus == 1) {
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
                    keyExtractor={(item, index) => index}
                    data={pickUpAddrList}
                    ListEmptyComponent={renderListEmpty}
                    renderItem={(param) => renderListItem({ onSelect, ...param })} />
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        pickUpAddrListReducer: state.pickUpAddrListReducer
    }
}

export default connect(mapStateToProps)(PickUpAddrList)