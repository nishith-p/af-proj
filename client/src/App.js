import React from "react";
import Navbar from "./Components/Navbar";
import Navtest from "./Components/Navtest";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Orders from "./Components/Orders";
import Admin from "./Components/Admin";
import Manage from "./Components/Manage";
import RegisterMan from "./Components/RegisterMan";
import UserProfile from "./Components/UserProfile";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navtest />
      <Route exact path="/" component={Home} />
      <UnPrivateRoute path="/login" component={Login} />
      <UnPrivateRoute path="/register" component={Register} />
      <PrivateRoute
        path="/orders"
        roles={["user", "admin"]}
        component={Orders}
      />
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
        path="/user/profile"
        roles={["user"]}
        component={UserProfile}
      />
    </Router>
  );
}

export default App;
