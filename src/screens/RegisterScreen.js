import React from 'react';
import { View, Text, StyleSheet, ScrollView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../constans/Colors';
import { ApiUrl } from '../constans/ApiUrl';

import UserIcon from '../components/icons/UserIcon';
import AuthInput from '../components/inputs/AuthInput';
import FormSubmit from '../components/buttons/FormSubmit';
import AuthRedirectButton from '../components/buttons/AuthRedirectButton';

export default class RegisterScreen extends React.Component {

    state = {
        isKeyboardVisible: false,
        name: null,
        email: null,
        password: null
    }

    render() {
        const { isKeyboardVisible } = this.state;
        return(
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <LinearGradient
                    colors={Colors.gradient}
                    style={styles.container}
                >
                    <ScrollView
                        keyboardShouldPersistTaps='always'
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.content}>
                            <UserIcon style={styles.userIcon} />
                            <Text style={styles.title}>Register</Text>
                            <AuthInput
                                keyboardType="default"
                                placeholder="name"
                                onChangeText={text => this.setState({ name: text })}
                            />
                            <AuthInput
                                keyboardType="email-address"
                                placeholder="e-mail"
                                onChangeText={text => this.setState({ email: text })}
                            />
                            <AuthInput
                                keyboardType="password"
                                placeholder="password"
                                onChangeText={text => this.setState({ password: text })}
                            />
                            <FormSubmit
                                onPress={this.sendRegisterRequest}
                            />
                        </View>
                    </ScrollView>
                    {!isKeyboardVisible && <AuthRedirectButton
                        label="I'm already a member"
                        title="Log in"
                        onPress={() => this.props.navigation.navigate('LoginScreen')}
                    />}
                </LinearGradient>
            </TouchableWithoutFeedback>
        );
    }

    componentDidMount() {
        this.props.navigation.setOptions({ headerShown: false });

        // need this to hide bottom component when keyboad show
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this.setState({ isKeyboardVisible: true }));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.setState({ isKeyboardVisible: false }));
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    sendRegisterRequest = () => {
        const { name, email, password } = this.state;
        console.log('apiurl: ', ApiUrl+'register');
        fetch(ApiUrl+'register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                password_confirmation: password
            }),
        })
        .then((response) => response.json())
        .then(async(responseJson) => {
            console.log('po rejestrcja: ', responseJson);
            const userData = {
                id: responseJson.user.id,
                name: responseJson.user.name,
                email: responseJson.user.email,
                token: responseJson.token
            };

            // save to storage
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            this.props.navigation.navigate('LoadingScreen');
        })
        .catch((error) => {
            console.log('error: ', error);
            Alert.alert(
                'Error',
                'Sprawdź czy masz połączenie z internetem.',
            );
            throw(error);
        });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    content: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 15
    },
    userIcon: {
        marginTop: 20
    },
    title: {
        color: 'white',
        fontSize: 22,
        marginVertical: 15
    }
});