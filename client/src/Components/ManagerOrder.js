import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Accordion, Card } from "react-bootstrap";
import moment from "moment";
import Message from "./Message";
import PaymentService from "../Services/PaymentService";

const ManagerOrder = (props) => {
  const [payments, setPayments] = useState([]);
  const [status, setStatus] = useState({ id: "", status: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    PaymentService.getAllPayment().then((data) => {
      setPayments(data.payments);
    });
  }, []);

  const onEditClick = (id, status) => {
    console.log(id);
    console.log(status);

    setStatus({ id: id, status: status });
  };

  const onDeleteClick = (id) => {
    PaymentService.deletePayment(id).then((data) => {
      const { message } = data;
      getPay();
    });
  };

  const getPay = () => {
    PaymentService.getAllPayment().then((data) => {
      setPayments(data.payments);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStatus((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(status.id);
    console.log(status.status);

    PaymentService.editPayment(status, status.id).then((data) => {
      const { message } = data;
      resetForm();
      getPay();
    });
  };

  const resetForm = () => {
    setStatus({
      id: "",
      status: "",
    });
  };

  return (
    <div
      className="container"
      style={{ marginTop: "30px", marginLeft: "20px", marginBottom: "80px" }}
    >
      <h4 style={{ marginBottom: "20px" }}>Orders</h4>
      <hr></hr>

      <form
        onSubmit={onSubmit}
        class="form-inline"
        style={{ marginBottom: "5px" }}
      >
        <div class="form-group mb-2">
          <label for="staticEmail2" class="sr-only">
            Email
          </label>
          <input
            readOnly
            type="text"
            class="form-control"
            name="id"
            value={status.id}
            onChange={handleChange}
          />
        </div>
        <div class="form-group mx-sm-3 mb-2">
          <div class="form-group">
            <select
              class="form-control"
              name="status"
              value={status.status}
              onChange={handleChange}
            >
              <option>processing</option>
              <option>shipped</option>
              <option>completed</option>
              <option>cancelled</option>
            </select>
          </div>
        </div>
        <button type="submit" class="btn btn-primary mb-2">
          Update
        </button>
        {message ? <Message message={message} /> : null}
      </form>

      <Accordion>
        {payments.map((post) => {
          return (
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey={post._id}>
                <div class="row">
                  <div class="col">
                    <div class="font-weight-bold">Order ID:</div> {post._id}
                  </div>
                  <div class="col">
                    <div class="float-right">
                      <div class="font-weight-bold">Status:</div>
                      <div
                        className={`btn btn-sm ${
                          post.status === "completed"
                            ? "btn-success"
                            : post.status === "shipped"
                            ? "btn-warning"
                            : post.status === "processing"
                            ? "btn-primary"
                            : "btn-danger"
                        }`}
                        style={{
                          padding: ".25rem .4rem",
                          width: "100px",
                          fontSize: ".875rem",
                          lineHeight: ".8",
                          textTransform: "uppercase",
                          borderRadius: ".2rem",
                        }}
                      >
                        {post.status}
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="float-right">
                      <div class="font-weight-bold">Date:</div>{" "}
                      <div class="float-right">
                        {moment(post.createdAt).format("DD/MM/YYYY")}
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={post._id}>
                <Card.Body>
                  <p>
                    <strong>Name:</strong>
                    <span> {post.fname}</span>
                  </p>
                  <p>
                    <strong>Email:</strong>
                    <span> {post.email}</span>
                  </p>
                  <p>
                    <strong>Shipping Address:</strong>
                    <span> {post.address}</span>
                  </p>
                  <p>
                    <strong>Payment Method:</strong>
                    <span> {post.method}</span>
                  </p>
                  <table class="table table-bordered">
                    <thead>
                      <tr className="align-middle text-center">
                        <th scope="col">Preview</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    {post.payments.map((sub, i) => {
                      return (
                        <tbody>
                          <tr>
                            <td className="align-middle text-center">
                              <img
                                src={sub.image}
                                class="img-fluid"
                                style={{ maxWidth: "70px" }}
                              />
                            </td>
                            <td className="align-middle text-center">
                              {sub.title}
                            </td>
                            <td className="align-middle text-center">
                              {sub.quantity}
                            </td>
                            <td className="align-middle text-center">
                              {sub.dprice}
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                  <div class="row">
                    <div class="col-sm align-middle">
                      <h4 style={{ marginBottom: "0px" }}>
                        <span>Total: </span>
                        <strong>Rs. {post.total}</strong>
                      </h4>
                    </div>
                    <div class="col-sm text-right">
                      <button
                        type="button"
                        className="btn btn-outline-warning btn-sm"
                        style={{
                          padding: "3px 10px 3px 10px",
                          marginRight: "5px",
                        }}
                        onClick={() => {
                          onEditClick(post._id, post.status);
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
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
        })}
      </Accordion>
    </div>
  );
};

export default ManagerOrder;
