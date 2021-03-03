import {
    SET_USER,
    REMOVE_USER
} from "./userType";

const user = localStorage.getItem('authUser');
const initUser = user ? JSON.parse(user) : {};

const userReducer = (state = initUser, action) => {
    switch (action.type) {
        case SET_USER:
            return action.user;
        case REMOVE_USER:
            return {};
        default:
            return state;
    }
};

export default userReducer;