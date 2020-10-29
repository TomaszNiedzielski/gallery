import React from 'react';
import { View, Image, StyleSheet, FlatList, Text, Dimensions, TouchableNativeFeedback } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const FolderIcon = ({ item, navigation }) => (
    <View style={styles.itemWrapper}>
        <TouchableNativeFeedback onPress={() => navigation.navigate('FolderScreen', { 'folderName': item.name })}>
            <View>
                <Image
                    style={styles.itemImage}
                    source={{ uri: item.media[0].path }}
                />
                <Text style={styles.folderName}>{item.name} ({item.media.length})</Text>
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
            <View style={{ width: '100%', height: 10 }}/>
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
            : <Text>No folders found.</Text>}
        </View>

    );
    

}
export default FoldersList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 10
    },
    itemImage: {
        width: (Dimensions.get('window').width/2)-20,
        height: (Dimensions.get('window').width/2)-20,
        borderColor: '#f2f2f2',
        borderWidth: 1,
        borderRadius: 5
    },
    itemWrapper: {
        width: (Dimensions.get('window').width/2),
        height: (Dimensions.get('window').width/2)+20,
        marginRight: 3,
        // backgroundColor: 'white',
        alignItems: 'center',
        zIndex: 10
    },
    row: {
        justifyContent: "space-between",
        
    },
    folderName: {
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        color: 'white',
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