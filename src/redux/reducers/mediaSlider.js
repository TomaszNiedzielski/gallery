const { REMEMBER_CURRENTLY_VIEWED_MEDIA_ITEM } = require("../actions/mediaSlider");

/*
* Media slider model
* mediaSlider = {
*    currentlyViewedMediaItem: object,
*    isHeaderVisible: boolean,
* }
*/

const initialState = {};

const mediaSliderReducer = (state = initialState, action) => {
    let updatedState = Object.assign({}, state);
    switch(action.type) {
        case REMEMBER_CURRENTLY_VIEWED_MEDIA_ITEM:
            updatedState.currentlyViewedMediaItem = action.payload.mediaItem;
            return updatedState;
        default:
            return state;
    }
}

export default mediaSliderReducer;