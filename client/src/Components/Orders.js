import React, { useState, useRef, useEffect, useContext } from "react";
import AuthService from "../Services/AuthService";
import UserService from "../Services/UserService";
import { AuthContext } from "../Context/AuthContext";

const Orders = (props) => {
  return (
    <div
      className="container"
      style={{ marginTop: "30px", marginLeft: "20px" }}
    >
      <h4 style={{ marginBottom: "20px" }}>Orders</h4>
      <hr></hr>
      <h1>Hi!</h1>
    </div>
  );
};

export default Orders;
