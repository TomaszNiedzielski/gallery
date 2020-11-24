export const REMEMBER_CURRENTLY_VIEWED_MEDIA_ITEM = 'CURRENTLY_VIEWED_MEDIA_ITEM';
export const DOWNLOAD_MEDIA_ITEM = 'DOWNLOAD_MEDIA_ITEM';

export const rememberCurrentlyViewedMediaItem = mediaItem => {
    return {
        type: REMEMBER_CURRENTLY_VIEWED_MEDIA_ITEM,
        payload: {
            mediaItem: mediaItem
        }
    }
}

export const downloadMediaItem = () => {
    return dispatch => {
        console.log('download media item');
    }
}