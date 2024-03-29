import React from 'react';
import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';

import BlurredBackground from '../assets/BlurredBackground.png';

import Icon from 'react-native-vector-icons/Ionicons';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export const Header = ({ title }) => (
    <Text style={styles.headerTitle}>{title}</Text>
)

export const CodeInput = ({ code }) => (
    <View style={styles.codeInputContainer}>
        <Text style={styles.codeInputItem}>{code.charAt(0) ? '*' : ''}</Text>
        <Text style={styles.codeInputItem}>{code.charAt(1) ? '*' : ''}</Text>
        <Text style={styles.codeInputItem}>{code.charAt(2) ? '*' : ''}</Text>
        <Text style={styles.codeInputItem}>{code.charAt(3) ? '*' : ''}</Text>
    </View>
)

export const IncorrectCode = () => (
    <Text style={styles.incorrectCode}>Incorrect code! Try again.</Text>
)

export const Keyboard = ({ onKeyPressHandler, onPressBackspace }) => (
    <View style={styles.keyboardContainer}>
        <View style={styles.keyboard}>
            {KEYS.map((key) => (
                <TouchableNativeFeedback
                    key={key}
                    onPress={() => onKeyPressHandler(key)}
                >
                    <View style={styles.keyContainer}>
                        <Text style={styles.keyNumber}>{key}</Text>
                    </View>
                </TouchableNativeFeedback>
            ))}
            <TouchableNativeFeedback onPress={() => onPressBackspace()}>
                <View style={[styles.keyContainer, { backgroundColor: 'rgba(0, 0, 0, 0)' }]}>
                    <Icon name="backspace" color="white" size={50} />
                </View>
            </TouchableNativeFeedback>
        </View>
    </View>
)

export default class AccessCodeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            savedAccessCode: props.route.params.accessCode,
            isCodeIncorrect: false
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Image
                    source={BlurredBackground}
                    style={styles.background}
                />
                <Header
                    title='Type access code'
                />
                <CodeInput
                    code={this.state.code}
                />
                {this.state.isCodeIncorrect && <IncorrectCode />}
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
    }

    onKeyPressHandler = key => {
        const { code, savedAccessCode } = this.state;
        const updatedCode = code + key;
        this.setState({ code: code === null ? key : updatedCode });
        if(updatedCode.length === 4) {
            this.setState({ code: '' });
            if(updatedCode === savedAccessCode) {
                this.props.navigation.replace('HomeScreen');
            } else {
                this.setState({ isCodeIncorrect: true });
            }
        }
    }

    onPressBackspace = () => {
        this.setState({ code: this.state.code.slice(0, -1) });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    keyboardContainer: {
        position: 'absolute',
        bottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyboard: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        width: 300
    },
    keyContainer: {
        width: 80,
        height: 80,
        backgroundColor: '#987fe3',
        alignItems: 'center',
        borderRadius: 50,
        margin: 10,
        justifyContent: 'center'
    },
    keyNumber: {
        fontSize: 40,
        color: 'white'
    },
    codeInputContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: 100
    },
    codeInputItem: {
        width: 20,
        height: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 15,
        marginHorizontal: 3,
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    incorrectCode: {
        color: 'red',
        position: 'absolute'
    },
    headerTitle: {
        fontSize: 16,
        color: 'white',
        padding: 10,
        marginTop: 50,
        marginBottom: 5,
        position: 'absolute'
    }
});