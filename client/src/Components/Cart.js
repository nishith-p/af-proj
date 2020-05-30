import React, { useEffect, useState } from "react";
import Axios from "axios";
import PaymentCard from "./PaymentCard";
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
          <table class="table table-bordered">
            <thead>
              <tr class="align-middle text-center">
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
                    <td class="align-middle text-center">
                      <img
                        src={post.image}
                        class="img-fluid"
                        style={{ maxWidth: "70px" }}
                      />
                    </td>
                    <td class="align-middle text-center">{post.title}</td>
                    <td class="align-middle text-center">{post.category}</td>
                    <td class="align-middle text-center">{post.quantity}</td>
                    <td class="align-middle text-center">Rs. {post.dprice}</td>
                    <td class="align-middle text-center">
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

          <div class="row">
            <div class="col-md-6">
              <h4 class="align-middle float-left">Total Amount: Rs. {Total}</h4>
            </div>
            <div class="col-md-6">
              <button
                type="button"
                class="btn btn-outline-success align-middle float-right"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
