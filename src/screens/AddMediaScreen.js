import React from 'react'
import { StyleSheet, View, Platform } from 'react-native';

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
            mediaType: mediaType,
        }).then(async media => {
            if(mediaType === 'image') {
                // Open cropper for every selected image.
                let index = 0;
                let croppedMedia = media;
                const openCropper = async(index) => {
                    ImagePicker.openCropper({
                        path: media[index].path,
                    }).then(image => {
                        croppedMedia[index] = image;
                        // If not every images are edited the repeat function for the next image.
                        if(index < media.length-1) {
                            index++;
                            openCropper(index);
                        } else {
                            // If every item has been edited then set state with edited media.
                            this.setState({ selectedMedia: croppedMedia });
                        }
                    });
                }
                openCropper(index);
            } else { 
                // If media item is an video we currently cannot edit him.
                this.setState({ selectedMedia: media });
            }
        }).catch(e => {
            // If action is back or any error occured we need to go back to home screen.
            this.props.navigation.goBack();
        });
    }

    dispatchSelectedMediaToApi = async () => {
        const { selectedMedia, selectedFolder } = this.state;

        // Make separate call for every media item.
        selectedMedia.forEach((mediaItem, index) => {

            let formData = new FormData();
            let extension = mediaItem.path.split('.').pop();
            let mediaDetails = {};
            if (extension === 'png') {
                mediaDetails = {
                    name: "image.png",
                    type: "image/png",
                }
            } else if(extension === 'jpg') {
                mediaDetails = {
                    name: "image.jpg",
                    type: "image/jpeg",
                }
            } else if(extension === 'mp4') {
                mediaDetails = {
                    name: "video.mp4",
                    type: "video/mp4"
                }
            }

            formData.append("media", {
                ...mediaDetails,
                uri: Platform.OS === "android" ? mediaItem.path : mediaItem.path.replace("file://", ""),
            });
            formData.append("api_token", this.props.user.token);
            formData.append("folderName", selectedFolder);
            formData.append("height", mediaItem.height);
            formData.append("width", mediaItem.width);

            fetch(ApiUrl+'media/create', {
                method: 'POST',
                body: formData
            })
            .then((response) => response.text())
            .then((responseJson) => {
                // if media item is uploaded set status as uploaded
                console.log("kod", responseJson);
                this.afterUploadToApi(true);
            })
            .catch((e) => {
                console.log(e);
                this.afterUploadToApi(false);
            });

        });

        // we can dispatch now to props but function isEveryItemUploaded supposed to be better
        this.dispatchSelectedMediaToRedux();
    }

    afterUploadToApi = (isItemUploaded) => {
        let updatedSelectedMedia = this.state.selectedMedia;
        updatedSelectedMedia[index].uploaded = isItemUploaded;
        this.setState({ selectedMedia: updatedSelectedMedia });
        this.isEveryItemUploaded();
    }

    isEveryItemUploaded = () => {
        const { selectedMedia } = this.state;
        console.log("isEveryItemUploaded media state: ", selectedMedia);
        selectedMedia.forEach(selectedItem => {
            console.log('selected item uploaded: ', selectedItem.uploaded);
            if(selectedItem.uploaded === true) {
                console.log('this item is uploaded: ', selectedItem);
            } else if(selectedItem.uploaded === false) {
                console.log('There was no error when upload');
                alert("Something went wrong!");
            } else if(selectedItem.uploaded === undefined) {
                console.log('caly czas kurwa undefined');
            }
        });
    }

    dispatchSelectedMediaToRedux() {
        const { selectedFolder, selectedMedia } = this.state;
        // After success dispatch to server all items

        // Check if it is new folder or already existing
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