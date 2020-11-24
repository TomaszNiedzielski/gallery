import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import FastImage from 'react-native-fast-image';

export default class AutoRotateImageModal extends React.Component {
    render() {
        const { source, style } = this.props;
        return(
            <View style={styles.container}>
                <TouchableWithoutFeedback>
                    <FastImage
                        source={source}
                        style={style}
                    />
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
});