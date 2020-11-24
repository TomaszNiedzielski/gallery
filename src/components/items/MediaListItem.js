import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, Dimensions, View } from 'react-native';
import PropTypes from 'prop-types';

import FastImage from 'react-native-fast-image';

import CheckBox from '../checkboxes/CheckBox';

import { connect } from 'react-redux';
import { addSelectedMediaToCollection, removeSelectedMediaFromCollection } from '../../redux/actions/selectedMedia';

class MediaListItem extends React.Component {
    render() {
        const { item, index, onPressHandler, isRemovingEnabled, numberOfColumns } = this.props;
        let numColumns = !numberOfColumns ? 3 : numberOfColumns;
        console.log('numColumns: ', numColumns);
        console.log(item);
        return (
            <TouchableWithoutFeedback onPress={() => onPressHandler(index)}>
                <View style={[styles.container, {
                    height: numColumns === 3 ? Dimensions.get('window').width/numColumns-1 : item.height * Dimensions.get('window').width / item.width,
                    width: Dimensions.get('window').width/numColumns,
                    padding: 1
                }]}>
                    <CheckBox
                        value={false}
                        visible={isRemovingEnabled}
                        onValueChange={this.onCheckBoxValueChange}
                    />
                    <FastImage
                        source={{ uri: item.path }}
                        style={{
                            height: numColumns === 3 ? Dimensions.get('window').width/numColumns-2 : item.height * Dimensions.get('window').width / item.width-1,
                            width: Dimensions.get('window').width/numColumns-1,
                            borderRadius: 3
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
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

MediaListItem.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    onPressHandler: PropTypes.func,
    isRemovingEnabled: PropTypes.bool,
    numberOfColumns: PropTypes.number
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