import {
    SET_USER,
    REMOVE_USER
} from "./userType";

export const setUser = (user) => {
    return {
        type: SET_USER,
        user
    };
};

export const removeUser = () => {
    return {
        type: REMOVE_USER
    };
};