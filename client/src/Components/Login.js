import React, { useState, useContext } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";
import { AuthContext } from "../Context/AuthContext";

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      setMessage(message);
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push("/");
      }
    });
  };

  return (
    <div className="container" style={{ paddingTop: "120px" }}>
      <div style={{ marginBottom: "10px" }}>
        <h1 className="text-center display-4">Login</h1>
      </div>
      <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
        <form onSubmit={onSubmit}>
          <label htmlFor="username" className="sr-only">
            Username:{" "}
          </label>
          <input
            type="text"
            name="username"
            onChange={onChange}
            className="form-control"
            style={{ marginBottom: "15px" }}
            placeholder="Enter Username"
          />
          <label htmlFor="password" className="sr-only">
            Password:{" "}
          </label>
          <input
            type="password"
            name="password"
            onChange={onChange}
            className="form-control"
            style={{ marginBottom: "15px" }}
            placeholder="Enter Password"
          />
          <button
            className="btn btn-md btn-block"
            style={{ backgroundColor: "#d1d1ee", marginBottom: "15px" }}
            type="submit"
          >
            Login
          </button>
        </form>
        {message ? <Message message={message} /> : null}
      </div>
    </div>
  );
};

export default Login;
