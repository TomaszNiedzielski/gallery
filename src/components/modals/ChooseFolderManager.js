import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableNativeFeedback, TextInput, Modal, AsyncStorage } from 'react-native';

const FolderItem = ({item, onSelectFolder, selectedFolderName}) => (
    <TouchableNativeFeedback onPress={() => onSelectFolder(item.name)}>
        <Text style={[styles.folder, selectedFolderName === item.name && styles.selectedFolder]}>
            {item.name} ({item.media.length})
        </Text>
    </TouchableNativeFeedback>
)

export default class ChooseFolderManager extends React.Component {

    state = {
        foldersList: [],
        newFolderName: '',
        selectedFolderName: ''
    }

    render() {
        const { foldersList, newFolderName, selectedFolderName } = this.state;
        return (
            
                <View style={styles.wrapper}>
                    <View style={styles.container}>
                        <View style={styles.addFolderWrapper}>
                        <Text style={styles.title}>Choose a folder</Text>
                            <TextInput
                                placeholder="Create new folder"
                                onChangeText={text => this.onTypingFolderName(text)}
                                style={styles.input}
                            />
                        </View>
                        {newFolderName.length > 0 &&
                            <FolderItem
                                onSelectFolder={this.onSelectFolder}
                                item={{name: newFolderName, media: []}}
                                selectedFolderName={selectedFolderName}
                            />
                        }
                        {foldersList.length > 0 ?
                            <FlatList
                                data={foldersList}
                                keyExtractor={item => item.name}
                                renderItem={({ item }) => (
                                    <FolderItem
                                        onSelectFolder={this.onSelectFolder}
                                        item={item}
                                        selectedFolderName={selectedFolderName}
                                    />
                                )}
                            />
                        : null}
                    </View>
                </View>
            
        );
    }

    componentDidMount() {
        this.setState({ foldersList: this.props.folders });
    }

    onTypingFolderName(text) {
        this.setState({ newFolderName: text });
        if(text.length > 0) {
            this.setState({ selectedFolderName: text });
            this.props.selectFolder(text);
        } else {
            this.setState({ selectedFolderName: null });
            this.props.selectFolder(null);
        }
    }

    onSelectFolder = folderName => {
        this.setState({ selectedFolderName: folderName });
        this.props.selectFolder(folderName);
    }

}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        justifyContent: 'center',
        zIndex: 100
    },
    container: {
        marginHorizontal: 40,
        elevation: 20,
        borderRadius: 10,
        zIndex: 100,
        backgroundColor: 'white',
        height: 250
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    folder: {
        fontSize: 17,
        marginHorizontal: 20,
        marginVertical: 7,
        color: 'gray',
        padding: 5
    },
    selectedFolder: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    addFolderWrapper: {
        marginHorizontal: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 50,
        paddingHorizontal: 20
    }
});