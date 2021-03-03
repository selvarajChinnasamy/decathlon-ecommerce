import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import store from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import ProductListing from './pages/ProductListing';
import CartListing from "./pages/CartListing";
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import NavBar from './components/NavBar';
import Checkout from './pages/Checkout';

const AuthRoute = ({ children, ...rest }) => {
  const curentState = { ...store.getState() };
  return (
    <Route
      {...rest}
      render={({ location }) =>
        (curentState && curentState.user && curentState.user.id) ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <div className="outer">
            <NavBar />
            <Switch>
              <Route path="/" children={<ProductListing />} exact />
              <Route path="/mycart" children={<CartListing />} />
              <Route path="/login" children={<Login />} />
              <AuthRoute path="/checkout" children={<Checkout />} />
              <Route path="*" children={<NoMatch />} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
