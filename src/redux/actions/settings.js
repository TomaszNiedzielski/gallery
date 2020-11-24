import AsyncStorage from "@react-native-community/async-storage";

export const CHANGE_NUMBER_OF_COLUMNS_IN_FOLDER_LAYOUT = 'CHANGE_NUMBER_OF_COLUMNS_IN_FOLDER_LAYOUT';
export const RESTORE_SETTINGS_FROM_ASYNC_STORAGE_SUCCESS = 'RESTORE_SETTINGS_FROM_ASYNC_STORAGE_SUCCESS';

export const changeNumberOfColumnsInFolderLayout = () => {
    return {
        type: CHANGE_NUMBER_OF_COLUMNS_IN_FOLDER_LAYOUT
    }
}

export const restoreSettingsFromAsyncStorage = () => {
    return async dispatch => {
        let settings = await AsyncStorage.getItem('settings');
        console.log('setajngs: ', settings);
        if(settings) {
            settings = JSON.parse(settings);
            dispatch(restoreSettingsFromAsyncStorageSuccess(settings));
        }
    }
}

export const restoreSettingsFromAsyncStorageSuccess = (settings) => {
    return {
        type: RESTORE_SETTINGS_FROM_ASYNC_STORAGE_SUCCESS,
        payload: {
            settings: settings
        }
    }
}

export const saveUpdatedSettingsInAsyncStorage = (settings) => {
    return dispatch => {
        AsyncStorage.setItem('settings', JSON.stringify(settings));
    }
}