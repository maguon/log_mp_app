import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import { List, ListItem, Content, Container, Spinner } from 'native-base'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../../../style/GlobalStyles'

const renderListEmpty = props => {
    return (
        <View>
            <Text>renderListEmpty</Text>
        </View>
    )
}

const renderListItem = props => {
    const { i, onSelect, item: { cityPY, city_name = '' }, item } = props
    if (cityPY && cityPY.length == 1) {
        return (
            <ListItem key={i} itemDivider>
                <Text>{city_name}</Text>
            </ListItem>
        )
    } else {
        return (
            <ListItem key={i} onPress={() => { onSelect(item) }}>
                <Text>{city_name}</Text>
            </ListItem>
        )
    }

}

const CityList = props => {
    const { cityListReducer: { data: { cityList }, getCityList: { isResultStatus } }, onSelect } = props
    // console.log('props', props)
    // console.log('cityList', cityList)

    const renderList = cityList.map((item, i) => renderListItem({ item, i, onSelect }))
    // console.log('renderList', renderList)
    if (isResultStatus == 1) {
        return (
            <Container style={{justifyContent:'center',alignItems:'center'}}>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>
                <Content>
                    <List>
                        {renderList}
                    </List>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cityListReducer: state.cityListReducer
    }
}

export default connect(mapStateToProps)(CityList) 