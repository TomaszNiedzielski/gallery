import React from 'react';
import { Modal, View, FlatList, StyleSheet, Dimensions } from 'react-native';

import AutoRotateImageModal from './AutoRotateImageModal';
import VideoPlayer from './videoplayer/VideoPlayer';
import MediaViewerHeader from '../headers/MediaViewerHeader';

import { connect } from 'react-redux';
import { rememberCurrentlyViewedMediaItem } from '../../redux/actions/mediaSlider';

class MediaSlider extends React.Component {

    state = {
        media: this.props.media,
        screenHeight: Dimensions.get('window').height,
        screenWidth: Dimensions.get('window').width,
        mounted: true,
        isScreenPortrait: true,
        selectedMediaItemIndex: null,
        isScrollDirectionHorizontal: true,
    }

    render() {
        const { media, screenWidth, screenHeight, mounted, isScreenPortrait, selectedMediaItemIndex, isScrollDirectionHorizontal,  } = this.state;
        console.log('media h: ', media);
        console.log('indeksy: ', selectedMediaItemIndex);
        console.log('screen wfidth: ', screenWidth);
        return(
            <Modal onRequestClose={() => this.props.onRequestClose()}>
                <View style={styles.container}>
                    <MediaViewerHeader
                        onRequestClose={this.props.onRequestClose}
                    />
                    {mounted && selectedMediaItemIndex !== null ?
                    <FlatList
                        data={media}
                        keyExtractor={item => item.path}
                        pagingEnabled
                        horizontal={isScrollDirectionHorizontal}
                        onViewableItemsChanged={this.onViewableItemsChanged}
                        // showsHorizontalScrollIndicator={false}
                        getItemLayout={(data, index) => (
                            {length: screenWidth, offset: screenWidth * index, index}
                        )}
                        initialScrollIndex={selectedMediaItemIndex}
                        renderItem={({ item }) => (
                            <View style={{
                                width: screenWidth,
                                backgroundColor: 'black'
                            }}>
                                {item.type === 'image'
                                ? <View style={styles.mediaItemContainer}>
                                    <AutoRotateImageModal
                                        source={{ uri: item.path }}
                                        style={{
                                            width: isScreenPortrait ? screenWidth : item.width * (screenHeight / item.height),
                                            height: isScreenPortrait ? item.height * (screenWidth / item.width) : screenHeight
                                        }}
                                        onRequestClose={this.props.onRequestClose}
                                    />
                                </View>
                                : <VideoPlayer
                                    uri={item.path}
                                    onRequestClose={this.props.onRequestClose}
                                />}
                            </View>
                        )}
                    /> : null}
                </View>
            </Modal>
        );
    }

    componentDidMount() {
        this.setState({ selectedMediaItemIndex: this.props.selectedMediaItemIndex });
        const dimensions = Dimensions.get('window');
        const isScreenPortrait = dimensions.height > dimensions.width;

        this.setState({ isScreenPortrait: isScreenPortrait });
        Dimensions.addEventListener("change", () => {
            //this.setState({ mounted: false });
            const dimensions = Dimensions.get('window');
            const isScreenPortrait = dimensions.height > dimensions.width;
            this.setState({
                screenHeight: dimensions.height,
                screenWidth: dimensions.width,
                isScreenPortrait: isScreenPortrait,
            });
            const { selectedMediaItemIndex } = this.state;
            this.setState({ selectedMediaItemIndex: null });
            this.setState({ selectedMediaItemIndex: selectedMediaItemIndex });
            //setTimeout(() => {
                //this.setState({ mounted: true });
            //}, 19000);
        });
    }
    componentWillUnmount() {
        Dimensions.removeEventListener("change");
    }
        
    onViewableItemsChanged = (data) => {
        console.log('onViewableItemsChanged: ', data);
        if(data.changed[0].isViewable) {
            this.setState({ selectedMediaItemIndex: data.changed[0].index });
            this.props.rememberCurrentlyViewedMediaItem(data.changed[0].item);
        }
    }

    componentDidUpdate() {
        console.log("media slider from redux: ", this.props.mediaSlider);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    mediaItemContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    }
});

const mapStateToProps = state => {
    return {
        mediaSlider: state.mediaSlider
    }
}

const mapDispatchToprops = () => {
    return { rememberCurrentlyViewedMediaItem }
}

export default connect(mapStateToProps, mapDispatchToprops())(MediaSlider);