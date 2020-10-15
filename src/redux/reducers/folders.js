import { ADD_MEDIA_TO_EXISTING_FOLDER, CREATE_FOLDER_AND_ADD_MEDIA, SET_STATE_WITH_DATA_FROM_STORAGE } from "../actions/folders";
import { AsyncStorage } from 'react-native';

let initialState = [];

// get data from local storage
let foldersFromStorage = [];
const restoreData = async () => {
    try {
        foldersFromStorage = await AsyncStorage.getItem('folders');
    } catch(errors) {
        console.log('errors', errors);
    }
}

restoreData();

if(foldersFromStorage.length > 0) {
    console.log('local storage istnieje kurwa');
    foldersFromStorage = JSON.parse(foldersFromStorage);
    //initialState = foldersFromStorage;
}

const foldersReducer = (state = initialState, action) => {
    let updatedState = state;

    switch(action.type) {
        case SET_STATE_WITH_DATA_FROM_STORAGE:
            console.log('to powinno być w sieci reduxa: ', action.payload.folders);
            return action.payload.folders;
        case CREATE_FOLDER_AND_ADD_MEDIA:
            updatedState = [action.payload, ...state];
            console.log('create folder', updatedState);

            // storeNewState(updatedState);

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

            // storeNewState(updatedState);
            
            console.log('new kurawa kaaska: ', updatedState);
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