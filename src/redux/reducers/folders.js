import { ADD_MEDIA_TO_EXISTING_FOLDER,
    CHANGE_FOLDER_NAME,
    CREATE_FOLDER_AND_ADD_MEDIA,
    SET_STATE_WITH_DATA_FROM_STORAGE,
    REMOVE_SELECTED_MEDIA_FROM_STATE
} from "../actions/folders";

import { AsyncStorage } from 'react-native';

let initialState = [];

const foldersReducer = (state = initialState, action) => {
    let updatedState = state;

    switch(action.type) {
        case SET_STATE_WITH_DATA_FROM_STORAGE:
            console.log('to powinno być w sieci reduxa: ', action.payload.folders);
            // hard update
            return action.payload.folders;
        case CREATE_FOLDER_AND_ADD_MEDIA:
            updatedState = [action.payload, ...state];
            return updatedState;
        case ADD_MEDIA_TO_EXISTING_FOLDER:
            updatedState = updatedState.map(folder => {
                if(folder.name === action.payload.folderName) {
                    folder = {
                        ...folder,
                        media: [...action.payload.media, ...folder.media]
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
        case REMOVE_SELECTED_MEDIA_FROM_STATE:
            //updatedState = updatedState.filter(folder => folder.media.path !== action.payload.);

            console.log('before removeing selected items: ', updatedState);

            console.log('payload: ', action.payload);

            const folderToRemoveItemsFrom = updatedState.find(folder => folder.name === action.payload.folderName);

            let updatedFolder = folderToRemoveItemsFrom;
            action.payload.selectedMedia.map(selectedMediaItem => {
                updatedFolder.media = updatedFolder.media.filter(mediaItem => mediaItem.path !== selectedMediaItem);
            });
            console.log('updated folder: ', updatedFolder);

            updatedState = updatedState.filter((folder) => {
                // if this is the same folder which we have updated and he has some unremoved media, let it go
                if(folder.name === updatedFolder.name && updatedFolder.media.length > 0) {
                    folder = {
                        ...updatedFolder
                    }
                    return folder;
                }
                // if the same folder, but doesn't have media in it, return nothing
                if(folder.name === updatedFolder.name && updatedFolder.media.length === 0) {
                    return;
                }
                // if this is normal folder return him
                return folder;
            });

            console.log('after removing selected: ', updatedState);

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