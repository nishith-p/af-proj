import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Accordion, Card } from "react-bootstrap";
import moment from "moment";
import PaymentService from "../Services/PaymentService";

const Orders = (props) => {
  const [payments, setPayments] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    PaymentService.getPayment().then((data) => {
      setPayments(data.payments);
    });
  }, []);

  return (
    <div
      className="container"
      style={{ marginTop: "30px", marginLeft: "20px", marginBottom: "80px" }}
    >
      <h4 style={{ marginBottom: "20px" }}>Orders</h4>
      <hr></hr>
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
                          fontSize: ".875rem",
                          width: "100px",
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
                  <h4 style={{ marginBottom: "0px" }}>
                    <span>Total:</span>
                    <strong> Rs. {post.total}</strong>
                  </h4>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
        })}
      </Accordion>
    </div>
  );
};

export default Orders;
