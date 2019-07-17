import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList
} from 'react-native'
import { Container, Spinner, ListItem } from 'native-base'
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
    console.log('props', props)
    return (
        <ListItem onPress={() => { onSelect(item) }}>
            <Text style={globalStyles.midText}>
                {address}
            </Text>
        </ListItem>
    )
}

const CarListForRoute = props => {
    const { onSelect, carListForRouteReducer: { data: { carList }, getCarListForRoute } } = props
    if (getCarListForRoute.isResultStatus == 1) {
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
                    data={carList}
                    ListEmptyComponent={renderListEmpty}
                    renderItem={(param) => renderListItem({ onSelect, ...param })} />
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        carListForRouteReducer: state.carListForRouteReducer
    }
}

export default connect(mapStateToProps)(CarListForRoute)