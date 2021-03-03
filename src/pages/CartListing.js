import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Product from '../components/Product';
import { categories } from "../mockData";


const CartListing = ({ cart }) => {

    const getProductsByCategory = (categoryId) => {
        return cart.filter(product => (product.categoryId === categoryId))
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
            {cart && cart.length ? <Link className="navbar-brand" to={"/checkout"}> <button type="button" className="btn btn-secondary checkout">Checkout</button></Link> : null}
            {cart && cart.length ? <div>{categories.map((category) => plotByCategory(category))}</div> : <div> <h1 className="category-title">No products found!</h1></div>}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        cart: state.cart,
        ...ownProps,
    };
};

export default connect(
    mapStateToProps,
    null
)(CartListing)