import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors } from '../../constans/Colors';

export default class AuthInput extends React.Component {

    render() {
        const { keyboardType, placeholder } = this.props;
        return(
            <View style={styles.container}>
                <View style={styles.iconWrapper}>
                    {keyboardType === 'default' && <Icon name="user-alt" size={20} color={Colors.primary} />}
                    {keyboardType === 'email-address' && <Ionicons name="mail" size={20} color={Colors.primary} />}
                    {keyboardType === 'password' && <Icon name="lock" size={20} color={Colors.primary} />}
                </View>
                <TextInput
                    style={styles.input}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 15,
        height: 50
    },
    input: {
        backgroundColor: 'white',
        width: '75%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    iconWrapper: {
        backgroundColor: 'white',
        width: 40,
        marginRight: 5,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});