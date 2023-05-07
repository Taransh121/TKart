import React, { useEffect } from "react";
import { HomePage } from './Containers/Home/HomePage';
import { ProductType } from './Containers/Product/ProductType';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "./actions/categoryAction";
import { isUserLoggedIn } from "./actions/authActions";
import { ProductDetailsPage } from "./Containers/Product/ProductDetailsPage";
import { CartPage } from "./Containers/Cart/CartPage";
import { updateCart } from "./actions/cartAction";
import CheckoutPage from "./Containers/Checkout/CheckoutPage";
import { Order } from "./Containers/Order/Order";
// import { CheckoutPage } from "./Containers/CheckoutPage";


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getAllCategory())
  })
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    // eslint-disable-next-line
  }, [auth.authenticate])

  useEffect(() => {
    dispatch(updateCart())
    // eslint-disable-next-line
  }, [auth.authenticate])

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/account/orders" component={Order}/>
          <Route path="/:productName/:productId/p" component={ProductDetailsPage} />
          <Route path="/:name" component={ProductType} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
