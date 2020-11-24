import {
    CHANGE_NUMBER_OF_COLUMNS_IN_FOLDER_LAYOUT,
    RESTORE_SETTINGS_FROM_ASYNC_STORAGE_SUCCESS
} from '../actions/settings';

const initialState = {
    folder: {
        numberOfColumns: 3
    }
};

const settingsReducer = (state = initialState, action) => {
    let updatedState = Object.assign({}, state);
    switch(action.type) {
        case CHANGE_NUMBER_OF_COLUMNS_IN_FOLDER_LAYOUT:
            updatedState.folder.numberOfColumns = state.folder.numberOfColumns === 3 ? 1 : 3;
            return updatedState;
        case RESTORE_SETTINGS_FROM_ASYNC_STORAGE_SUCCESS:
            return action.payload.settings;
        default:
            return state;
    }
}

export default settingsReducer;