import React from 'react';
import { Modal, View, FlatList, StyleSheet, Image, Dimensions } from 'react-native';

import VideoPlayer from './videoplayer/VideoPlayer';

export default class MediaSlider extends React.Component {

    state = {
        media: this.props.media
    }

    render() {
        const { media } = this.state;
        const { selectedMediaItemIndex } = this.props;
        console.log('media h: ', media);
        console.log('indeksy: ', selectedMediaItemIndex);
        return(
            <Modal
                onRequestClose={() => this.props.onRequestClose()}
            >
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
                                width: Dimensions.get('window').width,
                                height: Dimensions.get('window').height,
                                justifyContent: 'center',
                                backgroundColor: 'black'
                            }}>
                                {!item.duration ? <Image
                                    source={{ uri: item.path }}
                                    style={{ width: '100%', height: Dimensions.get('window').height-100 }}
                                /> : <VideoPlayer uri={item.path} />}
                            </View>
                        )}
                    />
                </View>
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute'
    }
});