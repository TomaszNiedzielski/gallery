import PropTypes from 'prop-types';

export const ADD_SELECTED_MEDIA_TO_COLLECTION = 'ADD_SELECTED_MEDIA_TO_COLLECTION';
export const REMOVE_SELECTED_MEDIA_FROM_COLLECTION = 'REMOVE_SELECTED_MEDIA_FROM_COLLECTION';

export const addSelectedMediaToCollection = mediaItemSource => {
    return {
        type: ADD_SELECTED_MEDIA_TO_COLLECTION,
        payload: {
            mediaItemSource: mediaItemSource
        }
    }
}

export const removeSelectedMediaFromCollection = mediaItemSource => {
    console.log('media item source in actions: ', mediaItemSource);
    return {
        type: REMOVE_SELECTED_MEDIA_FROM_COLLECTION,
        payload: {
            mediaItemSource: mediaItemSource
        }
    }
}

addSelectedMediaToCollection.propTypes = {
    mediaItem: PropTypes.String
}
