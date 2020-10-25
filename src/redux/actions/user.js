export const ADD_USER_DATA_TO_STORAGE = 'ADD_USER_DATA_TO_STORAGE';

export const addUserDataToStorage = userData => {
    return {
        type: ADD_USER_DATA_TO_STORAGE,
        payload: {
            userData: userData
        }
    }
}