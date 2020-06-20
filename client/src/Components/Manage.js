import React from "react";
import Sidebar from "./Sidebar";
import ManagerProduct from "./ManagerProduct";
import ManagerOrder from "./ManagerOrder";
import Categories from "./Categories";
import PrivateRoute from "../hocs/PrivateRoute";

const Manage = () => (
  <div className="container">
    <div className="row">
      <div className="col-sm-2">
        <Sidebar />
      </div>
      <div className="col-sm-10">
        <PrivateRoute
          path="/manage/products"
          roles={["manager"]}
          component={ManagerProduct}
        />
        <PrivateRoute
          path="/manage/orders"
          roles={["manager"]}
          component={ManagerOrder}
        />
        <PrivateRoute
          path="/manage/reviews"
          roles={["manager"]}
          component={Categories}
        />
      </div>
    </div>
  </div>
);

export default Manage;
