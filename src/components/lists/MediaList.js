import React from 'react';
import { FlatList, StyleSheet, View, BackHandler } from 'react-native';
import { connect } from 'react-redux';

import MediaListItem from '../items/MediaListItem';
import MediaSlider from '../modals/MediaSlider';

class MediaList extends React.Component {

    state = {
        media: this.props.media,
        selectedMediaItemIndex: null
    }

    render() {
        const { media, selectedMediaItemIndex } = this.state;
        return(
            <View style={styles.container}>
                {media.length > 0 && <FlatList
                    data={media}
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
                {selectedMediaItemIndex !== null ?
                    <MediaSlider
                        media={media}
                        onRequestClose={this.backAction}
                        selectedMediaItemIndex={selectedMediaItemIndex}
                    />
                    : null
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
        if(this.state.media && this.props.media && this.state.media.length !== this.props.media.length) {
            this.setState({ media: this.props.media });
        }
    }

    openMediaItem = index => this.setState({ selectedMediaItemIndex: index });

    backAction = () => {
        if(this.state.selectedMediaItemIndex !== null) {
            this.setState({ selectedMediaItemIndex: null });
            return () => null;
        }
    }
}

const mapStateToProps = (state, props) => {
    if(state.folders.length === 0) {
        return {
            error: true
        }
    } else {
        if(props.folderName) {
            const folder = state.folders.find(item => item.name === props.folderName);
            return {
                'media': folder.media
            }
        } else {
            return {
                'media': props.media
            }
        }
    }
}

const mapDispatchToprops = () => {
    return {}
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default connect(mapStateToProps, mapDispatchToprops())(MediaList);