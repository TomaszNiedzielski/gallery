import AsyncStorage from "@react-native-community/async-storage";

export const CREATE_ACCESS_CODE = 'CREATE_ACCESS_CODE';
export const CREATE_ACCESS_CODE_SUCCESS = 'CREATE_ACCESS_CODE_SUCCESS';
export const REMOVE_ACCESS_CODE = 'REMOVE_ACCESS_CODE';
export const REMOVE_ACCESS_CODE_SUCCESS = 'REMOVE_ACCESS_CODE_SUCCESS';
export const RESTORE_ACCESS_CODE = 'RESTORE_ACCESS_CODE';
export const RESTORE_ACCESS_CODE_SUCCESS = 'RESTORE_ACCESS_CODE_SUCCESS';

export const createAccessCode = code => {
    return dispatch => {
        AsyncStorage.setItem('accessCode', code);
        dispatch(createAccessCodeSuccess(code));
    }
}

export const createAccessCodeSuccess = code => {
    console.log('createAccessCodeSuccess/actions: ', code);
    return {
        type: CREATE_ACCESS_CODE_SUCCESS,
        payload: {
            code: code
        }
    }
}

export const removeAccessCode = () => {
    return dispatch => {
        AsyncStorage.removeItem('accessCode');
        dispatch(removeAccessCodeSuccess());
    }
}

export const removeAccessCodeSuccess = () => {
    return {
        type: REMOVE_ACCESS_CODE_SUCCESS,
        payload: {
            code: ''
        }
    }
}

export const restoreAccessCode = () => {
    return async dispatch => {
        const accessCode = await AsyncStorage.getItem('accessCode');
        if(accessCode) {
            dispatch(restoreAccessCodeSuccess(accessCode));
        }
    }
}

export const restoreAccessCodeSuccess = accessCode => {
    return {
        type: RESTORE_ACCESS_CODE_SUCCESS,
        payload: {
            code: accessCode
        }
    }
}