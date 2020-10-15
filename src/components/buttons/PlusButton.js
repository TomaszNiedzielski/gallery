import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';

const PlusButton = props => {
    return(
        <View style={styles.container}>
            <TouchableNativeFeedback onPress={props.onPressHandler}>
                <Text style={styles.plus}>+</Text>
            </TouchableNativeFeedback>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        margin: 15
    },
    plus: {
        fontSize: 35,
        padding: 15
    }
});
export default PlusButton;