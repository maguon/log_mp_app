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


const renderListItem = props => {
    const { item: { route_end, route_end_id, route_start, route_start_id, distance }, item, routeStartId, index, onSelect } = props
    return (
        <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => {
                if (route_end_id == routeStartId) {
                    onSelect({ id: route_start_id, value: route_start, item })
                } else {
                    onSelect({ id: route_end_id, value: route_end, item })
                }
            }}>
            {(route_end_id == routeStartId) ? <Text style={globalStyles.midText}>{route_start ? `${route_start}` : ''}</Text> : <Text style={globalStyles.midText}>{route_end ? `${route_end}` : ''}</Text>}

            <Text style={globalStyles.midText}>{distance} km</Text>
        </TouchableOpacity>
    )
}

const SelectDriver = props => {
    const { onSelect, routeStartId,
        routeCityListReducer: { data: { routeCityList }, getRouteCityList } } = props
    if (getRouteCityList.isResultStatus == 1) {
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
                    data={routeCityList}
                    renderItem={(param) => renderListItem({ onSelect, routeStartId, ...param })} />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        marginHorizontal: 15,
        paddingVertical: 10,
        borderColor: '#ddd',
        borderBottomWidth: 0.3,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

const mapStateToProps = (state) => {
    return {
        routeCityListReducer: state.routeCityListReducer
    }
}

export default connect(mapStateToProps)(SelectDriver)