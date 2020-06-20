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
        setProducts(response.data);
      }
    );
  };

  const cartHandler = (productId) => {
    Axios.post(`/user/addtocart?productId=${productId}`).then((response) => {
      console.log(response.data.success);

      if (response.data.success) {
        alert("Item has been added to your cart");
      }
    });
  };

  const removeFromWishList = (productId) => {
    Axios.get(`/user/removeFromWish?_id=${productId}`).then((response) => {
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
                    <div className="price-wrap h5 float-left">
                      <span className="price-new">Rs.{product.dprice}</span>{" "}
                      {product.discount !== 0 ? (
                        <small>
                          <del className="price-old text-danger">
                            Rs.{product.price}
                          </del>
                        </small>
                      ) : null}
                      {/**/}
                    </div>
                  </figcaption>
                  <div class="bottom-wrap">
                    <div>
                      <button
                        class="btn btn-outline-dark btn-sm float-left"
                        onClick={() => cartHandler(product._id)}
                      >
                        Add To Cart
                      </button>
                      <span />
                      <button
                        className="btn btn-outline-dark btn-sm float-right"
                        onClick={() => removeFromWishList(product._id)}
                      >
                        Remove
                      </button>
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
