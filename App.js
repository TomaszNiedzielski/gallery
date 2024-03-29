/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';

import HomeScreen from './src/screens/HomeScreen';
import AddMediaScreen from './src/screens/AddMediaScreen';
import FolderScreen from './src/screens/FolderScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import AccessCodeScreen from './src/screens/AccessCodeScreen';
import EditAccessCodeScreen from './src/screens/EditAccessCodeScreen';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import foldersReducer from './src/redux/reducers/folders';
import selectedMediaReducer from './src/redux/reducers/selectedMedia';
import userReducer from './src/redux/reducers/user';
import accessCodeReducer from './src/redux/reducers/accessCode';
import settingsReducer from './src/redux/reducers/settings';
import mediaSliderReducer from './src/redux/reducers/mediaSlider';

const reducers = combineReducers({
    folders: foldersReducer,
    selectedMedia: selectedMediaReducer,
    user: userReducer,
    accessCode: accessCodeReducer,
    settings: settingsReducer,
    mediaSlider: mediaSliderReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

const Stack = createStackNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
                    <Stack.Screen name="AccessCodeScreen" component={AccessCodeScreen} />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    <Stack.Screen name="AddMediaScreen" component={AddMediaScreen} />
                    <Stack.Screen name="FolderScreen" component={FolderScreen} />
                    <Stack.Screen name="EditAccessCodeScreen" component={EditAccessCodeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
