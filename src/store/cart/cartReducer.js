import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    RESET_CART,
    GET_CART_PRODUCTS
} from "./cartType";

const initCart = [];

const cartReducer = (state = initCart, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return [...state, action.payload];
        case GET_CART_PRODUCTS:
            return {
                ...state
            };
        case REMOVE_FROM_CART:
            return state.filter((product) => product.id !== action.productId);
        case RESET_CART:
            return initCart;
        default:
            return state;
    }
};

export default cartReducer;