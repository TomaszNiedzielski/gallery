import React from 'react';
import { View, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const VideoStamp = () => (
    <View style={styles.container}>
        <Icon name="ios-play-circle-outline" size={60} color="white" />
    </View>
)

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10
    }
});

export default VideoStamp;