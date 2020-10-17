import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, Dimensions, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import CheckBox from '../checkboxes/CheckBox';

export default class MediaListItem extends React.Component {

    render() {
        const { item, index, onPressHandler, isRemovingEnabled } = this.props;
        return(
            <TouchableWithoutFeedback onPress={() => onPressHandler(item, index)}>
                <View style={styles.container}>
                    <CheckBox
                        value={false}
                        visible={isRemovingEnabled}
                    />
                    <FastImage
                        source={{ uri: item.path }}
                        style={styles.mediaItem}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }

}

const styles = StyleSheet.create({
    container: {
       // position: 'relative'
    },
    mediaItem: {
        height: Dimensions.get('window').width/3-6,
        width: Dimensions.get('window').width/3-6,
        margin: 3
    }
});