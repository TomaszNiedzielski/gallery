import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../constans/Colors';

const DefaultHeaderBackground = () => {
    return(
        <LinearGradient
            colors={Colors.gradient}
            style={{ flex: 1 }}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
        />
    );
}
export default DefaultHeaderBackground;