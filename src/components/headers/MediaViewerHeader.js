import React from 'react';
import { View, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';
import { downloadMediaItem } from '../../redux/actions/mediaSlider';

class MediaViewerHeader extends React.Component {
    render() {
        console.log('this.props.isHeaderVisible: ', this.props.isHeaderVisible);
        return(
            this.props.isHeaderVisible ? <View style={styles.container}>
                <View style={styles.headerLeft}>
                    <Ionicons name="arrow-back" size={30} color="white" style={styles.icon} onPress={() => this.props.onRequestClose()} />
                </View>
                <View style={styles.headerRight}>
                    <Ionicons name="trash" size={25} color="white" style={[styles.icon, styles.trash]} onPress={() => {}} />
                    <MaterialIcons name="file-download" size={30} color="white" style={styles.icon} onPress={() => this.props.downloadMediaItem(this.props.currentlyViewedMediaItemPath)} />
                </View>
            </View> : null
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

const mapStateToProps = state => {
    if(Object.keys(state.mediaSlider).length !== 0 && state.mediaSlider.constructor === Object) {
        return {
            currentlyViewedMediaItemPath: state.mediaSlider.currentlyViewedMediaItem.path,
            isHeaderVisible: state.mediaSlider.isHeaderVisible
        }
    }
}

const mapDispatchToProps = () => {
    return { downloadMediaItem }
}

export default connect(mapStateToProps, mapDispatchToProps())(MediaViewerHeader);