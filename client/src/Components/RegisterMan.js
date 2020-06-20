import React, { useState, useRef, useEffect, useContext } from "react";
import AuthService from "../Services/AuthService";
import UserService from "../Services/UserService";
import Message from "../Components/Message";
import { AuthContext } from "../Context/AuthContext";

const RegisterMan = (props) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    name: "",
    role: "manager",
  });

  //Variable to fetch Orders from DB
  const [managers, setManagers] = useState([]);

  const [message, setMessage] = useState(null);

  const authContext = useContext(AuthContext);

  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  useEffect(() => {
    let unmounted = false;
    UserService.getManagers().then((data) => {
      if (!unmounted) {
        setManagers(data);
      }
    });

    return () => {
      unmounted = true;
    };
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({
      username: "",
      password: "",
      name: "",
      role: "manager",
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
          props.history.push("/admin/managers");
        }, 2000);
      }
    });
  };

  const onDeleteClick = (id) => {
    console.log(id);
    UserService.deleteUser(id).then((data) => {
      const { message } = data;
      if (!message.msgError) {
        UserService.getUsers().then((data) => {});
      } else if (message.msgBody == "Unauthorized") {
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
      }
    });
  };

  return (
    <div
      className="container"
      style={{ marginTop: "30px", marginLeft: "20px" }}
    >
      <h4 style={{ marginBottom: "20px" }}>Managers</h4>
      <hr></hr>
      <div className="row">
        <div className="col-sm-5">
          <form onSubmit={onSubmit}>
            <h6 style={{ marginBottom: "15px" }}>Create Account</h6>
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
              type="text"
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
        <div className="col-sm-7">
          <h6 style={{ marginBottom: "15px" }}>Manager List</h6>
          <div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              {managers.map((post) => {
                return (
                  <tbody key={post.id} className="post">
                    <tr>
                      <td>{post.name}</td>
                      <td>{post.username}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          style={{ padding: "3px 10px 3px 10px" }}
                          onClick={() => {
                            onDeleteClick(post._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterMan;
