export const CREATE_FOLDER_AND_ADD_MEDIA = 'CREATE_FOLDER_AND_ADD_MEDIA';
export const ADD_MEDIA_TO_EXISTING_FOLDER = 'ADD_MEDIA_TO_EXISTING_FOLDER';
export const SET_STATE_WITH_DATA_FROM_STORAGE = 'SET_STATE_WITH_DATA_FROM_STORAGE';
export const CHANGE_FOLDER_NAME = 'CHANGE_FOLDER_NAME';

export const setStateWithDataFromStorage = folders => {
    return {
        type: SET_STATE_WITH_DATA_FROM_STORAGE,
        payload: {
            'folders': folders
        }
    }
}

export const createFolderAndAddMedia = folder => {
    return {
        type: CREATE_FOLDER_AND_ADD_MEDIA,
        payload: folder
    }
}

export const addMediaToExistingFolder = (folderName, selectedMedia) => {
    return {
        type: ADD_MEDIA_TO_EXISTING_FOLDER,
        payload: {
            'folderName': folderName,
            'media': selectedMedia
        }
    }
}

export const changeFolderName = (oldFolderName, newFolderName) => {
    return {
        type: CHANGE_FOLDER_NAME,
        payload: {
            oldFolderName: oldFolderName,
            newFolderName: newFolderName
        }
    }
}