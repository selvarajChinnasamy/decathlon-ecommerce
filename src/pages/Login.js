import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { users } from "../mockUsers";
import { setUser } from "../store";

const Login = ({ setUser }) => {
    const history = useHistory();
    const [email, setEmail] = useState('selvaraj@test.com');
    const [password, setPassword] = useState('1234');
    const [formSubmitted, setFormSubmitted] = useState(false);

    const isFormValid = () => {
        return (email && email.trim().length && password && password.trim().length);
    }

    const submitLogin = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        const logdedInUser = users.find(user => (user.email === email && user.password === password));
        if (logdedInUser && logdedInUser.id) {
            localStorage.setItem("authUser", JSON.stringify(logdedInUser));
            setUser(logdedInUser);
            history.push('/');
            return;
        }
    }

    return (
        <div className="inner">
            <form onSubmit={submitLogin}>
                <h3>Log in</h3>
                <div className="form-group">
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter password" />
                </div>
                {formSubmitted && <div className="alert alert-danger" role="alert">
                    check user name and password!</div>}
                <button disabled={!isFormValid()} type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
            </form>
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
        setUser: (user) => dispatch(setUser(user))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);