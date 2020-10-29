import React from 'react';
import { View, Image, StyleSheet, Modal, Dimensions, StatusBar } from 'react-native';

import ScalableImage from '../images/ScalableImage';

export default class AutoRotateImageModal extends React.Component {

    state = {
        path: "file:///data/user/0/com.gallery/cache/react-native-image-crop-picker/Screenshot_2020-10-22-16-20-38.png",
        isScreenPortrait: false,
        isImagePortrait: null,
        screenHeight: Dimensions.get('window').height,
        screenWidth: Dimensions.get('window').width,
        statusBarHeight: StatusBar.currentHeight
    }

    render() {
        const { path, isScreenPortrait, isImagePortrait, screenHeight, screenWidth, statusBarHeight } = this.state;
        return(
            <Modal>
                <View style={styles.container}>
                    {isScreenPortrait ? 
                    <ScalableImage // screen is portrait
                        source={{ uri: path }}
                        width={screenWidth}
                        height={isImagePortrait ? screenHeight-statusBarHeight : null}
                    /> : 
                    <ScalableImage // screen is landscape
                        source={{ uri: path }}
                        width={isImagePortrait ? null : screenWidth}
                        height={isImagePortrait ? screenHeight-statusBarHeight : null}
                    />}
                </View>
            </Modal>
        );
    }

    componentDidMount() {
        this.getOriginalSizeOfImage();
        this.orientationChange = Dimensions.addEventListener("change", () => {
            const dimensions = Dimensions.get('window');
            this.setState({
                screenHeight: dimensions.height,
                screenWidth: dimensions.width
            });
        });
    }

    getOriginalSizeOfImage = async () => {
        await Image.getSize(this.state.path, (width, height) => {
            const isImagePortrait = height >= width;
            this.setState({ isImagePortrait: isImagePortrait });
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    }
});