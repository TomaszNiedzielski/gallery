import React from 'react'
import { View, Text, Image, ScrollView, StyleSheet, AsyncStorage } from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import FoldersList from '../components/lists/FoldersList';

//import { AsyncStorage } from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { setStateWithDataFromStorage } from '../redux/actions/folders';

import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../constans/Colors';

class HomeScreen extends React.Component {

    state = {
        
    }

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
            headerRight: () => (
                <View style={styles.headerRight}>
                    <Icon name="video" size={iconSize} color={iconColor} style={styles.headerIcon} 
                        onPress={() => this.props.navigation.navigate('AddMediaScreen', {mediaType: 'video'})} />
                    <Icon name="images" size={iconSize} color={iconColor} style={styles.headerIcon}
                        onPress={() => this.props.navigation.navigate('AddMediaScreen', {mediaType: 'image'})} />
                </View>
            ),
            headerBackground: () => (
                <LinearGradient
                  colors={Colors.gradient}
                  style={{ flex: 1 }}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                />
            ),
        });

        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.saveReduxStateInStorage();
        });

        this.restoreData();

    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    async saveReduxStateInStorage() {
        console.log('save redux state');
        console.log(this.props.folders);
        await AsyncStorage.setItem('folders', JSON.stringify(this.props.folders));
    }

    restoreData = async () => {
        let folders;
        folders = await AsyncStorage.getItem('folders');
        folders = JSON.parse(folders);
        console.log('from storage: ', folders);
        // dispatch this data to reducer
        this.props.setStateWithDataFromStorage(folders);
    }

}

const mapStateToProps = (state) => {
    console.log('wszystkie foldery: ', state.folders);
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