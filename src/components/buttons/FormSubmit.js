import React from 'react';
import { TouchableNativeFeedback, Text, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../constans/Colors';

const FormSubmit = props => {
    // const navigation = useNavigation();
    return(
        <TouchableNativeFeedback onPress={() => props.onPress()}>
            <View style={styles.button}>
                <Text style={styles.title}>Submit</Text>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: 'white',
        width: '70%',
        borderRadius: 30,
        marginTop: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        color: Colors.primary
    }
});

export default FormSubmit;