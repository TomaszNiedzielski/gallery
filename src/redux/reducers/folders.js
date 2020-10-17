import { ADD_MEDIA_TO_EXISTING_FOLDER, CHANGE_FOLDER_NAME, CREATE_FOLDER_AND_ADD_MEDIA, SET_STATE_WITH_DATA_FROM_STORAGE } from "../actions/folders";
import { AsyncStorage } from 'react-native';

let initialState = [];

const foldersReducer = (state = initialState, action) => {
    let updatedState = state;

    switch(action.type) {
        case SET_STATE_WITH_DATA_FROM_STORAGE:
            console.log('to powinno być w sieci reduxa: ', action.payload.folders);
            return action.payload.folders;
        case CREATE_FOLDER_AND_ADD_MEDIA:
            updatedState = [action.payload, ...state];
            return updatedState;
        case ADD_MEDIA_TO_EXISTING_FOLDER:
            const folderIndex = updatedState.findIndex((folder => folder.name === action.payload.folderName));
            updatedState = updatedState.map(folder => {
                if(folder.name === action.payload.folderName) {
                    folder = {
                        ...folder,
                        media: [...folder.media, ...action.payload.media]
                    }
                }
                return folder;
            });
            return updatedState;
        case CHANGE_FOLDER_NAME:
            const { oldFolderName, newFolderName } = action.payload;
            // update folder name
            updatedState = updatedState.map(folder => {
                if(folder.name === oldFolderName) {
                    folder = {
                        ...folder,
                        name: newFolderName
                    }
                    console.log('doszło do zmiany: ', folder);
                }
                return folder;
            });
            return updatedState;
        default:
            return state;
    }
}

const storeNewState = async updatedState => {
    //update local storage
    try {
        await AsyncStorage.setItem('folders', JSON.stringify(updatedState));
    } catch(errors) {

    }
}

export default foldersReducer;