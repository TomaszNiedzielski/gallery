import React from 'react';
import { Image, FlatList, StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback, BackHandler } from 'react-native';
import { connect } from 'react-redux';

import MediaItem from '../modals/MediaItem';
import FastImage from 'react-native-fast-image';

class MediaList extends React.Component {

    state = {
        folder: this.props.folder,
        mediaItem: {}
    }

    render() {
        const { folder, mediaItem } = this.state;
        console.log('folder inside media list: ', folder.media);
        return(
            <View style={styles.container}>
                <FlatList
                    data={folder.media}
                    keyExtractor={item => item.path}
                    renderItem={({ item, index }) => (
                        <TouchableWithoutFeedback onPress={() => this.openMediaItem(item, index)}>
                            <FastImage
                                source={{ uri: item.path }}
                                style={styles.mediaItem}
                            />
                        </TouchableWithoutFeedback>
                    )}
                    numColumns={3}
                />
                {Object.keys(mediaItem).length > 0 &&
                    <MediaItem
                        mediaItem={mediaItem}
                        backAction={this.backAction}
                        folder={folder}
                    />
                }
            </View>
        );
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    openMediaItem(item, index) {
        item.index = index; // add index of this object to folder
        console.log('open media item');
        this.setState({ mediaItem: item });
    }

    backAction = () => {
        console.log('back pressesd');
        if(Object.keys(this.state.mediaItem).length > 0) {
            this.setState({  mediaItem: {} });
            return () => null;
        }
    }

}

const mapStateToProps = (state, props) => {
    //const copyState = state;
    //console.log('copy state', copyState);
    console.log('check');
    console.log(state.folders[0].name);
    console.log(props.params.folderName);
    const folder = state.folders.find(item => item.name === props.params.folderName);
    console.log('co to kurwa za folder: ', folder);
    return {
        'folder': folder
    }
}

const mapDispatchToprops = () => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToprops())(MediaList);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mediaItem: {
        height: Dimensions.get('window').width/3-6,
        width: Dimensions.get('window').width/3-6,
        margin: 3
    }
});