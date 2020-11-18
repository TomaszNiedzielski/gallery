import React from 'react';
import { View, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class MediaViewerHeader extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.headerLeft}>
                    <Ionicons name="arrow-back" size={30} color="white" style={styles.icon} onPress={() => this.props.onRequestClose()} />
                </View>
                <View style={styles.headerRight}>
                    <Ionicons name="trash" size={25} color="white" style={[styles.icon, styles.trash]} onPress={() => {}} />
                    <MaterialIcons name="file-download" size={30} color="white" style={styles.icon} onPress={() => {}} />
                </View>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: '100%',
        backgroundColor: 'black',
        position: 'absolute',
        zIndex: 2,
        top: 0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerRight: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        marginHorizontal: 10
    },
    trash: {
        top: -1
    }
});