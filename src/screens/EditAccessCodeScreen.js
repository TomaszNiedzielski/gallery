import React from 'react';
import { View, Text, StyleSheet, Image, BackHandler } from 'react-native';

import { Header, Keyboard,  CodeInput, IncorrectCode } from './AccessCodeScreen';
import BlurredBackground from '../assets/BlurredBackground.png';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { createAccessCode } from '../redux/actions/accessCode';

class EditAccessCodeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            confirmCode: '',
            headerTitle: 'Create access code.',
            isConfirmationNow: false,
            incorrectConfirmation: false
        }
    }

    render() {
        const { headerTitle, incorrectConfirmation, code, confirmCode, isConfirmationNow } = this.state;
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
                    code={isConfirmationNow ? confirmCode : code}
                />
                {incorrectConfirmation && <IncorrectCode />}
                <Keyboard
                    onKeyPressHandler={this.onKeyPressHandler}
                    onPressBackspace={this.onPressBackspace}
                />
            </View>
        );
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerShown: false
        });
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentDidUpdate() {
        console.log("new code from redux: ", this.props.accessCode);
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    onKeyPressHandler = key => {
        const { code, confirmCode, isConfirmationNow } = this.state;
        let updatedCode;
        if(isConfirmationNow) {
            updatedCode = confirmCode + key;
            this.setState({ confirmCode: updatedCode });
            if(updatedCode.length === 4) {
                if(code === updatedCode) {
                    // Save new access code.
                    console.log('the same codes', code, '  ', updatedCode);
                    this.props.createAccessCode(code);
                    this.props.navigation.goBack();
                } else {
                    // Incorrect confirmation
                    this.setState({ incorrectConfirmation: true, confirmCode: '' });
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

    onPressBackspace = () => {
        const { isConfirmationNow, confirmCode, code } = this.state;
        if(isConfirmationNow && confirmCode.length > 0) {
            this.setState({ confirmCode: this.state.confirmCode.slice(0, -1) });
        } else if(!isConfirmationNow && code.length > 0) {
            this.setState({ code: this.state.code.slice(0, -1) });
        }
    }

    backAction = () => {
        if(this.state.isConfirmationNow) {
            this.setState({ 
                isConfirmationNow: false,
                headerTitle: 'Create access code.',
                code: '',
                confirmCode: ''
            });
            return () => null;
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
});

const mapStateToProps = (state) => {
    console.log('teraz wegoz: ', state);
    return {
        accessCode: state.accessCode
    }
}

const mapDispatchToprops = () => {
    return { createAccessCode }
}

export default connect(mapStateToProps, mapDispatchToprops())(EditAccessCodeScreen);
