import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import PaymentService from "../Services/PaymentService";
import { AuthContext } from "../Context/AuthContext";
import Message from "../Components/Message";

function PaymentCard(props) {
  const [Payment, setPayment] = useState({
    fname: "",
    email: "",
    address: "",
    payments: [],
    method: "",
  });
  const [Products, setProducts] = useState([]);
  const [Total, setTotal] = useState(0);
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  let cartItems = [];
  useEffect(() => {
    Axios.get("user/getCart").then((response) => {
      if (response.data.length > 0) {
        response.data.forEach((item) => {
          cartItems.push(item.id);
        });
        cartFunction(cartItems, response.data);
      }
    });
    calculateTotal();
  });

  const cartFunction = (cartItems, cartDetails) => {
    Axios.get(`/product/products_by_id?id=${cartItems}&type=array`).then(
      (response) => {
        cartDetails.forEach((cartItem) => {
          response.data.forEach((productDetail, i) => {
            if (cartItem.id === productDetail._id) {
              response.data[i].quantity = cartItem.quantity;
            }
          });
        });
        setProducts(response.data);
      }
    );
  };

  const calculateTotal = () => {
    let total = 0;

    Products.map((item) => {
      total += parseInt(item.dprice, 10) * item.quantity;
    });

    setTotal(total);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(Payment);
    PaymentService.postPayment(Payment).then((data) => {
      const { message } = data;
      if (!message.msgError) {
        setMessage(message);
      } else if (message.msgBody === "UnAuthorized") {
        setMessage(message);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setPayment((prevState) => ({
      ...prevState,
      [name]: value,
      payments: Products,
    }));
  };

  return (
    <div className="container" style={{ paddingTop: "50px" }}>
      {Products.length === 0 ? (
        <div
          style={{
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Not found.</h2>
        </div>
      ) : (
        <div className="row">
          <div class="col-md-4 order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-muted">Your cart</span>
              <span class="badge badge-secondary badge-pill">
                {Products.length}
              </span>
            </h4>
            <ul class="list-group mb-3">
              {Products.map((post) => {
                return (
                  <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 class="my-0">{post.title}</h6>
                      <small class="text-muted">
                        {post.category} | Quantity: {post.quantity}{" "}
                      </small>
                    </div>
                    <span class="text-muted">Rs. {post.dprice}</span>
                  </li>
                );
              })}
              <li class="list-group-item d-flex justify-content-between">
                <span>Total (LKR)</span>
                <strong>Rs. {Total}</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-8 order-md-1">
            <form
              onSubmit={onSubmit}
              className="needs-validation"
              novalidate=""
            >
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label for="firstName">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="fname"
                    value={Payment.fname}
                    onChange={onChange}
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label for="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={Payment.email}
                  onChange={onChange}
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                />
                <div className="invalid-feedback">
                  Please enter a valid email address for shipping updates.
                </div>
              </div>

              <div className="mb-3">
                <label for="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={Payment.address}
                  onChange={onChange}
                  placeholder="1234 Main St"
                  required=""
                />
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label for="cc-name">Name on card</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-name"
                    placeholder=""
                    required=""
                  />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                  <div className="invalid-feedback">
                    Name on card is required
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label for="cc-number">Credit card number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-number"
                    placeholder=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    Credit card number is required
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label for="cc-expiration">Expiration</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-expiration"
                    placeholder=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    Expiration date required
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label for="cc-expiration">CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-cvv"
                    placeholder=""
                    required=""
                  />
                  <div className="invalid-feedback">Security code required</div>
                </div>
              </div>
              <hr className="mb-4" />
              <button
                className="btn btn-success btn-lg btn-block mb-4"
                type="submit"
              >
                Checkout
              </button>
            </form>
            {message ? <Message message={message} /> : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentCard;
