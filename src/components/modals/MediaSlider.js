import React from 'react';
import { Modal, View, FlatList, StyleSheet, Dimensions } from 'react-native';

import FastImage from 'react-native-fast-image';
import AutoRotateImageModal from './AutoRotateImageModal';

import VideoPlayer from './videoplayer/VideoPlayer';

export default class MediaSlider extends React.Component {

    state = {
        media: this.props.media,
        screenHeight: Dimensions.get('window').height,
        screenWidth: Dimensions.get('window').width,
    }

    render() {
        const { media, screenWidth, screenHeight } = this.state;
        const { selectedMediaItemIndex } = this.props;
        console.log('media h: ', media);
        console.log('indeksy: ', selectedMediaItemIndex);
        return(
            <Modal onRequestClose={() => this.props.onRequestClose()}>
                <View style={styles.container}>
                    <FlatList
                        data={media}
                        keyExtractor={item => item.path}
                        pagingEnabled
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        getItemLayout={(data, index) => (
                            {length: Dimensions.get('window').width, offset: Dimensions.get('window').width * index, index}
                        )}
                        initialScrollIndex={selectedMediaItemIndex}
                        style={{ flex: 1 }}
                        renderItem={({ item }) => (
                            <View style={{
                                width: screenWidth,
                                height: screenHeight,
                                justifyContent: 'center',
                                backgroundColor: 'black'
                            }}>
                                {!item.duration
                                ? <AutoRotateImageModal
                                    path={item.path}
                                    height={item.height}
                                    width={item.width}
                                />
                                : <VideoPlayer uri={item.path} />}
                            </View>
                        )}
                    />
                </View>
            </Modal>
        );
    }
/*<FastImage
    source={{ uri: item.path }}
    style={{ width: '100%', height: Dimensions.get('window').height-100 }}
/>*/

    componentDidMount() {
        Dimensions.addEventListener("change", () => {
            const dimensions = Dimensions.get('window');
            this.setState({
                screenHeight: dimensions.height,
                screenWidth: dimensions.width,
            });
        });
    }
    componentWillUnmount() {
        Dimensions.removeEventListener("change");
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute'
    }
});