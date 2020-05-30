import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";

const Navbar = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unauthenticatedNavBar = () => {
    return (
      <>
        <Link className="link-txt" to="/register">
          <li className="mm-li">Register</li>
        </Link>
        <Link className="link-txt" to="/login">
          <li className="mm-li">Login</li>
        </Link>
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        {user.role === "admin" ? (
          <Link className="link-txt" to="/admin/users">
            <li className="mm-li">Admin</li>
          </Link>
        ) : null}
        {user.role === "manager" ? (
          <Link className="link-txt" to="/manage/products">
            <li className="mm-li">Manage</li>
          </Link>
        ) : null}
        {user.role === "user" ? (
          <Link className="link-txt" to="/wishlist">
            <i class="fas fa-heart mm-li"></i>
          </Link>
        ) : null}
        {user.role === "user" ? (
          <Link className="link-txt" to="/cart">
            <i class="fas fa-shopping-cart mm-li"></i>
          </Link>
        ) : null}
        {user.role === "user" ? (
          <Link className="link-txt" to="/user/profile">
            <li className="mm-li">Profile</li>
          </Link>
        ) : null}
        <button
          type="button"
          className="link-txt mm-li"
          onClick={onClickLogoutHandler}
        >
          Logout
        </button>
      </>
    );
  };
  return (
    <div className="container-menu-desktop fix-menu-desktop">
      <div className="wrap-menu-desktop">
        <nav className="limiter-menu-desktop container">
          <Link to="/">
            <div className="logo" style={{ marginRight: "20px" }}>
              <p
                className="align-middle"
                style={{ marginBottom: 0, fontSize: "40px" }}
              >
                Grid
              </p>
            </div>
          </Link>
          <div className="menu-desktop">
            <ul className="main-menu">
              <Link className="link-txt" to="/">
                <li className="mm-li">Shop</li>
              </Link>
              <Link className="link-txt" to="/">
                <li className="mm-li">About</li>
              </Link>
              <Link className="link-txt" to="/">
                <li className="mm-li">Contact</li>
              </Link>
            </ul>
          </div>

          <div className="wrap-icon-header flex-w flex-r-m">
            <ul className="main-menu">
              {!isAuthenticated
                ? unauthenticatedNavBar()
                : authenticatedNavBar()}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
