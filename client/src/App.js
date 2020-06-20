import React from "react";
import "antd/dist/antd.css";
import Navbar from "./Components/Navbar";
import Navtest from "./Components/Navtest";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Admin from "./Components/Admin";
import Manage from "./Components/Manage";
import Shop from "./Components/Shop";
import ProductDetails from "./Components/ProductDetails";
import UserProfile from "./Components/UserProfile";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";
import { BrowserRouter as Router, Route } from "react-router-dom";
import EditProduct from "./Components/EditProduct";
import Cart from "./Components/Cart";
import Wishlist from "./Components/Wishlist";
import Payment from "./Components/Payment";
import Orders from "./Components/Orders";

function App() {
  return (
    <Router>
      <Navtest />
      <Route exact path="/" component={Shop} />
      <Route path="/shop/:productId" component={ProductDetails} />
      <UnPrivateRoute path="/login" component={Login} />
      <UnPrivateRoute path="/register" component={Register} />
      <PrivateRoute
        path="/admin/managers"
        roles={["admin"]}
        component={Admin}
      />
      <PrivateRoute path="/admin/users" roles={["admin"]} component={Admin} />
      <PrivateRoute
        path="/admin/categories"
        roles={["admin"]}
        component={Admin}
      />
      <PrivateRoute
        path="/manage/products"
        roles={["manager"]}
        component={Manage}
      />
      <PrivateRoute
        path="/manage/orders"
        roles={["manager"]}
        component={Manage}
      />
      <PrivateRoute
        path="/user/profile"
        roles={["user"]}
        component={UserProfile}
      />
      <PrivateRoute
        path="/user/orders"
        roles={["user"]}
        component={UserProfile}
      />
      <PrivateRoute path="/cart" roles={["user"]} component={Cart} />
      <PrivateRoute path="/wishlist" roles={["user"]} component={Wishlist} />
      <PrivateRoute path="/payment" roles={["user"]} component={Payment} />
      <PrivateRoute
        path="/edit/:id"
        roles={["manager"]}
        component={EditProduct}
      />
    </Router>
  );
}

export default App;
