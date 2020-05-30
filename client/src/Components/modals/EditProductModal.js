import React, { useState, useContext, useEffect } from "react";
import CategoryService from "../../Services/CategoryService";
import ProductService from "../../Services/ProductService";
import Message from "../Message";
import FileUpload from "../utils/FileUpload";
import { AuthContext } from "../../Context/AuthContext";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

function EditProductModal(props) {
  const [state, setState] = useState({
    title: props.title,
    category: props.category,
    desc: props.desc,
    image: [],
    price: props.price,
    quantity: props.quantity,
    discount: props.discount,
    dprice: "",
  });

  const [aid, setaId] = useState({
    id: props.id,
  });

  const [Images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    CategoryService.getCategory().then((data) => {
      setCategories(data);
    });
  });

  const onSubmit2 = (e) => {
    e.preventDefault();

    ProductService.editProduct(state, aid.id).then((data) => {
      const { message } = data;
      //resetForm();
      if (!message.msgError) {
        ProductService.getProduct().then((data) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      dprice: value - state.discount,
    }));
  };

  const updateImages = (newImages) => {
    console.log(newImages);
    setImages(newImages);

    setState((prevState) => ({ ...prevState, image: newImages }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(aid.id);
  };

  const resetForm = () => {
    setState((prevState) => ({ ...prevState, discount: state.discount }));
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <form onSubmit={onSubmit2}>
                <label htmlFor="name" className="sr-only">
                  Name:{" "}
                </label>

                <input
                  type="text"
                  name="title"
                  value={state.title}
                  onChange={handleChange}
                  className="form-control"
                  style={{ marginBottom: "15px" }}
                  placeholder="Product Title"
                />

                <select
                  className="form-control"
                  style={{ marginBottom: "15px" }}
                  name="category"
                  value={state.category}
                  onChange={handleChange}
                >
                  {categories.map((post) => {
                    return <option key={post._id}>{post.name}</option>;
                  })}
                </select>

                <input
                  type="text"
                  name="desc"
                  value={state.desc}
                  onChange={handleChange}
                  className="form-control"
                  style={{ marginBottom: "15px" }}
                  placeholder="Description"
                />

                <input
                  type="number"
                  name="discount"
                  value={state.discount}
                  onChange={handleChange}
                  className="form-control"
                  style={{ marginBottom: "15px" }}
                  placeholder="Price"
                />

                <input
                  type="number"
                  name="price"
                  value={state.price}
                  onChange={handleChange2}
                  className="form-control"
                  style={{ marginBottom: "15px" }}
                  placeholder="Price"
                />

                <input
                  type="hidden"
                  name="dprice"
                  value={state.dprice}
                  onChange={handleChange2}
                  className="form-control"
                  style={{ marginBottom: "15px" }}
                  placeholder="Price"
                />

                <input
                  type="number"
                  name="quantity"
                  value={state.quantity}
                  onChange={handleChange}
                  className="form-control"
                  style={{ marginBottom: "15px" }}
                  placeholder="Quantity"
                />

                <button
                  className="btn btn-md btn-block"
                  style={{ backgroundColor: "#d1d1ee", marginBottom: "15px" }}
                  type="submit"
                  onClick={props.onHide}
                >
                  Add
                </button>
              </form>
            </div>

            <div className="col-sm">
              <FileUpload refreshFunction={updateImages} />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditProductModal;
