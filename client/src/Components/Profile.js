import React, { useState, useContext, useEffect, useReducer } from "react";
import Message from "./Message";
import { AuthContext } from "../Context/AuthContext";

const Profile = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const [state, setState] = useState({
    username: user.username,
    name: user.name,
  });

  const handleEmailChange = (e) => {
    const { username, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [username]: value,
    }));
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //Alerts (Success, Errors..)
  const [message, setMessage] = useState(null);

  //Edit Category
  const onSubmit = (e) => {
    e.preventDefault();
    //
    console.log(state.username);
    console.log(state.name);
  };

  const onChange = (e) => {
    //setCategory({ name: e.target.value });
  };

  return (
    <div
      className="container"
      style={{ marginTop: "30px", marginLeft: "20px" }}
    >
      <h4 style={{ marginBottom: "20px" }}>Profile</h4>
      <hr></hr>
      <div className="row">
        <div className="col-sm-5">
          <form onSubmit={onSubmit}>
            <h6 style={{ marginBottom: "15px" }}>Edit Details</h6>
            <label htmlFor="name" className="sr-only">
              Name:{" "}
            </label>
            <input
              type="hidden"
              name="id"
              value={user._id}
              //onChange=
            ></input>
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={handleNameChange}
              className="form-control"
              style={{ marginBottom: "15px" }}
              placeholder="Category Name"
            />
            <input
              type="text"
              name="name"
              value={state.username}
              onChange={handleEmailChange}
              className="form-control"
              style={{ marginBottom: "15px" }}
              placeholder="Category Name"
            />
            <button
              className="btn btn-md btn-block"
              style={{ backgroundColor: "#d1d1ee", marginBottom: "15px" }}
              type="submit"
            >
              Save
            </button>
          </form>
          {message ? <Message message={message} /> : null}
        </div>
        <div className="col-sm-7"></div>
      </div>
    </div>
  );
};

export default Profile;
