import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, BackHandler } from 'react-native';

import MediaList from '../components/lists/MediaList';
import Menu from '../components/modals/Menu';
import ChangeFolderNameManager from '../components/modals/ChangeFolderNameManager';
import DefaultHeaderBackground from '../components/headers/DefaultHeaderBackground';

import Icon from 'react-native-vector-icons/Entypo';

import { connect } from 'react-redux';
import { removeSelectedMediaFromState } from '../redux/actions/folders';
import { removeSelectedMediaFromCollection } from '../redux/actions/selectedMedia';

class FolderScreen extends React.Component {

    constructor(props) {
        super(props);

        this.iconSize = 22;
        this.iconColor = 'white';

        this.state = {
            folderName: props.route.params.folderName,
            isMenuOpen: false,
            isChangeFolderNameManagerOpen: false,
            isRemovingEnabled: false
        }
    }

    render() {
        const { folderName, isMenuOpen, isChangeFolderNameManagerOpen, isRemovingEnabled } = this.state;
        return (
            <View style={styles.container}>
                <MediaList
                    folderName={folderName}
                    isRemovingEnabled={isRemovingEnabled}
                    navigation={this.props.navigation}
                />
                {isMenuOpen &&
                    <Menu
                        onRequestClose={() => this.setState({ isMenuOpen: false })}
                        menuList={[{
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
                            folderName: newNameValue ? newNameValue : ''
                        })}
                        folderName={folderName}
                    />}
            </View>
        );
    }

    componentDidMount() {
        const iconSize = 22;
        const iconColor = 'white';
        this.props.navigation.setOptions({
            title: this.state.folderName,
            headerTitleStyle: {
                color: iconColor
            },
            headerTintColor: iconColor,
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
        // update folder name, updating this way may cause performace issues in the future
        this.props.navigation.setOptions({
            title: this.state.folderName
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    openChangeFolderNameManager = () => {
        this.setState({ isChangeFolderNameManagerOpen: true })
    }

    handleRemoveMediaManager = () => {
        // show checkboxes on media containers
        const isRemovingEnabled = !this.state.isRemovingEnabled;
        this.setState({ isRemovingEnabled: isRemovingEnabled });

        // add icon of trash on the header
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

        this.handleRemoveMediaManager();
    }

    backAction = () => {
        if(this.state.isRemovingEnabled) {
            this.handleRemoveMediaManager();
            this.props.removeSelectedMediaFromCollection(); // if something has been selected
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
        selectedMedia: state.selectedMedia
    }
}

const mapDispatchToprops = () => {
    return {
        removeSelectedMediaFromState,
        removeSelectedMediaFromCollection
    }
}

export default connect(mapStateToProps, mapDispatchToprops())(FolderScreen);