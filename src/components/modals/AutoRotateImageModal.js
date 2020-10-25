import React from 'react';
import { View, Image, StyleSheet, Modal, Dimensions } from 'react-native';

export default class AutoRotateImageModal extends React.Component {

    state = {
        image: {
            height: 1280,
            mime: "image/png",
            modificationDate: "1603450210000",
            path: "file:///data/user/0/com.gallery/cache/react-native-image-crop-picker/Screenshot_2020-10-22-16-20-38.png",
            size: 66715,
            width: 720
        }
    }

    render() {
        const { path } = this.state.image;
        return(
            <Modal>
                <View style={styles.container}>
                    <Image
                        source={{ uri: path }}
                        style={{
                            
                        }}
                    />
                </View>
            </Modal>
        );
    }

    componentDidMount() {
        this.orientationChange = Dimensions.addEventListener("change", () => {
            
        });
    }

    isPortrait = () => {
        const dim = Dimension.get("window")
        return dim.height >= dim.width
    }
      
    isLandscape = () => {
        const dim = Dimension.get("window")
        return dim.width >= dim.height
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '100%'
    }
});