import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import FoldersList from '../components/lists/FoldersList';
import DefaultHeaderBackground from '../components/headers/DefaultHeaderBackground';

import { connect } from 'react-redux';
import { setStateWithDataFromStorage } from '../redux/actions/folders';

class HomeScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <FoldersList />
            </View>
        );
    }

    componentDidMount() {
        const iconSize = 24;
        const iconColor = 'white';

        this.props.navigation.setOptions({
            title: 'Galeria',
            headerTitleStyle: {
                color: iconColor
            },
            headerTintColor: iconColor,
            headerRight: () => (
                <View style={styles.headerRight}>
                    <Icon name="video" size={iconSize} color={iconColor} style={styles.headerIcon} 
                        onPress={() => this.props.navigation.navigate('AddMediaScreen', {mediaType: 'video'})} />
                    <Icon name="images" size={iconSize} color={iconColor} style={styles.headerIcon}
                        onPress={() => this.props.navigation.navigate('AddMediaScreen', {mediaType: 'image'})} />
                </View>
            ),
            headerBackground: () => <DefaultHeaderBackground />,
        });

        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.saveReduxStateInStorage();
        });

        this.restoreData();
    }

    componentWillUnmount = () => this.unsubscribe();

    saveReduxStateInStorage = async () => await AsyncStorage.setItem('folders', JSON.stringify(this.props.folders));

    restoreData = async () => {
        let folders;
        folders = await AsyncStorage.getItem('folders');
        folders = JSON.parse(folders);

        // dispatch this data to reducer
        this.props.setStateWithDataFromStorage(folders);
    }

}

const mapStateToProps = (state) => {
    return {
        'folders': state.folders
    }
}

const mapDispatchToprops = () => {
    return {setStateWithDataFromStorage}
}

export default connect(mapStateToProps, mapDispatchToprops())(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerIcon: {
        marginHorizontal: 10
    }
});