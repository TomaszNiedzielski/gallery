import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../constans/Colors';

export default class SlidingPopupBar extends React.Component {

    state = {
        y: new Animated.Value(300)
    }

    render() {
        console.log(this.state.y);
        return(
            <Animated.View style={[styles.container, {
                transform: [{
                    translateY: this.state.y
                }]}
            ]}>
                <LinearGradient
                    colors={Colors.gradient}
                    style={styles.gradient}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                >
                    <Text style={styles.text}>Connect with your partner.</Text>
                    <Text style={styles.instruction}>
                        To connect this gallery with your partner, he/she need to download app on his/her phone
                        and type this code during registration. Code: 432 543
                    </Text>
                </LinearGradient>
            </Animated.View>
        );
    }

    componentDidMount() {
        this.slide();
    }

    slide = () => {
        Animated.spring(this.state.y, {
            toValue: 0,
            useNativeDriver: true, 
        }).start();
    };
      
}

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.primary,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        padding: 20
    },
    text: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 10
    },
    instruction: {
        color: 'white',
        fontWeight: 'bold'
    }
});