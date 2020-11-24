import { ADD_MEDIA_TO_EXISTING_FOLDER,
    CHANGE_FOLDER_NAME,
    CREATE_FOLDER_AND_ADD_MEDIA,
    SET_STATE_WITH_DATA_FROM_STORAGE,
    REMOVE_SELECTED_MEDIA_FROM_STATE
} from "../actions/folders";

let initialState = [];

const foldersReducer = (state = initialState, action) => {
    let updatedState = state;
    switch(action.type) {
        case SET_STATE_WITH_DATA_FROM_STORAGE:
            return action.payload.folders;
        case CREATE_FOLDER_AND_ADD_MEDIA:
            return [action.payload, ...state];
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
            updatedState = updatedState.map(folder => {
                if(folder.name === oldFolderName) {
                    folder = {
                        ...folder,
                        name: newFolderName
                    }
                }
                return folder;
            });
            return updatedState;
        case REMOVE_SELECTED_MEDIA_FROM_STATE:
            const folderToRemoveItemsFrom = updatedState.find(folder => folder.name === action.payload.folderName);

            let updatedFolder = folderToRemoveItemsFrom;
            action.payload.selectedMedia.map(selectedMediaItem => {
                updatedFolder.media = updatedFolder.media.filter(mediaItem => mediaItem.path !== selectedMediaItem);
            });

            updatedState = updatedState.filter((folder) => {
                // If this is the same folder which we have updated and he has some unremoved media, let it go
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
            return updatedState;
        default:
            return state;
    }
}

export default foldersReducer;