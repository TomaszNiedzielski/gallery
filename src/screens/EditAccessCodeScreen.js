import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { Header, Keyboard,  CodeInput, IncorrectCode } from './AccessCodeScreen';
import BlurredBackground from '../assets/BlurredBackground.png';
import AsyncStorage from '@react-native-community/async-storage';

export default class EditAccessCodeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            confirmedCode: '',
            headerTitle: 'Create access code.',
            isConfirmationNow: false,
            incorrectConfirmation: false
        }
    }

    render() {
        const { headerTitle, incorrectConfirmation, code, confirmedCode, isConfirmationNow } = this.state;
        return(
            <View style={styles.container}>
                <Image
                    source={BlurredBackground}
                    style={styles.background}
                />
                <Header
                    title={headerTitle}
                />
                <CodeInput
                    code={isConfirmationNow ? confirmedCode : code}
                />
                {incorrectConfirmation && <IncorrectCode />}
                <Keyboard
                    onKeyPressHandler={this.onKeyPressHandler}
                />
            </View>
        );
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerShown: false
        });
    }

    onKeyPressHandler = key => {
        const { code, confirmedCode, isConfirmationNow } = this.state;
        let updatedCode;
        if(isConfirmationNow) {
            updatedCode = confirmedCode + key;
            this.setState({ confirmedCode: updatedCode });
            if(updatedCode.length === 4) {
                if(code === updatedCode) {
                    // Save new access code.
                    console.log('the same codes', code, '  ', updatedCode);
                    AsyncStorage.setItem('accessCode', code);
                    this.props.navigation.goBack();
                } else {
                    // Incorrect confirmation
                    this.setState({ incorrectConfirmation: true, confirmedCode: '' });
                    console.log('not the same codes', code, '  ', updatedCode);
                }
            }
        } else {
            updatedCode = code + key;
            this.setState({ code: updatedCode });
        }
        if(updatedCode.length === 4) {
            this.setState({ headerTitle: 'Confirm access code.', isConfirmationNow: true });
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
});