import React, { useEffect, useState } from "react";
import Axios from "axios";

function Wishlist() {
  const [Products, setProducts] = useState([]);
  const [Total, setTotal] = useState(0);

  let wishlistItems = [];
  useEffect(() => {
    Axios.get("user/getwish").then((response) => {
      if (response.data.length > 0) {
        response.data.forEach((item) => {
          wishlistItems.push(item.id);
        });
        wishFunction(wishlistItems, response.data);
      }
    });
  }, []);

  const wishFunction = (wishlistItems, wishlistDetails) => {
    Axios.get(`/product/products_by_id?id=${wishlistItems}&type=array`).then(
      (response) => {
        wishlistDetails.forEach((wishlistItem) => {
          response.data.forEach((productDetail, i) => {
            if (wishlistItem.id === productDetail._id) {
              response.data[i].quantity = wishlistItem.quantity;
            }
          });
        });
        setProducts(response.data);
      }
    );
  };

  const removeFromCart = (productId) => {
    Axios.get(`/user/removeFromWish?_id=${productId}`).then((response) => {
      response.data.wishlist.forEach((item) => {
        response.data.wishlistDetail.forEach((k, i) => {
          if (item.id === k._id) {
            response.data.wishlistDetail[i].quantity = item.quantity;
          }
        });
      });
      setProducts(response.data.wishlist);
    });
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
          <h2>Empty Wish List.</h2>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            {Products.map((product) => (
              <div key={product._id} id="cardItem" className="col-md-3">
                <figure class="card card-product shadow-sm p-1 mb-5 bg-white rounded">
                  <div class="img-wrap fill">
                    <img
                      src={product.image}
                      style={{ display: "block", width: "100%" }}
                    />
                  </div>
                  <figcaption class="info-wrap">
                    <h4 class="title">
                      <a href={`/shop/${product._id}`}>{product.title} </a>
                    </h4>
                    <div class="rating-wrap">
                      <div class="label-rating">132 reviews</div>
                    </div>
                  </figcaption>
                  <div class="bottom-wrap">
                    <button
                      class="btn btn-outline-dark btn-sm float-right"
                      onClick={() => removeFromCart(product._id)}
                    >
                      Remove
                    </button>
                    <div class="price-wrap h5">
                      <span class="price-new">Rs.{product.dprice}</span>{" "}
                      {product.discount !== 0 ? (
                        <small>
                          <del class="price-old text-danger">
                            Rs.{product.price}
                          </del>
                        </small>
                      ) : null}
                      {/**/}
                    </div>
                  </div>
                </figure>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
