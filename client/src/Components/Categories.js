import React, { useState, useContext, useEffect } from "react";
import CategoryService from "../Services/CategoryService";
import Message from "./Message";
import { AuthContext } from "../Context/AuthContext";

const Categories = (props) => {
  //Set initial state
  const [category, setCategory] = useState({ name: "" });

  const [categoryN, setCategoryN] = useState({ name: "", id: "" });

  const [categoryM, setCategoryM] = useState({ id: "" });

  //Variable to fetch Orders from DB
  const [categories, setCategories] = useState([]);

  //Alerts (Success, Errors..)
  const [message, setMessage] = useState(null);

  //Authentication
  const authContext = useContext(AuthContext);

  //Mount Error Fix
  useEffect(() => {
    let unmounted = false;
    CategoryService.getCategory().then((data) => {
      if (!unmounted) {
        setCategories(data);
      }
    });

    return () => {
      unmounted = true;
    };
  });

  //Add Category
  const onSubmit = (e) => {
    e.preventDefault();
    CategoryService.postCategory(category).then((data) => {
      const { message } = data;
      resetForm();
      if (!message.msgError) {
        CategoryService.getCategory().then((data) => {
          //setCategories(getData.categories);
          setMessage(message);
        });
      } else if (message.msgBody == "Unauthorized") {
        setMessage(message);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
    });
  };

  //Edit Category
  const onSubmit2 = (e) => {
    e.preventDefault();
    console.log(categoryM.id);
    console.log(categoryN.name);

    CategoryService.editCategory(categoryN, categoryM.id).then((data) => {
      const { message } = data;
      resetForm2();
      if (!message.msgError) {
        CategoryService.getCategory().then((data) => {
          //setCategories(getData.categories);
          setMessage(message);
        });
      } else if (message.msgBody == "Unauthorized") {
        setMessage(message);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
    });
  };

  const onEditClick = (id, name) => {
    console.log(id);
    console.log(name);

    setCategoryN({ name: name });
    setCategoryM({ id: id });
  };

  //Delete Category
  const onDeleteClick = (id) => {
    console.log(id);
    CategoryService.deleteCategory(id).then((data) => {
      const { message } = data;
      resetForm();
      if (!message.msgError) {
        CategoryService.getCategory().then((data) => {
          //setCategories(getData.categories);
          setMessage(message);
        });
      } else if (message.msgBody == "Unauthorized") {
        setMessage(message);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
    });
  };

  const onChange = (e) => {
    setCategory({ name: e.target.value });
  };

  const onChange2 = (e) => {
    setCategoryN({ name: e.target.value });
  };

  const onChange3 = (e) => {
    setCategoryM({ id: e.target.value });
  };

  //Form reset after adding
  const resetForm = () => {
    setCategory({ name: "" });
  };

  const resetForm2 = () => {
    setCategoryN({ name: "" });
    setCategoryM({ id: "" });
  };

  return (
    <div
      className="container"
      style={{ marginTop: "30px", marginLeft: "20px" }}
    >
      <h4 style={{ marginBottom: "20px" }}>Categories</h4>
      <hr></hr>
      <div className="row">
        <div className="col-sm-5">
          <form onSubmit={onSubmit}>
            <h6 style={{ marginBottom: "15px" }}>Add Category</h6>
            <label htmlFor="name" className="sr-only">
              Name:{" "}
            </label>
            <input
              type="text"
              name="name"
              value={category.name}
              onChange={onChange}
              className="form-control"
              style={{ marginBottom: "15px" }}
              placeholder="Category Name"
            />
            <button
              className="btn btn-md btn-block"
              style={{ backgroundColor: "#d1d1ee", marginBottom: "15px" }}
              type="submit"
            >
              Add
            </button>
          </form>

          <form onSubmit={onSubmit2}>
            <h6 style={{ marginBottom: "15px" }}>Edit Category</h6>
            <label htmlFor="name" className="sr-only">
              Name:{" "}
            </label>
            <input
              type="hidden"
              name="id"
              value={categoryM.id}
              onChange={onChange3}
            ></input>
            <input
              type="text"
              name="name"
              value={categoryN.name}
              onChange={onChange2}
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
        <div className="col-sm-7">
          <h6 style={{ marginBottom: "15px" }}>Current Categories</h6>
          <div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Products</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              {categories.map((post) => {
                return (
                  <tbody key={post.id} className="post">
                    <tr>
                      <td>{post.name}</td>
                      <td>-</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-warning btn-sm"
                          style={{
                            padding: "3px 20px 3px 20px",
                            marginRight: "10px",
                          }}
                          onClick={() => {
                            onEditClick(post._id, post.name);
                          }}
                        >
                          Edit
                        </button>
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

export default Categories;
