import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors } from '../../../constans/Colors';

export default class Controls extends React.Component {
    state = {
        sliderValue: null,
        isVisible: this.props.isVisible,
        duration: 0,
        durationInMinutes: 0,
        durationInSeconds: 0
    }

    render() {
        const { paused, duration } = this.props;
        const { sliderValue, isVisible, durationInMinutes, durationInSeconds } = this.state;

        // Calculate current minute and second.
        const currentMinute = Math.floor(sliderValue/60);
        const currentSecond = Math.floor(sliderValue-60*currentMinute);

        return(
            <View style={[styles.container, isVisible === false && { bottom: -150 }]}>
                <View style={{ width: '100%', marginTop: 5 }}>
                    <Slider
                        maximumValue={duration}
                        minimumValue={0}
                        minimumTrackTintColor={Colors.primary}
                        maximumTrackTintColor="#fff"
                        thumbTintColor={Colors.primary}
                        step={1}
                        value={sliderValue}
                        onValueChange={(sliderValue) => { this.setState({sliderValue: sliderValue}); this.props.seek(sliderValue) }}
                    />
                </View>
                <View style={styles.timeStampsContainer}>
                    <Text style={styles.timeStamp}>
                        00:{currentMinute < 10 ? '0' + currentMinute : currentMinute}
                        :{currentSecond < 10 ? '0' + currentSecond : currentSecond}
                    </Text>
                    <Text style={styles.timeStamp}>
                        00:{durationInMinutes < 10 ? '0' + durationInMinutes : durationInMinutes}
                        :{durationInSeconds < 10 ? '0' + durationInSeconds : durationInSeconds}
                    </Text>
                </View>
                <View style={styles.playButtonWrapper}>
                    {paused
                        ? <Icon name="ios-caret-forward" size={35} style={styles.caret} onPress={() => this.props.play()} />
                        : <Icon name="pause" size={35} style={{marginLeft: 4}} onPress={() => this.props.play()} />
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
        if(this.props.duration !== this.state.duration) {
            this.setState({ duration: this.props.duration });
            this.calculateDuration(this.props.duration);
        }
    }

    calculateDuration = (duration) => {
        const minutes = Math.floor(duration/60);
        const seconds = Math.floor(duration-60*minutes);
        this.setState({ durationInMinutes: minutes, durationInSeconds: seconds });
    }

}

const styles = StyleSheet.create({
    container: {
        height: 110,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0d0d0d'
    },
    timeStampsContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeStamp: {
        color: 'white'
    },
    playButtonWrapper: {
        backgroundColor: 'white',
        borderRadius: 150,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    caret: {
        marginLeft: 6
    }
});