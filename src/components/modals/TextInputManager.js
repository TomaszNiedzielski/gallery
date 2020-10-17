import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableNativeFeedback} from 'react-native';

export default class TextInputManager extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            placeholder: props.placeholder,
            value: props.value
        }
    }

    render() {
        const { title, placeholder, value } = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder={placeholder}
                        value={value}
                        onChangeText={text => this.setState({ value: text })}

                    />
                    <View style={styles.buttonsWrapper}>
                        <TouchableNativeFeedback>
                            <Text style={styles.button}>Cancel</Text>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={() => this.props.onConfirmHandler(this.state.value)}>
                            <Text style={styles.button}>Confirm</Text>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        width: '85%',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white'
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    textInput: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        fontSize: 18
    },
    buttonsWrapper: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        paddingTop: 10,
        fontSize: 18,
        marginLeft: 30
    }
});