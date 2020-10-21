import React from 'react';
import { StyleSheet, View } from 'react-native';

import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Controls extends React.Component {

    state = {
        sliderValue: null,
        isVisible: false
    }

    render() {
        const { paused, duration } = this.props;
        const { sliderValue, isVisible } = this.state;
        console.log('video duration: ', duration);
        const newDuration = duration;
        console.log('new duration: ', newDuration);
        return(
            <View style={[styles.container, isVisible === false && { bottom: -150 }]}>
                <View style={{ width: '100%', marginBottom: 10, marginTop: 5 }}>
                    <Slider
                        maximumValue={newDuration}
                        minimumValue={0}
                        minimumTrackTintColor="#307ecc"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderValue}
                        onValueChange={(sliderValue) => {this.setState({sliderValue: sliderValue}); this.props.seek(sliderValue)}}
                    />
                </View>
                <View style={styles.playButtonWrapper}>
                    {paused ?
                        <Icon name="ios-caret-forward" size={50} style={styles.caret} onPress={() => this.props.play()} />
                        :<Icon name="pause" size={50} style={{marginLeft: 4}} onPress={() => this.props.play()} />
                    }
                </View>
            </View>
        );
    }

    componentDidMount() {
        this.setState({ sliderValue: this.props.sliderValue });
    }

    componentDidUpdate() {
        if(this.props.sliderValue !== this.state.sliderValue) {
            this.setState({ sliderValue: this.props.sliderValue });
        }
        if(this.props.isVisible !== this.state.isVisible) {
            this.setState({ isVisible: this.props.isVisible });
        }
    }

}

const styles = StyleSheet.create({
    container: {
        height: 150,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1f1f1f'
    },
    playButtonWrapper: {
        backgroundColor: 'white',
        borderRadius: 150,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    caret: {
        marginLeft: 8
    }
});