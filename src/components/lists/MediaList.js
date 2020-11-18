import React from 'react';
import { FlatList, StyleSheet, View, BackHandler, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import MediaListItem from '../items/MediaListItem';
import MediaSlider from '../modals/MediaSlider';

class MediaList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            media: props.media,
            selectedMediaItemIndex: null,
            columnNumber: props.columnNumber
        }
    }

    render() {
        const { media, selectedMediaItemIndex, columnNumber } = this.state;
        console.log('column number: ', columnNumber);
        return(
            <View style={styles.container}>
                {media.length > 0 && <FlatList
                    data={media}
                    keyExtractor={item => item.path}
                    key={columnNumber}
                    renderItem={({ item, index }) => (
                        <MediaListItem
                            item={item}
                            index={index}
                            onPressHandler={this.openMediaItem}
                            isRemovingEnabled={this.props.isRemovingEnabled}
                            columnNumber={columnNumber}
                        />
                    )}
                    numColumns={columnNumber}
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
        if(this.state.columnNumber !== this.props.columnNumber) {
            this.setState({ columnNumber: this.props.columnNumber });
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
            if(folder)  {
                return {
                    'media': folder.media
                }
            } else {
                return {
                    error: true
                }
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