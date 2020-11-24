import React from 'react';
import { View, StyleSheet, Dimensions, TouchableNativeFeedback } from 'react-native';

import Video from 'react-native-video';
import Controls from './Controls';

import { connect } from 'react-redux';
import { toggleHeaderVisibility } from '../../../redux/actions/mediaSlider';

class VideoPlayer extends React.Component {
    state = {
        isControlsVisible: this.props.isHeaderVisible,
        paused: false,
        duration: null,
        videoPlayerHeight: null,
        videoPlayerWidth: null,
        currentTime: null
    }

    render() {
        const { paused, duration, currentTime, videoPlayerWidth, videoPlayerHeight } = this.state;
        const isControlsVisible = this.props.isHeaderVisible;

        return(
            <>
            <TouchableNativeFeedback onPress={() => { this.keepControlsVisible(); this.props.toggleHeaderVisibility() }}>
                <View style={styles.container}>
                    <Video source={{ uri: this.props.uri }}   // Can be a URL or a local file.
                        ref={(ref) => {
                            this.player = ref
                        }}
                        style={{ width: videoPlayerWidth, height: videoPlayerHeight }}
                        paused={paused}
                        onLoad={data => this.onLoad(data)}
                        onProgress={data => this.setState({ currentTime: data.currentTime })}
                        resizeMode="contain"
                    />
                </View>
            </TouchableNativeFeedback>
            <Controls
                play={this.play}
                paused={paused}
                seek={(newValue) => this.seek(newValue)}
                duration={duration}
                sliderValue={currentTime}
                isVisible={isControlsVisible}
            />
            </>
        );
    }

    play = () => {
        this.setState({ paused: !this.state.paused });
    }

    seek = newValue => {
        this.player.seek(newValue);
        this.setState({ currentTime: newValue });
    }

    onLoad = data => {
        this.setState({ duration: data.duration });
        this.setVideoSize();
    }

    setVideoSize = () => {
        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;
        const videoPlayerHeight = windowWidth*windowWidth/windowHeight;

        this.setState({
            videoPlayerHeight: videoPlayerHeight,
            videoPlayerWidth: windowWidth,
        });
    }

    keepControlsVisible = () => {
        this.setState({ isControlsVisible: !this.state.isControlsVisible });
    }

    setControlsVisible = () => {
        this.setState({ isControlsVisible: false });
    }

    componentDidMount() {
        this.keepControlsVisible();

        this.orientationChange = Dimensions.addEventListener("change", () => {
            this.setVideoSize();
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = state => {
    return {
        isHeaderVisible: state.mediaSlider.isHeaderVisible
    }
}

const mapDispatchToProps = () => {
    return { toggleHeaderVisibility }
}

export default connect(mapStateToProps, mapDispatchToProps())(VideoPlayer);