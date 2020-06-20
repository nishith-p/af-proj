import React, { useState, useRef, useEffect, useContext } from "react";
import AuthService from "../Services/AuthService";
import UserService from "../Services/UserService";
import { AuthContext } from "../Context/AuthContext";

const User = (props) => {
  //Variable to fetch Orders from DB
  const [users, setUsers] = useState([]);

  const authContext = useContext(AuthContext);

  const [message, setMessage] = useState(null);

  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  useEffect(() => {
    let unmounted = false;
    UserService.getUsers().then((data) => {
      if (!unmounted) {
        setUsers(data);
      }
    });

    return () => {
      unmounted = true;
    };
  });

  const onDeleteClick = (id) => {
    console.log(id);
    UserService.deleteUser(id).then((data) => {
      const { message } = data;
      if (!message.msgError) {
        UserService.getUsers().then((data) => {
          //setCategories(getData.categories);
          //setMessage(message);
        });
      } else if (message.msgBody == "Unauthorized") {
        //setMessage(message);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        //setMessage(message);
      }
    });
  };

  return (
    <div
      className="container"
      style={{ marginTop: "30px", marginLeft: "20px", marginBottom: "80px" }}
    >
      <h4 style={{ marginBottom: "20px" }}>Users</h4>
      <hr></hr>
      <h6 style={{ marginBottom: "15px" }}>User List</h6>
      <div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {users.map((post) => {
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
  );
};

export default User;
