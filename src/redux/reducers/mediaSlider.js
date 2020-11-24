import { REMEMBER_CURRENTLY_VIEWED_MEDIA_ITEM, TOGGLE_HEADER_VISIBILITY } from "../actions/mediaSlider";

const initialState = {
    currentlyViewedMediaItem: {},
    isHeaderVisible: true,
};

const mediaSliderReducer = (state = initialState, action) => {
    let updatedState = Object.assign({}, state);
    switch(action.type) {
        case REMEMBER_CURRENTLY_VIEWED_MEDIA_ITEM:
            updatedState.currentlyViewedMediaItem = action.payload.mediaItem;
            return updatedState;
        case TOGGLE_HEADER_VISIBILITY:
            updatedState.isHeaderVisible = !state.isHeaderVisible;
            return updatedState;
        default:
            return state;
    }
}

export default mediaSliderReducer;