import React from "react";
import Sidebar from "./Sidebar";
import RegisterMan from "./RegisterMan";
import User from "./User";
import Categories from "./Categories";
import Profile from "./Profile";
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
      </div>
    </div>
  </div>
);

export default UserProfile;
