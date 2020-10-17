import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

export default class CheckBox extends React.Component {

    state = {
        value: this.props.value,
        visible: this.props.visible
    }

    render() {
        const { value, visible } = this.state;
        if(visible) {
            return(
                <TouchableNativeFeedback onPress={() => this.setState({ value: !value })}>
                    <View style={styles.container}>
                        {value && <Icon name="check" size={22} />}
                    </View>
                </TouchableNativeFeedback>
            );
        } else {
            return null
        }
        
    }

    componentDidUpdate() {
        if(this.state.visible !== this.props.visible) {
            this.setState({ visible: this.props.visible });
        }
    }

}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1,
        left: 10,
        top: 10,
        backgroundColor: 'white',
        height: 22,
        width: 22,
        borderRadius: 3
    }
});