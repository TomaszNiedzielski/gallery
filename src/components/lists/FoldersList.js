import React from 'react';
import { View, Image, StyleSheet, FlatList, Text, Dimensions, TouchableNativeFeedback } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import AppStamp from '../icons/AppStamp';

const FolderIcon = ({ item, navigation }) => (
    <View style={{ width: (Dimensions.get('window').width/2) }}>
        <TouchableNativeFeedback onPress={() => navigation.navigate('FolderScreen', { 'folderName': item.name })}>
            <View style={styles.itemWrapper}>
                <FastImage
                    style={styles.itemImage}
                    source={{ uri: item.media[0].path }}
                />
                <View style={styles.folderNameWrapper}>
                    <Text style={styles.folderName}>{item.name} ({item.media.length})</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    </View>
);

const FoldersList = () => {
    const folders = useSelector(state => state.folders);
    const navigation = useNavigation();
    console.log('state.folders: ', folders);
    return(
        <View style={styles.container}>
            {folders && folders.length > 0 ?
                <FlatList
                    data={folders}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) => (
                        <FolderIcon
                            item={item}
                            navigation={navigation}
                        />
                    )}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                />
            : <AppStamp />
            }
        </View>

    );
    

}
export default FoldersList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 10
    },
    itemWrapper: {
        width: (Dimensions.get('window').width/2),
        height: (Dimensions.get('window').width/2),
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    itemImage: {
        width: (Dimensions.get('window').width/2-2),
        height: (Dimensions.get('window').width/2-2),
        borderRadius: 5,
    },
    row: {
        justifyContent: "space-between",
    },
    folderNameWrapper: {
        width: (Dimensions.get('window').width/2-2),
        
        // justifyContent: 'center'
    },
    folderName: {
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        color: 'white',
        position: 'absolute',
        padding: 7,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        width: '100%',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    emptyGalleryInfo: {
        textAlign: 'center',
        fontSize: 13
    }
});


/*
import React from 'react';
import { View, Image, StyleSheet, FlatList, Text, Dimensions, TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';

const renderItem = ({ item }) => (
    <View style={styles.itemWrapper}>
        <TouchableNativeFeedback onPress={() => console.log('onpreess')}>
            <>
            <Image
                style={styles.item}
                source={{ uri: item.media[0].path }}
            />
            <Text>{item.name} ({item.media.length})</Text>
            </>
        </TouchableNativeFeedback>
    </View>
);

class FoldersList extends React.Component {

    state = {
        folders: this.props.folders
    }

    render() {
        const { folders } = this.state;
        console.log('gallery folders: ', folders);
        console.log('gallery folders: ', folders.length);

        return(
            <View style={styles.container}>

                {folders.length > 0 ?
                    <FlatList
                        data={folders}
                        keyExtractor={item => item.name}
                        renderItem={renderItem}
                        numColumns={3}
                        columnWrapperStyle={styles.row}
                    />
                : <Text style={{height: 300, width: 300, backgroundColor: 'red'}}>nie ma kurwa</Text>}
            </View>

        );
    }

    componentDidMount() {
        this.setState({ folders: this.props.folders });
    }

}

const mapStateToProps = (state) => {
    return {
        'folders': state.folders
    }
}

const mapDispatchToprops = () => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToprops())(FoldersList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
    },
    itemWrapper: {
        width: (Dimensions.get('window').width/3)-4,
        height: (Dimensions.get('window').width/3)-4,
        marginRight: 3
    },
    row: {
        marginHorizontal: 3,
        marginVertical: 3
    }
});
*/