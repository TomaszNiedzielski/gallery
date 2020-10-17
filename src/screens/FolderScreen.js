import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import MediaList from '../components/lists/MediaList';
import Menu from '../components/modals/Menu';

import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../constans/Colors';
import Icon from 'react-native-vector-icons/Entypo';

import ChangeFolderNameManager from '../components/modals/ChangeFolderNameManager';

export default class FolderScreen extends React.Component {

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
                    params={this.props.route.params}
                    isRemovingEnabled={isRemovingEnabled}
                />
                {isMenuOpen &&
                    <Menu
                        onRequestClose={() => this.setState({ isMenuOpen: false })}
                        menuList={[{
                                name: 'Change folder name',
                                onPressHandler: this.openChangeFolderNameManager
                            }, {
                                name: 'Remove image',
                                onPressHandler: this.openRemoveMediaManager
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
            headerBackground: () => (
                <LinearGradient
                    colors={Colors.gradient}
                    style={{ flex: 1 }}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                />
            ),
            headerRight: () => (
                <View style={styles.headerRight}>
                    <Icon name="dots-three-vertical" size={this.iconSize} color={this.iconColor} onPress={() => this.setState({ isMenuOpen: !this.state.isMenuOpen })} />
                </View>
            )
        });
    }

    componentDidUpdate() {
        // update folder name, updating this way may cause performace issues in the future
        this.props.navigation.setOptions({
            title: this.state.folderName
        });
    }

    openChangeFolderNameManager = () => {
        this.setState({ isChangeFolderNameManagerOpen: true })
    }

    openRemoveMediaManager = () => {
        // show checkboxes on media containers
        this.setState({ isRemovingEnabled: !this.state.isRemovingEnabled });

        // add icon of trash on the header
        this.props.navigation.setOptions({
            headerRight: () => (
                <View>
                    <View style={styles.headerRight}>
                        <Icon name="trash" size={this.iconSize} color={this.iconColor} onPress={() => {}} />
                    </View>
                </View>
            )
        });
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