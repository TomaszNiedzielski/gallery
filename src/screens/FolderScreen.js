import React from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';

import MediaList from '../components/lists/MediaList';
import Menu from '../components/modals/Menu';
import ChangeFolderNameManager from '../components/modals/ChangeFolderNameManager';
import DefaultHeaderBackground from '../components/headers/DefaultHeaderBackground';

import Icon from 'react-native-vector-icons/Entypo';

import { connect } from 'react-redux';
import { removeSelectedMediaFromState } from '../redux/actions/folders';
import { removeSelectedMediaFromCollection } from '../redux/actions/selectedMedia';
import { changeNumberOfColumnsInFolderLayout,
    restoreSettingsFromAsyncStorage,
    saveUpdatedSettingsInAsyncStorage
} from '../redux/actions/settings';

import { ApiUrl } from '../constans/ApiUrl';

class FolderScreen extends React.Component {
    constructor(props) {
        super(props);
        this.iconSize = 22;
        this.iconColor = 'white';

        this.state = {
            folderName: props.route.params.folderName,
            isMenuOpen: false,
            isChangeFolderNameManagerOpen: false,
            isRemovingEnabled: false,
        }
    }

    render() {
        const { folderName, isMenuOpen, isChangeFolderNameManagerOpen, isRemovingEnabled } = this.state;
        const { numberOfColumns } = this.props.settings.folder;
        return (
            <View style={styles.container}>
                <MediaList
                    folderName={folderName}
                    isRemovingEnabled={isRemovingEnabled}
                    navigation={this.props.navigation}
                    numberOfColumns={numberOfColumns}
                />
                {isMenuOpen &&
                    <Menu
                        onRequestClose={() => this.setState({ isMenuOpen: false })}
                        menuList={[{
                                name: numberOfColumns === 3 ? 'One column layout' : 'Three column layout',
                                onPressHandler: this.props.changeNumberOfColumnsInFolderLayout
                            }, {
                                name: 'Change folder name',
                                onPressHandler: this.openChangeFolderNameManager
                            }, {
                                name: 'Remove image',
                                onPressHandler: this.handleRemoveMediaManager
                            }
                        ]}
                    />}

                {isChangeFolderNameManagerOpen &&
                    <ChangeFolderNameManager
                        onRequestClose={(newNameValue) => this.setState({
                            isChangeFolderNameManagerOpen: !isChangeFolderNameManagerOpen,
                            folderName: newNameValue ? newNameValue : folderName
                        })}
                        folderName={folderName}
                    />}
            </View>
        );
    }

    componentDidMount() {
        this.props.restoreSettingsFromAsyncStorage();
        this.props.navigation.setOptions({
            title: this.state.folderName,
            headerTitleStyle: { color: this.iconColor },
            headerTintColor: this.iconColor,
            headerBackground: () => <DefaultHeaderBackground />,
            headerRight: () => (
                <View style={styles.headerRight}>
                    <Icon name="dots-three-vertical" size={this.iconSize} color={this.iconColor} onPress={() => this.setState({ isMenuOpen: !this.state.isMenuOpen })} />
                </View>
            )
        });
        // back button handler
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
        // remove selected items from reduces
        this.props.removeSelectedMediaFromCollection();
    }

    componentDidUpdate() {
        // Update folder name, updating this way may cause performace issues in the future.
        this.props.navigation.setOptions({
            title: this.state.folderName
        });
        this.props.saveUpdatedSettingsInAsyncStorage(this.props.settings);
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    openChangeFolderNameManager = () => {
        this.setState({ isChangeFolderNameManagerOpen: true })
    }

    handleRemoveMediaManager = () => {
        // Show checkboxes on media containers.
        const isRemovingEnabled = !this.state.isRemovingEnabled;
        this.setState({ isRemovingEnabled: isRemovingEnabled });

        // Add icon of trash to header.
        this.props.navigation.setOptions({
            headerRight: () => (
                (isRemovingEnabled === true ? <View>
                    <View style={styles.headerRight}>
                        <Icon name="trash" size={this.iconSize} color={this.iconColor} onPress={this.onTrashPressHandler} />
                    </View>
                </View> : 
                <View style={styles.headerRight}>
                    <Icon name="dots-three-vertical" size={this.iconSize} color={this.iconColor} onPress={() => this.setState({ isMenuOpen: !this.state.isMenuOpen })} />
                </View>)
            )
        });
    }

    onTrashPressHandler = () => {
        const { removeSelectedMediaFromState, removeSelectedMediaFromCollection, selectedMedia } = this.props;
        removeSelectedMediaFromState(selectedMedia, this.state.folderName);
        removeSelectedMediaFromCollection();

        // Remove images in server too.
        this.sendRemoveMediaRequest(selectedMedia);
        this.handleRemoveMediaManager();
    }

    sendRemoveMediaRequest(selectedMedia) {
        // Get only names from links.
        selectedMedia = selectedMedia.map(mediaLink => {
            return mediaLink.split('/').pop();
        });

        fetch(ApiUrl+'media/delete', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: this.props.user.token,
                selectedMediaNames: selectedMedia
            })
        })
        .then(() => {
            console.log('ok');
        })
        .catch(error => {
            console.log(error);
        });
    }

    backAction = () => {
        if(this.state.isRemovingEnabled) {
            this.handleRemoveMediaManager();
            this.props.removeSelectedMediaFromCollection(); // If something has been selected
            return () => null;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerRight: {
        marginHorizontal: 10
    }
});

const mapStateToProps = (state) => {
    return {
        selectedMedia: state.selectedMedia,
        user: state.user,
        settings: state.settings
    }
}

const mapDispatchToprops = () => {
    return {
        removeSelectedMediaFromState,
        removeSelectedMediaFromCollection,
        changeNumberOfColumnsInFolderLayout,
        restoreSettingsFromAsyncStorage,
        saveUpdatedSettingsInAsyncStorage
    }
}

export default connect(mapStateToProps, mapDispatchToprops())(FolderScreen);