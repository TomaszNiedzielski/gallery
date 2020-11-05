import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useSelector } from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../constans/Colors';

const SlidingPopupBar = () => {

    const user = useSelector(state => state.user)
    const [Y, setY] = useState(new Animated.Value(300));

    useEffect(() => {
        Animated.spring(Y, {
            toValue: 0,
            useNativeDriver: true, 
        }).start();
    });
    console.log(user);
    if(!user.partnerId) {
        return(
            <Animated.View style={[styles.container, {
                transform: [{
                    translateY: Y
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
                        and type this code during registration. Code: {user.relationshipCode}
                    </Text>
                </LinearGradient>
            </Animated.View>
        );
    } else {
        return null;
    }
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

export default SlidingPopupBar;