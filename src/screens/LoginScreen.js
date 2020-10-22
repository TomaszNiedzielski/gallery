import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView, Keyboard } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../constans/Colors';

import UserIcon from '../components/icons/UserIcon';
import AuthInput from '../components/inputs/AuthInput';
import FormSubmit from '../components/buttons/FormSubmit';
import AuthRedirectButton from '../components/buttons/AuthRedirectButton';

export default class LoginScreen extends React.Component {

    state = {
        isKeyboardVisible: false
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
                            />
                            <AuthInput
                                keyboardType="password"
                                placeholder="password"
                            />
                            <FormSubmit />
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