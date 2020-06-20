import React, { useState, useEffect } from "react";
import Axios from "axios";
import CategoryService from "../Services/CategoryService";
import Message from "./Message";

const Categories = (props) => {
  //INITIAL STATES
  const [category, setCategory] = useState({ name: "" });
  const [editedCat, setEditedCat] = useState({ name: "", id: "" });
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(null);

  //MOUNT
  useEffect(() => {
    let unmounted = false;
    Axios.get("/category/views").then((response) => {
      if (response.data.success) {
        setCategories(response.data.categories);
        console.log(response.data.categories);
      } else {
        alert("Failed");
      }
    });

    return () => {
      unmounted = true;
    };
  }, []);

  //REFRESH FUNCTION
  const getCat = () => {
    Axios.get("/category/views").then((response) => {
      if (response.data.success) {
        setCategories(response.data.categories);
        console.log(response.data.categories);
      } else {
        alert("Failed");
      }
    });
  };

  //ADD CATEGORY
  const onSubmit = (e) => {
    e.preventDefault();
    CategoryService.postCategory(category).then((data) => {
      const { message } = data;
      resetForm();
      getCat();
    });
  };

  //EDIT CATEGORY
  const onEditSubmit = (e) => {
    e.preventDefault();

    CategoryService.editCategory(editedCat, editedCat.id).then((data) => {
      const { message } = data;
      resetForm2();
      getCat();
    });
  };

  const onEditClick = (id, name) => {
    console.log(id);
    console.log(name);

    setEditedCat({ name: name, id: id });
  };

  //DELETE CATEGORY
  const onDeleteClick = (id) => {
    console.log(id);
    CategoryService.deleteCategory(id).then((data) => {
      const { message } = data;
      resetForm();
      getCat();
    });
  };

  //CHANGE-HANDLERS
  const onChange = (e) => {
    setCategory({ name: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCat((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //FORM RESET
  const resetForm = () => {
    setCategory({ name: "" });
  };

  const resetForm2 = () => {
    setEditedCat({
      name: "",
      id: "",
    });
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

          <form onSubmit={onEditSubmit}>
            <h6 style={{ marginBottom: "15px" }}>Edit Category</h6>
            <label htmlFor="name" className="sr-only">
              Name:{" "}
            </label>
            <input
              type="hidden"
              name="id"
              value={editedCat.id}
              onChange={handleChange}
            ></input>
            <input
              type="text"
              name="name"
              value={editedCat.name}
              onChange={handleChange}
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
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              {categories.map((post) => {
                return (
                  <tbody key={post.id} className="post">
                    <tr>
                      <td>{post.name}</td>
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
