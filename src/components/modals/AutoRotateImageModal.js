import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import FastImage from 'react-native-fast-image';
import MediaViewerHeader from '../headers/MediaViewerHeader';

export default class AutoRotateImageModal extends React.Component {
    state = {
        isMediaHeaderVisible: false
    }

    render() {
        const { source, style } = this.props;
        const { isMediaHeaderVisible } = this.state;
        return(
            <View style={styles.container}>
                {isMediaHeaderVisible && <MediaViewerHeader
                    onRequestClose={this.props.onRequestClose}
                />}
                <TouchableWithoutFeedback onPress={() => this.toggleMediaHeader()}>
                    <FastImage
                        source={source}
                        style={style}
                    />
                </TouchableWithoutFeedback>
            </View>
        );
    }
    
    toggleMediaHeader = () => {
        clearTimeout(this.timer);
        const { isMediaHeaderVisible } = this.state;
        this.setState({ isMediaHeaderVisible: !isMediaHeaderVisible });
        if(!isMediaHeaderVisible) {
            this.timer = setTimeout(() => {this.setState({ isMediaHeaderVisible: isMediaHeaderVisible })}, 5000)
        }
    }
    
    componentWillUnmount() {
        clearTimeout(this.timer);
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