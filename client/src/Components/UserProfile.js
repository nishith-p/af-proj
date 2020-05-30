import React from "react";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import Orders from "./Orders";
import PrivateRoute from "../hocs/PrivateRoute";

const UserProfile = () => (
  <div className="container">
    <div className="row">
      <div className="col-sm-2">
        <Sidebar />
      </div>
      <div className="col-sm-10">
        <PrivateRoute
          path="/user/profile"
          roles={["user"]}
          component={Profile}
        />
        <PrivateRoute path="/user/orders" roles={["user"]} component={Orders} />
      </div>
    </div>
  </div>
);

export default UserProfile;
