import React from 'react';
import { View, StyleSheet } from 'react-native';

import FastImage from 'react-native-fast-image';
import MediaViewerHeader from '../headers/MediaViewerHeader';

export default class AutoRotateImageModal extends React.Component {

    render() {
        const { source, style } = this.props;

        return(
            <View style={styles.container}>
                <MediaViewerHeader
                    onRequestClose={this.props.onRequestClose}
                />
                <FastImage
                    source={source}
                    style={style}
                />
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