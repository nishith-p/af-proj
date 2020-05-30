import React from "react";
import Sidebar from "./Sidebar";
import RegisterMan from "./RegisterMan";
import User from "./User";
import Categories from "./Categories";
import PrivateRoute from "../hocs/PrivateRoute";

const Admin = () => (
  <div className="container">
    <div className="row">
      <div className="col-sm-2">
        <Sidebar />
      </div>
      <div className="col-sm-10">
        <PrivateRoute
          path="/admin/managers"
          roles={["admin"]}
          component={RegisterMan}
        />
        <PrivateRoute path="/admin/users" roles={["admin"]} component={User} />
        <PrivateRoute
          path="/admin/categories"
          roles={["admin"]}
          component={Categories}
        />
      </div>
    </div>
  </div>
);

export default Admin;
