import React, { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";

const Register = (props) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    name: "",
    role: "user",
  });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({
      username: "",
      password: "",
      name: "",
      role: "user",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
    });
  };

  return (
    <div className="container" style={{ paddingTop: "120px" }}>
      <div style={{ marginBottom: "10px" }}>
        <h1 className="text-center display-4">Register</h1>
      </div>
      <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
        <form onSubmit={onSubmit}>
          <label htmlFor="name" className="sr-only">
            Full Name:{" "}
          </label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={onChange}
            className="form-control"
            style={{ marginBottom: "15px" }}
            placeholder="Full Name"
          />
          <label htmlFor="username" className="sr-only">
            Username:{" "}
          </label>
          <input
            type="email"
            name="username"
            value={user.username}
            onChange={onChange}
            className="form-control"
            style={{ marginBottom: "15px" }}
            placeholder="Email Address"
          />
          <label htmlFor="password" className="sr-only">
            Password:{" "}
          </label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={onChange}
            className="form-control"
            style={{ marginBottom: "15px" }}
            placeholder="Password"
          />
          <button
            className="btn btn-md btn-block"
            style={{ backgroundColor: "#d1d1ee", marginBottom: "15px" }}
            type="submit"
          >
            Register
          </button>
        </form>
        {message ? <Message message={message} /> : null}
      </div>
    </div>
  );
};

export default Register;
