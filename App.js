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
import {
     AsyncStorage
} from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import AddMediaScreen from './src/screens/AddMediaScreen';
import FolderScreen from './src/screens/FolderScreen';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import foldersReducer from './src/redux/reducers/folders';
import selectedMediaReducer from './src/redux/reducers/selectedMedia'; 

const reducers = combineReducers({
    folders: foldersReducer,
    selectedMedia: selectedMediaReducer
});

const store = createStore(reducers);

const Stack = createStackNavigator();


const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    <Stack.Screen name="AddMediaScreen" component={AddMediaScreen} />
                    <Stack.Screen name="FolderScreen" component={FolderScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
