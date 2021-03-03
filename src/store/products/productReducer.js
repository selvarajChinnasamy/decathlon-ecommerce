import {
    GET_PRODUCTS
} from "./productType";
import { products } from '../../mockData';

const initProducts = [...products];

const productReducer = (state = initProducts, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state
            };
        default:
            return state;
    }
};

export default productReducer;