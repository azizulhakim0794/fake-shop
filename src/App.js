// import { Home } from '@material-ui/icons';
import { CircularProgress, Grid } from '@material-ui/core';
import React, { Suspense } from 'react';
import { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Loading from './Component/CommonComponent/Loading/Loading';
export const UserContext = createContext()
const BuyNowProductForm = React.lazy(() => import('./Component/AllProductContent/BuyNowProductForm/BuyNowProductForm'));
const Login = React.lazy(() => import('./Component/Login/Login'));
const Header = React.lazy(() => import('./Component/CommonComponent/Header/Header'));
const Home = React.lazy(() => import('./Component/Home/Home'));
const PrivateRoute = React.lazy(() => import('./Component/Login/PrivateRoute/PrivateRoute'));
const UserOrderedProducts = React.lazy(() => import('./Component/AllProductContent/UserOrderedProducts/UserOrderedProducts'));
const Footer = React.lazy(() => import('./Component/CommonComponent/Footer/Footer'));
const ProductDetails = React.lazy(() => import('./Component/AllProductContent/ProductDetails/ProductDetails'));
const AddToCartProducts = React.lazy(() => import('./Component/AllProductContent/AddToCartProducts/AddToCartProducts'));
function App() {
  const [userDataInfo, setUserDataInfo] = useState({
    isSignedIn: false,
    email: "",
    photoURL: "",
    buyNowProductQuantity: 0,
    buyNowProductPrice: 0,
    AddToCartProductStates: false,
    shippingFee: 7
  })
  return (
    <Suspense fallback={<Loading/>}>
      <UserContext.Provider value={[userDataInfo, setUserDataInfo]}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/productDetails/:id">
              <ProductDetails />
            </Route>
            <Route path="/footer">
              <Footer />
            </Route>
            {/* <Route path="/buyNowT">
              <Loading/>
            </Route> */}
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/buyNow/:buyNowId">
              <BuyNowProductForm />
            </Route>
            <PrivateRoute path="/myOrderedProducts">
              <UserOrderedProducts />
            </PrivateRoute>
            <PrivateRoute path="/addToCart">
              <AddToCartProducts />
            </PrivateRoute>
            <Route path="*">
              <h3>this is no match  page</h3>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider >
    </Suspense>
  );
}

export default App;
