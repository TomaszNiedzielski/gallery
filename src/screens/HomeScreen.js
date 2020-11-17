import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FoldersList from '../components/lists/FoldersList';
import DefaultHeaderBackground from '../components/headers/DefaultHeaderBackground';
import SlidingPopupBar from '../components/popups/SlidingPopupBar';
import Bubble from '../components/popups/Bubble';
import Menu from '../components/modals/Menu';

import { connect } from 'react-redux';
import { setStateWithDataFromStorage } from '../redux/actions/folders';

// test
import AutoRotateImageModal from '../components/modals/AutoRotateImageModal';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import HomeBackground from '../assets/HomeBackground.png';
import { ApiUrl } from '../constans/ApiUrl';

class HomeScreen extends React.Component {
    state = {
        isMenuVisible: false
    }

    render() {
        return (
            <View style={styles.container}>
                <FoldersList />
                <Bubble />
                <SlidingPopupBar />
                {/*<Image source={HomeBackground} style={{ height: '100%', width: '100%', position: 'absolute', zIndex: 0 }} />*/}
                {this.state.isMenuVisible && <Menu
                    style={{ left: 5, top: 5 }}
                    onRequestClose={() => this.setState({ isMenuVisible: false }) }
                    menuList={[ // to można też dać do reduxa
                        { name: 'Access Code', onPressHandler: () => this.props.navigation.navigate('EditAccessCodeScreen', { isAccessCodeCreating: true })},
                        { name: 'Logout', onPressHandler: () => {AsyncStorage.clear(), this.props.navigation.navigate('LoadingScreen')} }
                    ]}
                />}
            </View>
        );
    }

    componentDidMount() {
        const iconSize = 24;
        const iconColor = 'white';

        this.props.navigation.setOptions({
            title: 'Galeria',
            headerTitleStyle: [{color: iconColor}, styles.headerIcon],
            headerTintColor: iconColor,
            headerLeft: () => (
                <Ionicons name="settings-sharp" size={iconSize} color={iconColor} style={[{ marginLeft: 15 }, styles.headerIcon]} 
                onPress={() => this.setState({ isMenuVisible: !this.state.isMenuVisible })} />
            ),
            headerRight: () => (
                <View style={styles.headerRight}>
                    <Entypo name="video" size={iconSize} color={iconColor} style={styles.headerIcon} 
                        onPress={() => this.props.navigation.navigate('AddMediaScreen', {mediaType: 'video'})} />
                    <Entypo name="images" size={iconSize} color={iconColor} style={styles.headerIcon}
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
        flex: 1,
        // backgroundColor: 'white'
    },
    headerRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerIcon: {
        marginRight: 25,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
});