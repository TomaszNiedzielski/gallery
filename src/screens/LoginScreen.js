import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView, Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../constans/Colors';

import UserIcon from '../components/icons/UserIcon';
import AuthInput from '../components/inputs/AuthInput';
import FormSubmit from '../components/buttons/FormSubmit';
import AuthRedirectButton from '../components/buttons/AuthRedirectButton';
import { ApiUrl } from '../constans/ApiUrl';

export default class LoginScreen extends React.Component {

    state = {
        isKeyboardVisible: false,
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
                            <Text style={styles.title}>LOGIN</Text>
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
                                onPress={this.sendLoginRequest}
                            />
                        </View>
                    </ScrollView>
                    {!isKeyboardVisible && <AuthRedirectButton
                        label="Not a member?"
                        title="Create an account"
                        onPress={() => this.props.navigation.navigate("RegisterScreen")}
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

    sendLoginRequest = () => {
        const { email, password } = this.state;
        fetch(ApiUrl+'login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
        .then((response) => response.json())
        .then(async(responseJson) => {
            console.log('po logowaniu: ', responseJson);
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
        alignItems: 'center',
        marginBottom: 15,
        zIndex: 5
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