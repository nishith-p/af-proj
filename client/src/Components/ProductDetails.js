import React, { useEffect, useState } from "react";
import Axios from "axios";
import Comments from "./utils/Comments";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import StarRating from "./utils/StarRating";

const ProductDetails = (props) => {
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState([]);
  const [CommentList, setCommentList] = useState([]);
  const [ratingList, setRatingList] = useState([]);
  const productVariable = {
    productId: productId,
  };

  useEffect(() => {
    Axios.get(`/product/products_by_id?id=${productId}&type=single`).then(
      (response) => {
        setProduct(response.data[0]);
      }
    );

    Axios.post("/comment/getComment", productVariable).then((response) => {
      if (response.data.success) {
        setCommentList(response.data.comments);
      } else {
        alert("Failed to fetch");
      }
    });

    Axios.post("/rating/getRating", productVariable).then((response) => {
      if (response.data.success) {
        setRatingList(response.data.ratings);
      } else {
        alert("Failed to fetch");
      }
    });
  }, []);

  const cartHandler = (productId) => {
    Axios.post(`/user/addtocart?productId=${productId}`).then((response) => {
      console.log(response.data.success);

      if (response.data.success) {
        alert("Item is added to your cart");
      }
    });
  };

  const wishHandler = (productId) => {
    Axios.post(`/user/addtowish?productId=${productId}`).then((response) => {
      console.log(response.data.success);

      if (response.data.success) {
        alert("Item is added to your wish List");
      }
    });
  };

  const updateComment = (newComment) => {
    setCommentList(CommentList.concat(newComment));
  };

  return (
    <div className="container" style={{ paddingTop: "50px" }}>
      <div class="row">
        <div class="col-sm">
          <img
            src={Product.image}
            class="shadow-sm p-2 mb-5 bg-white rounded"
            style={{ display: "block", width: "71%", float: "right" }}
          />
        </div>
        <div class="col-sm">
          <h2 class="font-weight-light">{Product.title}</h2>
          <h4 style={{ marginTop: "10px" }}>Rs. {Product.dprice}</h4>
          {Product.discount !== 0 ? (
            <h4 class="price-old text-danger">
              <del>Rs.{Product.price}</del>
            </h4>
          ) : null}
          <p class="text-justify" style={{ margin: "40px 0 40px 0" }}>
            {Product.desc}
          </p>

          <div class="form-group row">
            <h5 class="col-sm-2 col-form-label">Size</h5>
            <div class="col-sm-10">
              <select class="custom-select w-25" id="inputGroupSelect01">
                <option value="1">XS</option>
                <option value="2">S</option>
                <option value="3">M</option>
                <option value="3">L</option>
                <option value="3">XL</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: "40px" }}>
            <button
              type="button"
              class="btn btn-outline-primary"
              onClick={() => cartHandler(productId)}
            >
              Add to Cart
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              style={{ marginLeft: "10px" }}
              onClick={() => wishHandler(productId)}
            >
              Wish List
            </button>
          </div>
        </div>
      </div>

      <h3 className="text-center font-weight-light">Ratings & Reviews</h3>

      <div className="container text-center">
        <StarRating RatingList={ratingList} postID={Product._id} />
      </div>

      <Comments
        CommentList={CommentList}
        postID={Product._id}
        refreshFunction={updateComment}
      />
    </div>
  );
};
export default ProductDetails;
