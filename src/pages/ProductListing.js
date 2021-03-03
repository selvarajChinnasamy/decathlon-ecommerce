import React, { useEffect, useState } from "react";
import { getProducts, addToCart } from '../store';
import { connect } from 'react-redux';

import Product from '../components/Product';
import { categories } from "../mockData";

const ProductListing = ({ storeProducts }) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(storeProducts);
    }, [storeProducts]);

    const getProductsByCategory = (categoryId) => {
        return products.filter(product => (product.categoryId === categoryId))
    }

    const plotByCategory = (category) => {
        const categoryItems = getProductsByCategory(category.id);
        if (categoryItems && categoryItems.length) {
            return (
                <div key={category.id}>
                    <h1 className="category-title">{category.name}</h1>
                    <div className="row">
                        {categoryItems.map(item => <Product isCartPage={false} key={item.id} product={item} />)}
                    </div>
                </div>
            );
        }
        return null;
    }

    return (
        <div className="product-list">
            {!(products && products.length) && <h1 className="category-title">No products found!</h1>}
            {categories.map((category) => plotByCategory(category))}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        storeProducts: state.products,
        cart: state.cart,
        ...ownProps,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => dispatch(getProducts()),
        addToCart: (product) => dispatch(addToCart(product))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductListing)