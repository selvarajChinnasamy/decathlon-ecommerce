import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    RESET_CART,
    GET_CART_PRODUCTS
} from "./cartType";

export const addToCart = (product) => {
    return {
        type: ADD_TO_CART,
        payload: product
    };
};

export const gatCart = () => {
    return {
        type: GET_CART_PRODUCTS
    };
};

export const remove = productId => {
    return {
        type: REMOVE_FROM_CART,
        productId
    };
};

export const resetCart = () => {
    return {
        type: RESET_CART
    };
};