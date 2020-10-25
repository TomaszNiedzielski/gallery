import { ADD_USER_DATA_TO_STORAGE } from "../actions/user";

let initialState = {};

const userReducer = (state = initialState, action) => {
    let updatedState;
    switch(action.type) {
        case ADD_USER_DATA_TO_STORAGE:
            updatedState = action.payload.userData;
            return updatedState;
        default:
            return state;
    }
}
export default userReducer;