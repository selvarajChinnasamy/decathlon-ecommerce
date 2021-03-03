import React, { useMemo } from "react";
import { addToCart, remove } from '../store';
import { connect } from 'react-redux';

const Product = ({ product, cart, addToCart, remove }) => {

    const avalableInCart = useMemo(() => {
        const isProductInCart = (cart && cart.length) ? cart.find((cartProduct) => product.id === cartProduct.id) : null;
        return (isProductInCart && isProductInCart.id) ? true : false;
    }, [cart, product]);

    const addOrRemoveProductFromCart = () => {
        if (avalableInCart) {
            remove(product.id);
        } else {
            addToCart(product);
        }
    }

    return (
        <div className="col-9 max-auto col-md-6 col-lg-3 my-3">
            <div className="card">
                <div className="img-container">
                    <img src={product.image} alt="product" className="card-img-top" />
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <p className="align-self-center mb-0">{product.title}</p>
                    <p className="price">₹{product.price}</p>
                    {avalableInCart ? <i onClick={() => addOrRemoveProductFromCart()} style={{ fontSize: '23px' }} className='fas fa-minus cart-icon' /> :
                        <i onClick={() => addOrRemoveProductFromCart()} style={{ fontSize: '23px' }} className='fas fa-cart-plus cart-icon' />}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        cart: state.cart,
        ...ownProps,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (product) => dispatch(addToCart(product)),
        remove: (productId) => dispatch(remove(productId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Product);