import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Bubble = () => {
    return(
        <View style={styles.container}>
            <View style={styles.triangle} />
            <Text style={styles.text}>Click to add photos.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // width: 140,
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: 100,
        top: 2,
        right: 2,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 20,
        padding: 10,
    },
    triangle: {
        backgroundColor: 'white',
        height: 20,
        width: 20,
        transform: [{ rotate: '45deg' }],
        zIndex: 99,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderColor: '#ccc',
        position: 'absolute',
        top: -11,
        right: 22
    },
    text: {
        fontSize: 13,
        fontWeight: 'bold'
    }
});

export default Bubble;