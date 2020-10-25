import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { addUserDataToStorage } from '../redux/actions/user';

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
    }

    isLoggedIn = async () => {
        try {
            let userData = await AsyncStorage.getItem('userData');
            if(userData) {
                userData = JSON.parse(userData);
                this.props.addUserDataToStorage(userData);
                this.props.navigation.replace('HomeScreen');
            } else {
                this.props.navigation.replace('LoginScreen');
            }
        } catch(e) {
            console.log(e);
            alert('error');
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
        addUserDataToStorage
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(LoadingScreen);