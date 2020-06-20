import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function Cart() {
  const [Products, setProducts] = useState([]);
  const [Total, setTotal] = useState(0);

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
    calculateTotal();
  };

  const calculateTotal = () => {
    let total = 0;

    Products.map((item) => {
      total += parseInt(item.dprice, 10) * item.quantity;
    });

    setTotal(total);
    //reloadFunction();
  };

  const incrementQty = (productId) => {
    console.log(productId);

    Axios.post(`/user/incrementCart?productId=${productId}`).then(
      (response) => {
        console.log(response);
      }
    );
  };

  const decrementQty = (productId) => {
    console.log(productId);

    Products.forEach((productDetail, i) => {
      if (productId === productDetail._id) {
        if (Products[i].quantity <= 0) {
          removeFromCart(productId);
        }
      }
    });

    Axios.post(`/user/decrementCart?productId=${productId}`).then(
      (response) => {
        console.log(response);
      }
    );
  };

  const clearCart = () => {
    Axios.get("user/getCart").then((response) => {
      response.data.forEach((item) => {
        removeFromCart(item.id);
      });
      alert("Your Cart is Empty ");
    });
  };

  const removeFromCart = (productId) => {
    Axios.get(`/user/removeFromCart?_id=${productId}`).then((response) => {
      response.data.cart.forEach((item) => {
        response.data.cartDetail.forEach((k, i) => {
          if (item.id === k._id) {
            response.data.cartDetail[i].quantity = item.quantity;
          }
        });
      });
      setProducts(response.data.cart);
    });
  };

  const proceedPay = (Tot, Prod) => {
    console.log(Tot);
    console.log(Prod);
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
          <h2>Empty Cart.</h2>
        </div>
      ) : (
        <div>
          <table className="table table-bordered">
            <thead>
              <tr className="align-middle text-center">
                <th scope="col">Preview</th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {Products.map((post) => {
              return (
                <tbody key={post._id} className="post">
                  <tr>
                    <td className="align-middle text-center">
                      <img
                        src={post.image}
                        className="img-fluid"
                        style={{ maxWidth: "70px" }}
                      />
                    </td>
                    <td className="align-middle text-center">{post.title}</td>
                    <td className="align-middle text-center">
                      {post.category}
                    </td>
                    <td className="align-middle text-center">
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <span
                          type="button"
                          className="btn mx-1 btn-outline-secondary"
                          onClick={() => decrementQty(post._id)}
                        >
                          {" "}
                          -{" "}
                        </span>
                        <span
                          type="button"
                          className="btn mx-1 btn-outline-secondary"
                        >
                          {post.quantity}
                        </span>
                        <span
                          type="button"
                          className="btn mx-1 btn-outline-secondary"
                          onClick={() => incrementQty(post._id)}
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                    </td>
                    <td className="align-middle text-center">
                      Rs. {post.dprice}
                    </td>
                    <td className="align-middle text-center">
                      <div>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          style={{ padding: "3px 10px 3px 10px" }}
                          onClick={() => removeFromCart(post._id)}
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

          <div className="row">
            <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-right">
              <br />

              <h4 className="font-italic">
                <br />
                <span> Total Amount:</span>
                <strong> Rs. {Total}</strong>
              </h4>
              <br />
              <Link to={"/"}>
                <button
                  className="btn btn-outline-warning mb-3 px-5"
                  type="button"
                  onClick={() => clearCart()}
                >
                  Clear My Cart
                </button>
              </Link>
              <br />
              <Link to={"/payment"}>
                <button type="button" className="btn btn-outline-success">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
