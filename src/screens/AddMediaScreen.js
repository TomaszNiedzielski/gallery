import React from 'react'
import { StyleSheet, View, Image, FlatList, Text } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';

import { Dimensions } from 'react-native';
import ChooseFolderManager from '../components/modals/ChooseFolderManager';

import { Colors } from '../constans/Colors';

import Icon from 'react-native-vector-icons/Entypo';

import { connect } from 'react-redux';
import { createFolderAndAddMedia, addMediaToExistingFolder } from '../redux/actions/folders';

const renderItem = ({ item }) => (
    <Image
        source={{ uri: item.path }}
        style={{
            width: Dimensions.get('window').width/3,
            height: Dimensions.get('window').width/3
        }}
    />
);

class AddMediaScreen extends React.Component {

    constructor(props) {
        super(props);

        this.openPicker = this.openPicker.bind(this);

        this.state = {
            selectedMedia: [],
            selectedFolder: null,
            folders: []
        }
    }
    

    render() {
        const { selectedMedia, folders } = this.state;
        console.log('selected media: ', selectedMedia);
        return(
            <View style={styles.container}>
                {selectedMedia.length > 0 &&
                <FlatList 
                    data={selectedMedia}
                    keyExtractor={item => item.path}
                    renderItem={renderItem}
                />}
                {selectedMedia.length > 0 &&
                <ChooseFolderManager
                    selectedMedia={selectedMedia}
                    navigation={this.props.navigation}
                    selectFolder={folder => {this.setState({ selectedFolder: folder}); console.log(folder)}}
                    folders={folders}
                />}
            </View>
        );
    }

    componentDidMount() {
        console.log('to jest kurwa dramat: ', this.props.folders);
        // set state
        this.setState({ folders: this.props.folders });

        // open gallery to select some media
        this.openPicker(this.props.route.params.mediaType);

        const iconColor = 'white';
        this.props.navigation.setOptions({
            title: 'Add Media',
            headerTitleStyle: {
                color: iconColor
            },
            headerTintColor: iconColor,
            headerBackground: () => (
                <LinearGradient
                  colors={Colors.gradient}
                  style={{ flex: 1 }}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                />
            ),
        });
    }

    componentDidUpdate() {
        // build header
        const iconSize = 24;
        this.props.navigation.setOptions({
            headerRight: () => (
                this.state.selectedFolder &&
                <View style={styles.headerRight}>
                    <Icon name="check" size={iconSize} color='white' style={styles.headerIcon} onPress={() => this.saveMedia()} />
                </View>
            )
        });
    }

    openPicker(mediaType) {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: mediaType
        }).then(media => {
            console.log(media);
            if(media.length > 0) {
                this.setState({ selectedMedia: media });
            } else {
                this.props.navigation.goBack();
            }
        }).catch(e => {
            this.props.navigation.goBack();
        });
    }

    saveMedia() {
        const { selectedFolder, selectedMedia } = this.state;

        // check if it is new folder or already existing
        const isThisExistingFolder = this.props.folders.find(folder => folder.name === selectedFolder);
        console.log('co to zwraca: ', isThisExistingFolder);

        if(isThisExistingFolder === undefined) {
            const folder = {
                name: selectedFolder,
                media: selectedMedia
            }
    
            this.props.createFolderAndAddMedia(folder);
            console.log('nowy folder');
        } else {
            this.props.addMediaToExistingFolder(selectedFolder, selectedMedia);
            console.log('istniejacy folder');
        }

        console.log('sweet home alabama')
        
        this.props.navigation.navigate('HomeScreen');
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerIcon: {
        marginHorizontal: 10
    }
});

const mapStateToProps = (state) => {
    return {
        'folders': state.folders
    }
}

const mapDispatchToprops = () => {
    return {
        createFolderAndAddMedia,
        addMediaToExistingFolder
    }
}


export default connect(mapStateToProps, mapDispatchToprops())(AddMediaScreen);