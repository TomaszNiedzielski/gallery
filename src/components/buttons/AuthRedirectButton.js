import React from 'react';
import { View, TouchableNativeFeedback, Text, StyleSheet } from 'react-native';
const AuthRedirectButton = props => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{props.label}</Text>
            <TouchableNativeFeedback onPress={() => props.onPress()}>
                <Text style={styles.button}>{props.title}</Text>
            </TouchableNativeFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 15,
        zIndex: 0
    },
    button: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 5,
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginTop: 8
    },
    title: {
        color: 'white'
    }
});

export default AuthRedirectButton;