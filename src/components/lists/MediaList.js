import React from 'react';
import { FlatList, StyleSheet, View, Dimensions, BackHandler } from 'react-native';
import { connect } from 'react-redux';

import MediaItem from '../modals/MediaItem';
import MediaListItem from '../items/MediaListItem';

class MediaList extends React.Component {

    state = {
        folder: this.props.folder,
        mediaItem: {}
    }

    render() {
        const { folder, mediaItem } = this.state;
        return(
            <View style={styles.container}>
                {folder.media.length > 0 && <FlatList
                    data={folder.media}
                    keyExtractor={item => item.path}
                    renderItem={({ item, index }) => (
                        <MediaListItem
                            item={item}
                            index={index}
                            onPressHandler={this.openMediaItem}
                            isRemovingEnabled={this.props.isRemovingEnabled}
                        />
                    )}
                    numColumns={3}
                />}
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

    componentDidUpdate() {
        if(this.props.error) {
            this.props.navigation.goBack();
            return;
        }
        if(this.state.folder && this.props.folder && this.state.folder.media.length !== this.props.folder.media.length) {
            this.setState({ folder: this.props.folder });
        }
    }

    openMediaItem = (item, index) => {
        item.index = index; // add index of this object to folder
        this.setState({ mediaItem: item });
    }

    backAction = () => {
        if(Object.keys(this.state.mediaItem).length > 0) {
            this.setState({  mediaItem: {} });
            return () => null;
        }
    }

}

const mapStateToProps = (state, props) => {
    if(state.folders.length === 0) {
        console.log('error powrót na głowna');
        return {
            error: true
        }
    } else {
        const folder = state.folders.find(item => item.name === props.params.folderName);
        return {
            'folder': folder
        }
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
});