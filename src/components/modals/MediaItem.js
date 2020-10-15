import React from 'react';
import { View, StyleSheet, Modal, Image, Text, Dimensions } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class MediaItem extends React.Component {

    state = {
        media: [],
        index: null
    }

    render() {
        const { media, index } = this.state;
        console.log('media item: ', this.props.mediaItem);
        //let images = [];
        //images = images.push(this.props.mediaItem.path);
        console.log('media po tuningu: ', this.state.media);
        return (
            <Modal
                onRequestClose={() => this.props.backAction()}
                transparent={true}
            >
                <View style={styles.container}>
                    {media.length > 0 &&
                    <ImageViewer
                        imageUrls={media}
                        enableImageZoom={true}
                        menus={() => null}
                        index={index}
                        /*renderArrowLeft={() => (
                            <View>
                                <Text
                                    style={{
                                        //backgroundColor: 'green',
                                        height: '100%',
                                        width: Dimensions.get('window').width/2
                                    }}
                                >
                                    
                                </Text>
                            </View>
                        )}
                        renderArrowRight={() => (
                            <View>
                                <Text
                                    style={{
                                       // backgroundColor: 'green',
                                        height: '100%',
                                        width: Dimensions.get('window').width/2
                                    }}
                                >
                                    
                                </Text>
                            </View>
                        )}*/
                        onChange={index => this.setState({ index: index })}
                        onMove={(data) => console.log('move kurwa: ', data)}
                        onSwipeDown={() => {
                            console.log('onSwipeDown');
                        }}
                    />}
                </View>
            </Modal>
        )
    }

    componentDidMount() {

        console.log('was ist das? ', this.props.mediaItem);

        this.setState({ index: this.props.mediaItem.index });

        let media = this.props.folder.media;

        media = media.map(element => {
            console.log('elelement ', element);
            element.url = element.path;
            return element;
        });

        console.log('tuning: ', media);

        this.setState({ media: media });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }
});