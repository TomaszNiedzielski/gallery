import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, Dimensions, View } from 'react-native';
import PropTypes from 'prop-types';

import FastImage from 'react-native-fast-image';

import CheckBox from '../checkboxes/CheckBox';

import { connect } from 'react-redux';
import { addSelectedMediaToCollection, removeSelectedMediaFromCollection } from '../../redux/actions/selectedMedia';

class MediaListItem extends React.Component {

    render() {
        const { item, index, onPressHandler, isRemovingEnabled, columnNumber } = this.props;
        let numColumns = !columnNumber ? 3 : columnNumber;
        console.log('numColumns: ', numColumns);
        return (
            <TouchableWithoutFeedback onPress={() => onPressHandler(index)}>
                <View style={styles.container}>
                    <CheckBox
                        value={false}
                        visible={isRemovingEnabled}
                        onValueChange={this.onCheckBoxValueChange}
                    />
                    <FastImage
                        source={{ uri: item.path }}
                        style={{
                            height: Dimensions.get('window').width/numColumns-6,
                            width: Dimensions.get('window').width/numColumns-6,
                            margin: 3
                        }}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    onCheckBoxValueChange = value => {
        console.log(value);
        if(value === true) {
            this.props.addSelectedMediaToCollection(this.props.item.path);
        } else {
            this.props.removeSelectedMediaFromCollection(this.props.item.path);
        }
    }

}

const styles = StyleSheet.create({
    mediaItem: {
        
    }
});

MediaListItem.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    onPressHandler: PropTypes.func,
    isRemovingEnabled: PropTypes.bool,
    columnNumber: PropTypes.number
}

const mapStateToProps = (state) => {
    return {
        selectedMedia: state.selectedMedia
    }
}

const mapDispatchToprops = () => {
    return {
        addSelectedMediaToCollection,
        removeSelectedMediaFromCollection
    }
}

export default connect(mapStateToProps, mapDispatchToprops())(MediaListItem);