import React from 'react';
import { View, StyleSheet, Dimensions, TouchableNativeFeedback } from 'react-native';

import Video from 'react-native-video';

import Controls from './Controls';

export default class VideoPlayer extends React.Component {

    state = {
        isControlsVisible: true,
        paused: false,
        duration: null,
        videoPlayerHeight: null,
        videoPlayerWidth: null,
        currentTime: null
    }

    render() {
        const { paused, duration, isControlsVisible, currentTime, videoPlayerWidth, videoPlayerHeight } = this.state;
        return(
            <TouchableNativeFeedback onPress={() => this.keepControlsVisible()}>
                <View style={styles.container}>
                    <Video source={{ uri: this.props.uri }}   // Can be a URL or a local file.
                        ref={(ref) => {
                            this.player = ref
                        }}
                        style={{ width: videoPlayerWidth, height: videoPlayerHeight }}
                        paused={paused}
                        onLoad={data => this.onLoad(data)}
                        onSeek={(data) => {console.log(data)}}
                        onProgress={data => this.setState({ currentTime: data.currentTime })}
                        resizeMode="contain"
                        //fullscreenOrientation="landscape"
                    />
                    <Controls
                        play={this.play}
                        paused={paused}
                        seek={(newValue) => this.seek(newValue)}
                        duration={duration}
                        sliderValue={currentTime}
                        isVisible={isControlsVisible}
                    />
                </View>
            </TouchableNativeFeedback>
        );
    }

    play = () => {
        this.setState({ paused: !this.state.paused });
        this.keepControlsVisible();
    }

    seek = newValue => {
        this.player.seek(newValue);
        this.setState({ currentTime: newValue });
        this.keepControlsVisible();
    }

    onLoad = data => {
        this.setState({ duration: data.duration });
        this.setVideoSize();
    }

    setVideoSize = () => {
        const windowWidth = Dimensions.get('window').width;  // TU JEST NAROZPIERDALANE I ORIENTATION NIE DZIALA
        const windowHeight = Dimensions.get('window').height;

        let videoPlayerHeight = windowWidth*windowWidth/windowHeight;

        this.setState({
            videoPlayerHeight: videoPlayerHeight,
            videoPlayerWidth: windowWidth,
        });
    }

    keepControlsVisible = () => {
        clearTimeout(this.controlsTimer);

        this.setState({ isControlsVisible: true });

        this.controlsTimer = setTimeout(() => {
            this.setState({ isControlsVisible: false });
        }, 6000);
    }

    componentDidMount() {
        this.keepControlsVisible();

        this.orientationChange = Dimensions.addEventListener("change", () => {
            this.setVideoSize();
            console.log('orientation change');
        });
    }

    componentWillUnmount() {
        clearTimeout(this.controlsTimer);
        //removeEventListener(this.orientationChange);
    }

    /*isPortrait = () => {
        const dim = Dimension.get("window")
        return dim.height >= dim.width
    }
      
    isLandscape = () => {
        const dim = Dimension.get("window")
        return dim.width >= dim.height
    }*/
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    }
});