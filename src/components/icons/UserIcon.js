import React from 'react';
import { View, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

const UserIcon = props => {
    return(
        <View style={[styles.container, props.style]}>
            <Icon name="user-alt" size={50} color="white" style={styles.icon} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 5,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        width: 100,
        height: 100,
    },
    icon: {
        top: -5
    }
});

export default UserIcon;