import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { addUserDataToStorage } from '../redux/actions/user';
import { restoreAccessCode } from '../redux/actions/accessCode';

class LoadingScreen extends React.Component {

    render() {
        return(
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    componentDidMount() {
        this.isLoggedIn();
        this.props.navigation.setOptions({
            headerShown: false
        });
    }

    isLoggedIn = async () => {
        // AsyncStorage.clear();
        try {
            let userData = await AsyncStorage.getItem('userData');
            if(userData) {
                userData = JSON.parse(userData);
                this.props.addUserDataToStorage(userData);
                this.isAccessCodeSet();
            } else {
                this.props.navigation.replace('LoginScreen');
            }
        } catch(e) {
            console.log(e);
            alert('error');
        }
    }

    isAccessCodeSet = async () => {
        this.props.restoreAccessCode();
        let accessCode = await AsyncStorage.getItem('accessCode');
        if(accessCode) {
            this.props.navigation.replace('AccessCodeScreen', {accessCode: accessCode});
        } else {
            this.props.navigation.replace('HomeScreen');
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = (state) => {
    return {
        token: state.user.token
    }
}

const mapDispatchToProps = () => {
    return {
        addUserDataToStorage, restoreAccessCode
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(LoadingScreen);