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
        const { paused, duration, isControlsVisible, currentTime } = this.state;
        return(
            <TouchableNativeFeedback onPress={() => this.keepControlsVisible()}>
                <View style={styles.container}>
                    <Video source={{ uri: this.props.uri }}   // Can be a URL or a local file.
                        ref={(ref) => {
                            this.player = ref
                        }}
                        style={{ width: '100%', height: this.state.videoPlayerHeight }}
                        paused={paused}
                        onLoad={data => this.onLoad(data)}
                        onSeek={(data) => {console.log(data)}}
                        onProgress={data => this.setState({ currentTime: data.currentTime })}
                        resizeMode="cover"
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

        console.log('new value: ', newValue)
    }

    onLoad = data => {
        console.log('szerokosc: ', data.naturalSize.width, 'height: ', data.naturalSize.height);

        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;

        const videoPlayerWidth = windowWidth;

        const videoPlayerHeight = windowWidth*windowWidth/windowHeight;

        console.log('video player height: ', videoPlayerHeight);

        this.setState({
            duration: data.duration,
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
    }

    componentWillUnmount() {
        clearTimeout(this.controlsTimer);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundVideo: {
        width: '100%',
        height: 300
    },
});