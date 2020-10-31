import React from 'react';
import { View, Image, StyleSheet, Modal, Dimensions, StatusBar } from 'react-native';

import ScalableImage from '../images/ScalableImage';
import FastImage from 'react-native-fast-image';


export default class AutoRotateImageModal extends React.Component {

    state = {
        path: this.props.path,
        originalImageWidth: this.props.width,
        originalImageHeight: this.props.height,
        isScreenPortrait: true,
        isImagePortrait: null,
        screenHeight: Dimensions.get('window').height,
        screenWidth: Dimensions.get('window').width,
    }

    render() {
        const { path, isScreenPortrait, isImagePortrait, screenHeight, screenWidth, originalImageWidth, originalImageHeight } = this.state;
        console.log('is path? ', path);
        console.log('orinal height: ', originalImageHeight);
        console.log('orinal width: ', originalImageWidth);

        return(
            <View style={styles.container}>
                {isScreenPortrait && 
                <ScalableImage // screen is portrait
                    source={{ uri: path }}
                    width={screenWidth}
                    //height={isImagePortrait ? screenHeight : null}
                    originalWidth={originalImageHeight}
                    originalHeight={originalImageWidth}
                /> /*: 
                <ScalableImage // screen is landscape
                    source={{ uri: path }}
                    width={isImagePortrait ? null : screenWidth}
                    height={isImagePortrait ? screenHeight : null}
                    originalWidth={originalImageWidth}
                    originalHeight={originalImageHeight}
                />*/}
            </View>
        );
    }

    componentDidMount() {
        // check if image is portrait
        const isImagePortrait = this.state.originalImageHeight >= this.state.originalImageWidth;
        console.log('is image portrat: ', isImagePortrait);
        this.setState({ isImagePortrait: isImagePortrait });


        // set real size
        if(this.props.width > this.props.height) {
            this.setState({ originalImageHeight: this.props.height, originalImageWidth: this.props.width });
        } else {
            this.setState({ originalImageHeight: this.props.width, originalImageWidth: this.props.height });
        }


        // check if screen is portrait
        const isScreenPortrait = this.isScreenPortrait();
        this.setState({ isScreenPortrait: isScreenPortrait });
        Dimensions.addEventListener("change", () => {
            const dimensions = Dimensions.get('window');
            const isScreenPortrait = this.isScreenPortrait();
            this.setState({
                screenHeight: dimensions.height,
                screenWidth: dimensions.width,
                isScreenPortrait: isScreenPortrait
            });
        });
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change');
    }

    isScreenPortrait = () => {
        const dimensions = Dimensions.get('window');
        return dimensions.height >= dimensions.width;
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    }
});