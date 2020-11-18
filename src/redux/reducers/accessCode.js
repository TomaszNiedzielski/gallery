import { CREATE_ACCESS_CODE_SUCCESS, REMOVE_ACCESS_CODE_SUCCESS, RESTORE_ACCESS_CODE_SUCCESS } from "../actions/accessCode";

const initialState = '';

const accessCodeReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_ACCESS_CODE_SUCCESS: 
        case REMOVE_ACCESS_CODE_SUCCESS:
        case RESTORE_ACCESS_CODE_SUCCESS:
            console.log('access code in reducer: ', action);
            return action.payload.code;
        default:
            console.log('switch default performance: ', action);
            return state;
    }
}

export default accessCodeReducer;