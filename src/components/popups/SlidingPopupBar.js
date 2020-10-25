import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../constans/Colors';

import Icon from 'react-native-vector-icons/FontAwesome';

const SlidingPopupBar = () => {
    const [isClosed, setIsClosed] = useState(false);
    return(
            <View style={[styles.container, isClosed ? {left: -208} : {left: 0}]}>
                <LinearGradient
                    colors={Colors.gradient}
                    style={styles.gradient}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                >
                    <Text style={styles.text}>Connect with your partner.</Text>
                    <View style={styles.border} />
                    <TouchableNativeFeedback onPress={() => setIsClosed(!isClosed)}>
                        <View style={styles.touchableWrapper}>
                            <View style={styles.icon}>
                                <Icon name={isClosed ? "arrow-right": "arrow-left"} size={22} color="white" />
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </LinearGradient>
            </View>
            
    );
}

const styles = StyleSheet.create({
    
    container: {
        borderBottomRightRadius: 10,
        borderWidth: 3,
        borderColor: Colors.primary,
        width: 270,
        height: 50,
        position: 'absolute',
        bottom: '50%',
        zIndex: 10,
        flexDirection: 'row'
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 7,
        flexDirection: 'row',
        // width: '100%'
    },
    text: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    touchableWrapper: {
        //height: 50,
        width: 50,
        //borderRadius: 25,
        //position: 'absolute',
        //right: -24,
        //top: -27,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    icon: {
        //backgroundColor: 'rgba(0, 0, 0, 0.2)',
        //height: 33,
        //width: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    border: {
        height: '100%',
        width: 4,
        backgroundColor: Colors.primary,
        marginLeft: 10
    }
});

export default SlidingPopupBar;