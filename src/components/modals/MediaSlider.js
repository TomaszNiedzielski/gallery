import React from 'react';
import { Modal, View, FlatList, StyleSheet, Dimensions } from 'react-native';

import FastImage from 'react-native-fast-image';
import AutoRotateImageModal from './AutoRotateImageModal';
import ScalableImage from '../images/ScalableImage';

import VideoPlayer from './videoplayer/VideoPlayer';

export default class MediaSlider extends React.Component {

    state = {
        media: this.props.media,
        screenHeight: Dimensions.get('window').height,
        screenWidth: Dimensions.get('window').width,
        mounted: true,
        isScreenPortrait: true,
        selectedMediaItemIndex: null,
    }

    render() {
        const { media, screenWidth, screenHeight, mounted, isScreenPortrait, selectedMediaItemIndex } = this.state;
        console.log('media h: ', media);
        console.log('indeksy: ', selectedMediaItemIndex);
        console.log('screen wfidth: ', screenWidth);
        return(
            <Modal onRequestClose={() => this.props.onRequestClose()}>
                <View style={styles.container}>
                    {mounted && selectedMediaItemIndex !== null ? <FlatList
                        data={media}
                        keyExtractor={item => item.path}
                        pagingEnabled
                        horizontal={true}
                        onViewableItemsChanged={this.onViewableItemsChanged}
                        // showsHorizontalScrollIndicator={false}
                        getItemLayout={(data, index) => (
                            {length: screenWidth, offset: screenWidth * index, index}
                        )}
                        initialScrollIndex={selectedMediaItemIndex}
                        // style={{ flex: 1 }}
                        renderItem={({ item }) => (
                            <View style={{
                                width: screenWidth,
                                backgroundColor: 'black'
                            }}>
                                {!item.duration
                                ? <View style={styles.mediaItemContainer}>
                                    <FastImage
                                        source={{ uri: item.path }}
                                        style={{
                                            width: isScreenPortrait ? screenWidth : item.width * (screenHeight / item.height),
                                            height: isScreenPortrait ? item.height * (screenWidth / item.width) : screenHeight
                                        }}
                                    />
                                </View>
                                : <VideoPlayer uri={item.path} />}
                            </View>
                        )}
                    /> : null}
                </View>
            </Modal>
        );
    }
/*<FastImage
    source={{ uri: item.path }}
    style={{ width: '100%', height: Dimensions.get('window').height-100 }}
/>*/

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
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // position: 'absolute',
        backgroundColor: 'black'
    },
    mediaItemContainer: {
        marginVertical: 20,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    }
});