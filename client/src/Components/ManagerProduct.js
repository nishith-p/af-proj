import React, { useState, useContext, useEffect, useMemo } from "react";
import Axios from "axios";
import AddProductModal from "./modals/AddProductModal";
import EditProductModal from "./modals/EditProductModal";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const ManagerProduct = (props) => {
  const authContext = useContext(AuthContext);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowEdit, setModalShowEdit] = React.useState(false);
  const [products, setProducts] = useState([]);

  //GET PRODUCTS
  useEffect(() => {
    Axios.get("/product/views").then((response) => {
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        alert("Failed");
      }
    });
  }, []);

  const refresh = () => {
    Axios.get("/product/views").then((response) => {
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        alert("Failed");
      }
    });
  };

  //EDIT CLICK
  const onEditClick = (id, title, category, quantity, price, discount) => {
    setModalShowEdit(true);
  };

  //DELETE PRODUCT
  const onDeleteClick = (id) => {
    Axios.delete("/product/deletes/" + id).then((res) => console.log(res.data));
    setProducts(products.filter((el) => el._id !== id));
  };

  //RENDER VIEW
  return (
    <div
      className="container"
      style={{ marginTop: "30px", marginLeft: "20px" }}
    >
      <div class="row">
        <div class="col-sm">
          <h4>Products</h4>
        </div>
        <div class="col-sm">
          <button
            type="button"
            class="btn btn-outline-primary"
            style={{ float: "right" }}
            onClick={() => setModalShow(true)}
          >
            Add Product
          </button>
        </div>
      </div>

      <hr></hr>

      <AddProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        refresh={refresh()}
      />

      <div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Quantity</th>
              <th scope="col">Normal Price</th>
              <th scope="col">Discount</th>
              <th scope="col">Discounted Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          {products.map((post) => {
            return (
              <tbody key={post._id} className="post">
                <tr>
                  <td>{post.title}</td>
                  <td>{post.category}</td>
                  <td>{post.quantity}</td>
                  <td>Rs. {post.price}</td>
                  <td>Rs. {post.discount}</td>
                  <td>Rs. {post.dprice}</td>
                  <td>
                    <div>
                      <Link to={"/edit/" + post._id}>
                        <button
                          type="button"
                          className="btn btn-outline-warning btn-sm"
                          style={{
                            padding: "3px 20px 3px 20px",
                            marginRight: "10px",
                          }}
                          onClick={() => setModalShowEdit(true)}
                        >
                          Edit
                        </button>
                      </Link>
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
                    </div>
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

export default ManagerProduct;
