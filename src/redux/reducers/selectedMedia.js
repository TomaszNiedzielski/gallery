import { ADD_SELECTED_MEDIA_TO_COLLECTION, REMOVE_SELECTED_MEDIA_FROM_COLLECTION } from "../actions/selectedMedia";

const initialState = [];

const selectedMediaReducer = (state = initialState, action) => {
    let updatedState = state;

    switch(action.type) {
        case ADD_SELECTED_MEDIA_TO_COLLECTION:
            console.log('selected media before: ', updatedState);
            updatedState.push(action.payload.mediaItemSource);
            console.log('selected media after: ', updatedState);
            return updatedState;
        case REMOVE_SELECTED_MEDIA_FROM_COLLECTION:
            if(action.payload.mediaItemSource === undefined || action.payload.mediaItemSource === null) {
                updatedState = [];
                console.log('a mogłem skończyć studia, pies jebał mnie: ', updatedState);
                return updatedState;
            }
            updatedState = state.filter(mediaItem => mediaItem !== action.payload.mediaItemSource);
            console.log('after removing from selected collection: ', updatedState);
            return updatedState;
        default:
            return state;
    }
}

export default selectedMediaReducer;