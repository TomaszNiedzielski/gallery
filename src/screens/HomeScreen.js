import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/Entypo';

import FoldersList from '../components/lists/FoldersList';
import DefaultHeaderBackground from '../components/headers/DefaultHeaderBackground';
import SlidingPopupBar from '../components/popups/SlidingPopupBar';

import { connect } from 'react-redux';
import { setStateWithDataFromStorage } from '../redux/actions/folders';

// test
import AutoRotateImageModal from '../components/modals/AutoRotateImageModal';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import HomeBackground from '../assets/HomeBackground.png';
import { ApiUrl } from '../constans/ApiUrl';

class HomeScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                {<FoldersList />
                //<AutoRotateImageModal />
                //<SlidingPopupBar />
                
               // <Image source={HomeBackground} style={{ height: '100%', width: '100%', position: 'absolute', zIndex: 0 }} />
            }
                
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
        //AsyncStorage.clear();
        //this.props.navigation.navigate('LoadingScreen');
    }

    componentWillUnmount = () => this.unsubscribe();

    saveReduxStateInStorage = async () => await AsyncStorage.setItem('folders', JSON.stringify(this.props.folders));

    restoreData = async () => {
        let folders;
        folders = await AsyncStorage.getItem('folders');
        if(folders && folders !== '[]') {
            folders = JSON.parse(folders);
            console.log('co za folders: ', folders);

            // dispatch this data to reducer
            this.props.setStateWithDataFromStorage(folders);
        }
        this.fetchFoldersDataFromApi();
    }

    fetchFoldersDataFromApi() {
        console.log('fetching...');
        fetch(ApiUrl+'media/load', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: this.props.user.token
            })
        })
        .then(response => response.json())
        .then(responseJson => {
            
            console.log('media from api: ', responseJson);
            this.props.setStateWithDataFromStorage(responseJson);
        })
        .catch(error => {
            console.log(error);
        });
    }

}

const mapStateToProps = (state) => {
    return {
        folders: state.folders,
        user: state.user
    }
}

const mapDispatchToprops = () => {
    return { setStateWithDataFromStorage }
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