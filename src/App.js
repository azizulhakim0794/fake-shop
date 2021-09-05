// import { Home } from '@material-ui/icons';
import { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import ProductDetails from "./Component/AllProductContent/ProductDetails/ProductDetails";
import AddToCartProducts from "./Component/AllProductContent/AddToCartProducts/AddToCartProducts";
import Footer from "./Component/CommonComponent/Footer/Footer";
import Header from './Component/CommonComponent/Header/Header';
import Home from './Component/Home/Home';
import Login from "./Component/Login/Login";
import PrivateRoute from "./Component/Login/PrivateRoute/PrivateRoute";
// import PrivateRouteProductBuy from "./Component/Login/PrivateRouteProductBuy/PrivateRouteProductBuy";
import BuyNowProductForm from "./Component/AllProductContent/BuyNowProductForm/BuyNowProductForm";
import UserOrderedProducts from "./Component/AllProductContent/UserOrderedProducts/UserOrderedProducts";
export const UserContext = createContext()

function App() {
  const [userDataInfo, setUserDataInfo] = useState({
    isSignedIn: false,
    email: "",
    photoURL: "",
    buyNowProductQuantity:0,
    buyNowProductPrice:0,
    AddToCartProductStates:false,
    shippingFee:7
  })
  return (
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
          {/* <Route path="/buyNow">
            <ProductDetails />
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
  );
}

export default App;
