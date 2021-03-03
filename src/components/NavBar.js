import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { removeUser } from "../store";

const NavBar = ({ user, cart, removeUser }) => {
    const isUserLoggedIn = useMemo(() => {
        return (user && user.id) ? true : false;
    }, [user]);

    const logout = () => {
        localStorage.removeItem("authUser");
        removeUser();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
                <Link className="navbar-brand" to={"/"}>Decathlon</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            {!isUserLoggedIn ?
                                <Link className="nav-link" to={"login"}>Login</Link> :
                                <div className="navbar-brand">
                                    <p className="user-name">{user.displayName}</p>
                                </div>}
                        </li>
                        {isUserLoggedIn && <li className="nav-item">
                            <div className="nav-link">
                                <p style={{cursor: 'pointer', fontSize: '17px'}} onClick={() => logout()} className="user-name">Logout</p>
                            </div>
                        </li>}
                        <li className="nav-item">
                            <Link className="nav-link" to={"mycart"}>Cart<i className="fas fa-cart-plus" />{(cart && cart.length) ? <span className="badge badge-pill badge-danger">{cart.length}</span> : null}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
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
        removeUser: () => dispatch(removeUser())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar);