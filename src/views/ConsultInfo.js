import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import { Container, Content } from 'native-base'
import globalStyles from '../style/GlobalStyles'

const ConsultInfo = props => {
    const { inquiry: { total_insure_price, total_trans_price } } = props
    return (
        <Container>
            <Content>
                <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>协商运费</Text>
                    </View>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}><Text style={styles.fontColor}>{total_trans_price ? `${total_trans_price}` : '0'}</Text>  元</Text>
                    </View>
                </View>
                <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>协商保费</Text>
                    </View>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}><Text style={styles.fontColor}>{total_insure_price ? `${total_insure_price}` : '0'}</Text>  元</Text>
                    </View>
                </View>
                <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}>协商费用</Text>
                    </View>
                    <View style={styles.listItemPadding}>
                        <Text style={globalStyles.midText}><Text style={styles.fontColor}>{`${(total_insure_price + total_trans_price)}`}</Text>  元</Text>
                    </View>
                </View>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    listItemPadding: {
        padding: 7.5
    },
    listItemBorderBottom: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#dfdfdf'
    },
    listItemBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    fontColor: {
        color: '#bd417c'
    }
})

export default ConsultInfo