import React, { useState, useContext, useEffect } from "react";
import CategoryService from "../Services/CategoryService";
import ProductService from "../Services/ProductService";
import Message from "./Message";
import { AuthContext } from "../Context/AuthContext";

const ManagerProduct = (props) => {
  return (
    <div
      className="container"
      style={{ marginTop: "30px", marginLeft: "20px" }}
    >
      <h4 style={{ marginBottom: "20px" }}>Products</h4>
      <hr></hr>
      <div className="row">
        <div className="col-sm-5">
          <h6 style={{ marginBottom: "15px" }}>Column 1</h6>
        </div>

        <div className="col-sm-7">
          <h6 style={{ marginBottom: "15px" }}>Column 2</h6>
        </div>
      </div>
    </div>
  );
};

export default ManagerProduct;
