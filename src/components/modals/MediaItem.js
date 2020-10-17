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
        this.setState({ index: this.props.mediaItem.index });

        let media = this.props.folder.media;

        media = media.map(element => {
            element.url = element.path;
            return element;
        });

        this.setState({ media: media });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }
});