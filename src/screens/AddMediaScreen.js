import React from 'react'
import { StyleSheet, View, Platform } from 'react-native';
import PropTypes from 'prop-types';

import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Entypo';

import ChooseFolderManager from '../components/modals/ChooseFolderManager';
import DefaultHeaderBackground from '../components/headers/DefaultHeaderBackground';
import MediaList from '../components/lists/MediaList';

import { connect } from 'react-redux';
import { createFolderAndAddMedia, addMediaToExistingFolder } from '../redux/actions/folders';

import { ApiUrl } from '../constans/ApiUrl';

class AddMediaScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedMedia: [],
            selectedFolder: null,
            folders: []
        }
    }

    render() {
        const { selectedMedia, folders } = this.state;
        return(
            <View style={styles.container}>
                {selectedMedia.length > 0 && <>
                    <MediaList media={selectedMedia} />
                    <ChooseFolderManager
                        selectedMedia={selectedMedia}
                        navigation={this.props.navigation}
                        selectFolder={folder => {this.setState({ selectedFolder: folder}); console.log(folder)}}
                        folders={folders}
                    />
                </>}
            </View>
        );
    }

    componentDidMount() {
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
            headerBackground: () => <DefaultHeaderBackground />,
        });
    }

    componentDidUpdate() {
        // build header
        const iconSize = 24;
        this.props.navigation.setOptions({
            headerRight: () => (
                this.state.selectedFolder &&
                <View style={styles.headerRight}>
                    <Icon name="check" size={iconSize} color='white' style={styles.headerIcon} onPress={() => this.dispatchSelectedMediaToApi()} />
                </View>
            )
        });
    }

    openPicker = mediaType => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: mediaType
        }).then(media => {
            if(media.length > 0) {
                this.setState({ selectedMedia: media });
            } else {
                this.props.navigation.goBack();
            }
        }).catch(e => {
            this.props.navigation.goBack();
        });
    }

    dispatchSelectedMediaToRedux() {
        const { selectedFolder, selectedMedia } = this.state;
        // after success dispatch to server all items
        // check if it is new folder or already existing
        const isThisExistingFolder = this.props.folders.find(folder => folder.name === selectedFolder);

        if(isThisExistingFolder === undefined) {
            const folder = {
                name: selectedFolder,
                media: selectedMedia
            }
            this.props.createFolderAndAddMedia(folder);
        } else {
            this.props.addMediaToExistingFolder(selectedFolder, selectedMedia);
        }
        this.props.navigation.navigate('HomeScreen');
        
    }

    dispatchSelectedMediaToApi = async () => {
        const { selectedMedia, selectedFolder } = this.state;
        
        selectedMedia.forEach(mediaItem => {

            let formData = new FormData();
            let extension = mediaItem.path.split('.').pop();
            let imgDetails = {};
            if (extension === 'png') {
                imgDetails = {
                    name: "image.png",
                    type: "image/png",
                }
            } else {
                imgDetails = {
                    name: "image.jpg",
                    type: "image/jpeg",
                }
            }

            formData.append("media", {
                ...imgDetails,
                uri: Platform.OS === "android" ? mediaItem.path : mediaItem.path.replace("file://", ""),
            });
            formData.append("api_token", this.props.user.token);
            formData.append("folderName", selectedFolder);
            console.log(formData);

            fetch(ApiUrl+'media/create', {
                method: 'POST',
                body: formData
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('responseJson: ', responseJson);
                console.log("media sent!");
                this.dispatchSelectedMediaToRedux();
            })
            .catch((e) => {
                console.log(e);
            });

        });
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
        folders: state.folders,
        user: state.user
    }
}

const mapDispatchToprops = () => {
    return {
        createFolderAndAddMedia,
        addMediaToExistingFolder
    }
}

export default connect(mapStateToProps, mapDispatchToprops())(AddMediaScreen);