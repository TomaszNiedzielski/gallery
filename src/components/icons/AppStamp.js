import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constans/Colors';

const AppStamp = () => {
    return(
        <View style={styles.container}>
            <Text style={[styles.header, styles.shadowStyle]}>Fuzja</Text>
            <Text style={[styles.text, styles.shadowStyle]}>Gallery app for couples.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        position: 'absolute'
    },
    header: {
        fontSize: 40,
        marginTop: 150,
        fontFamily: 'Chewy-Regular'
    },
    text: {
        fontSize: 16,
    },
    shadowStyle: {
        color: Colors.primary,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    },
    box: {
        backgroundColor: Colors.primary
    }
});

export default AppStamp;