import React, { Component } from 'react'
import { View, Image, Dimensions, StatusBar, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { Button, Icon, Item, Text, Input, Container } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../style/GlobalStyles'
import { Field, reduxForm } from 'redux-form'
import * as reduxActions from '../../reduxActions'
import * as android_app from '../../config/android_app.json'

const window = Dimensions.get('window')

const TextBox = props => {
    const { iconName, placeholderText, input: { onChange, ...restProps }, secureTextEntry = false } = props

    return (
        <Item rounded style={styles.item}>
            <Icon active name={iconName} style={styles.itemIcon} />
            <Input placeholder={placeholderText}
                placeholderTextColor='rgba(255,255,255,0.4)'
                selectionColor='rgba(255,255,255,0.4)'
                style={[globalStyles.largeText, styles.input]}
                onChangeText={onChange}
                secureTextEntry={secureTextEntry}
                {...restProps} />
        </Item>
    )
}

class Login extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { handleSubmit, initViewReducer: { data: { version: { force_update, url } } } } = this.props
        return (
            <Container style={styles.container}>
                <StatusBar hidden={true} />
                <ImageBackground
                    source={{ uri: 'login_back' }}
                    style={styles.backgroundImage} >
                    <View style={{ paddingTop: 80 }}>
                        <View style={styles.logoContainer}>
                            <Image
                                source={{ uri: 'logo' }}
                                style={styles.logo} />
                        </View>
                        <View>
                            <Image
                                source={{ uri: 'app_name' }}
                                style={styles.appname} />
                        </View>
                    </View>
                    <Text style={[globalStyles.smallText, { color: 'rgba(255,255,255,0.1)', position: 'absolute', top: 5, right: 5 }]}>{android_app.version}</Text>
                    {force_update != 1 && <View style={styles.formContainer}>
                        <Field
                            name='userName'
                            iconName='md-person'
                            placeholderText='请输入用户名'
                            component={TextBox} />
                        <Field
                            name='password'
                            secureTextEntry={true}
                            iconName='md-lock'
                            placeholderText='请输入密码'
                            component={TextBox} />
                        <Button style={[styles.itemButton, { backgroundColor: '#672c7b' }]}
                            onPress={handleSubmit}>
                            <Text style={[globalStyles.midText, styles.buttonTittle]}>登录</Text>
                        </Button>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                            <TouchableOpacity style={styles.linkButton} onPress={() => Actions.retrievePassword()}>
                                <Text style={[globalStyles.midText, styles.linkButtonTittle]}>忘记密码</Text>
                            </TouchableOpacity>
                        </View>

                    </View>}
                </ImageBackground>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        width: window.width,
        height: window.width / 9 * 16,
        alignItems: 'center'
    },
    item: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        width: window.width / 4 * 3,
        borderWidth: 0,
        marginTop: 20
    },
    itemIcon: {
        color: 'rgba(255,255,255,0.7)',
        marginLeft: 10
    },
    itemButton: {
        marginTop: 50,
        width: window.width / 4 * 3,
        borderRadius: 25,
        justifyContent: 'center'
    },
    input: {
        color: 'rgba(255,255,255,0.7)'
    },
    buttonTittle: {
        color: '#fff'
    },
    linkButton: {
        alignSelf: 'flex-end',
        paddingTop: 10,
        paddingRight: 10
    },
    linkButtonTittle: {
        color: 'rgba(255,255,255,0.5)'
    },
    logoContainer: {
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,1)',
        borderColor: 'rgba(255,255,255,0.5)',
        borderWidth: 20,
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 80,
        height: 80
    },
    appname: {
        width: 136,
        height: 32,
        marginTop: 20
    },
    formContainer: {
        marginTop: 30
    }
})


const mapStateToProps = (state) => {
    return {
        initialValues: {
            // mobile: state.loginReducer.data.user.mobile,
            // server: state.communicationSettingReducer.data.host
        },
        initViewReducer: state.initViewReducer
    }
}

export default connect(mapStateToProps)(
    reduxForm({
        form: 'loginForm',
        destroyOnUnmount: false,
        enableReinitialize: true,
        onSubmit: (values, dispatch) => {
            dispatch(reduxActions.login.login(values))
        }
    })(Login))
