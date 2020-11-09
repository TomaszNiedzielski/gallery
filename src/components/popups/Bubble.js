import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constans/Colors';
import { useSelector } from 'react-redux'

const Bubble = () => {
    const folders = useSelector(state => state.folders);
    return(
        folders.length > 0 ? null
        : <View style={[styles.container, ]}>
            <View style={styles.triangle} />
            <Text style={styles.text}>Click to add photos.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // width: 140,
        position: 'absolute',
        backgroundColor: Colors.primary,
        zIndex: 100,
        top: 5,
        right: 2,
        // borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 20,
        padding: 13,
        elevation: 30
    },
    triangle: {
        backgroundColor: Colors.primary,
        height: 20,
        width: 20,
        transform: [{ rotate: '45deg' }],
        zIndex: 99,
        // borderTopWidth: 2,
        // borderLeftWidth: 2,
        borderColor: Colors.primary,
        position: 'absolute',
        top: -10,
        right: 22,
        borderTopLeftRadius: 4
        // elevation: 30
    },
    text: {
        fontSize: 11,
        fontWeight: 'bold',
        color: 'white'
    }
});

export default Bubble;