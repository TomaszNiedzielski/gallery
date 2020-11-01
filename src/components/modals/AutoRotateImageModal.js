import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import ScalableImage from '../images/ScalableImage';

export default class AutoRotateImageModal extends React.Component {

    state = {
        path: this.props.path,
        originalImageWidth: this.props.width,
        originalImageHeight: this.props.height,
        screenWidth: Dimensions.get('window').width,
    }

    render() {
        const { path, screenWidth, originalImageWidth, originalImageHeight } = this.state;

        return(
            <View style={styles.container}>
                <ScalableImage
                    source={{ uri: path }}
                    width={screenWidth}
                    originalWidth={originalImageHeight}
                    originalHeight={originalImageWidth}
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