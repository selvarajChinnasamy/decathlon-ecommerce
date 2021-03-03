import React, { useState } from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { resetCart } from "../store";

const Checkout = ({ cart, user, resetCart }) => {
    const history = useHistory();
    const [cartItems, setCartItems] = useState([]);

    useState(() => {
        setCartItems(cart.map((item) => {
            return ({
                ...item,
                count: 1
            });
        }));
    }, [cart]);

    const resetAndNavToProducts = () => {
        resetCart();
        history.push('/');
    }

    const addCount = (id) => {
        setCartItems((preState) => {
            return preState.map(item => {
                if (item.id === id) {
                    return { ...item, count: item.count++ };
                }
                return item;
            })
        });
    }

    const reduceCount = (id) => {
        setCartItems((preState) => {
            return preState.map(item => {
                if (item.id === id) {
                    return { ...item, count: item.count === 0 ? 0 : item.count-- };
                }
                return item;
            })
        });
    }

    const plotRow = (item) => {
        return (
            <div key={item.id} className="row">
                <div className="col">
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                </div>
                <div className="col-md-auto">
                    <p className="add-remove">₹{(item.price * item.count).toFixed(2)}</p>
                </div>
                <div className="col-md-auto">
                    <div className="row">
                        <p className="add-remove">{item.count}</p>
                        <span onClick={() => reduceCount(item.id)} className="badge badge-primary add-remove">-</span>
                        <span onClick={() => addCount(item.id)} className="badge badge-primary add-remove">+</span>
                    </div>
                </div>
            </div>
        );
    }

    const calcTotalPrice = () => {
        let price = 0;
        cartItems.forEach(item => {
            price += (item.price * item.count);
        });
        return price;
    }

    return (
        <div style={{ margin: '20px' }} className="row product-list">
            <div className="product-list col checkout-page">
                <div style={{ margin: '20px' }}>
                    {cartItems.map(item => plotRow(item))}
                </div>
            </div>
            <div className="product-list col-lg-2 checkout-page">
                <strong>Order Summary</strong>
                <p>Total: {calcTotalPrice().toFixed(2)}</p>
                {calcTotalPrice() ? <button onClick={() => resetAndNavToProducts()} type="button" className="btn btn-success">Confirm</button> : null}
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        cart: state.cart,
        ...ownProps,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetCart: () => dispatch(resetCart())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Checkout);