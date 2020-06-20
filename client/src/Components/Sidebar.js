import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";

const Sidebar = (props) => {
  const { user } = useContext(AuthContext);

  return (
    <ul className="ul-sidebar">
      {user.role === "admin" ? (
        <NavLink
          className="link-txt"
          to="/admin/users"
          activeClassName="active"
        >
          <li className="li-sidebar">Users</li>
        </NavLink>
      ) : null}
      {user.role === "admin" ? (
        <NavLink
          className="link-txt"
          to="/admin/managers"
          activeClassName="active"
        >
          <li className="li-sidebar">Managers</li>
        </NavLink>
      ) : null}
      {user.role === "admin" ? (
        <NavLink
          className="link-txt"
          to="/admin/categories"
          activeClassName="active"
        >
          <li className="li-sidebar">Categories</li>
        </NavLink>
      ) : null}
      {user.role === "manager" ? (
        <NavLink
          className="link-txt"
          to="/manage/products"
          activeClassName="active"
        >
          <li className="li-sidebar">Products</li>
        </NavLink>
      ) : null}
      {user.role === "manager" ? (
        <NavLink
          className="link-txt"
          to="/manage/orders"
          activeClassName="active"
        >
          <li className="li-sidebar">Orders</li>
        </NavLink>
      ) : null}
      {user.role === "manager" ? (
        <NavLink
          className="link-txt"
          to="/manage/reviews"
          activeClassName="active"
        >
          <li className="li-sidebar">Reviews</li>
        </NavLink>
      ) : null}
      {user.role === "user" ? (
        <NavLink
          className="link-txt"
          to="/user/profile"
          activeClassName="active"
        >
          <li className="li-sidebar">Profile</li>
        </NavLink>
      ) : null}
      {user.role === "user" ? (
        <NavLink
          className="link-txt"
          to="/user/orders"
          activeClassName="active"
        >
          <li className="li-sidebar">Orders</li>
        </NavLink>
      ) : null}
      {user.role === "user" ? (
        <NavLink
          className="link-txt"
          to="/user/reviews"
          activeClassName="active"
        >
          <li className="li-sidebar">Reviews</li>
        </NavLink>
      ) : null}
    </ul>
  );
};

export default Sidebar;
