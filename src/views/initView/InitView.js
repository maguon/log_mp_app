import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'
import * as reduxActionTypes from '../../reduxActionTypes'
import {
    Linking,
    ImageBackground,
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar
} from 'react-native'
import { Button } from 'native-base'

const window = Dimensions.get('window')
const ImageWidth = window.width
const ImageHeight = window.height

class InitView extends Component {
    constructor(props) {
        super(props)
        this.linkDownload = this.linkDownload.bind(this)
    }

    componentDidMount() {
        this.props.start()
    }

    linkDownload(url) {
        if (url) {
            Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                    console.log('Can\'t handle url: ' + url)
                } else {
                    return Linking.openURL(url)
                }
            }).catch(err => console.log('An error occurred', err))
        }
    }

    render() {
        const { initViewReducer: { data, initAPP } } = this.props
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <ImageBackground source={{ uri: 'init_back' }} style={styles.image}>
                    {/* {initAPP.isResultStatus == 1 && <Spinkit type={'Wave'}
                        color='rgba(255,255,255,0.5)'
                        size={70}
                        style={{ marginBottom: 50, alignSelf: 'center' }}
                        isVisible={initAPP.isResultStatus == 1} />} */}
                    {((initAPP.isResultStatus == 4 || initAPP.isResultStatus == 3) && initAPP.currentStep == 2) &&
                        <Button block onPress={() => this.props.validateVersion(data)} style={styles.button}>
                            <Text style={styles.buttonTiltle}>重新获取版本号</Text>
                        </Button>}
                    {((initAPP.isResultStatus == 2) && data.version.force_update == 1) &&
                        <Button block onPress={() => this.linkDownload(data.version.url)} style={styles.button}>
                            <Text style={styles.buttonTiltle}>立即更新</Text>
                        </Button>}
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: ImageWidth,
        height: ImageHeight,
        justifyContent: "flex-end"
    },
    buttonTiltle: {
        fontSize: 18,
        color: 'rgba(0,0,0,0.4)'
    },
    button: {
        marginBottom: 30,
        width: window.width / 4 * 3,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 25,
        alignSelf: 'center'
    }
})

const mapStateToProps = (state) => {
    return {
        initViewReducer: state.initViewReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    validateVersion: param => {
        // dispatch({ type: reduxActionTypes.initView.init_app_waiting })
        dispatch(reduxActions.initView.validateVersion(param))
    },
    loadUniqueID: () => {
        dispatch(reduxActions.initView.loadUniqueID())
    },
    start: () => {
        dispatch(reduxActions.initView.start())

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(InitView)