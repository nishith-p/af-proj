import React, { Component } from "react";
import axios from "axios";
import FileUpload from "./utils/FileUpload";
import { Col, Row } from "antd";

class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeDiscount = this.onChangeDiscount.bind(this);
    this.onChangeDiscountedPrice = this.onChangeDiscountedPrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      category: "",
      desc: "",
      image: "",
      price: "",
      quantity: 0,
      discount: "",
      discountedPrice: 0,
      products: [],
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get("/product/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          title: response.data.title,
          category: response.data.category,
          desc: response.data.desc,
          image: response.data.image,
          price: response.data.price,
          quantity: response.data.quantity,
          discount: response.data.discount,
          discountedPrice: response.data.dprice,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get("/category/view").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          categories: response.data.map((category) => category.name),
          //category: response.data[0].category
        });
      }
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value,
    });
  }

  onChangeDesc(e) {
    this.setState({
      desc: e.target.value,
    });
  }

  onChangeImage = (newImages) => {
    console.log(newImages);
    // setImages(newImages);
    //
    // setState((prevState) => ({ ...prevState, image: newImages }));
    this.setState({
      image: newImages,
    });
  };

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  onChangeDiscount(e) {
    this.setState({
      discount: e.target.value,
    });
  }

  onChangeDiscountedPrice(e) {
    this.setState({
      discountedPrice: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const product = {
      title: this.state.title,
      category: this.state.category,
      desc: this.state.desc,
      image: this.state.image,
      price: this.state.price,
      quantity: this.state.quantity,
      discount: this.state.discount,
      dprice: this.state.discountedPrice,
    };
    console.log(product);

    axios
      .post("/product/update/" + this.props.match.params.id, product)
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.log(error.response);
      });

    window.location = "/manage/products";
  }

  render() {
    return (
      <div className="container">
        <br />
        <h3>Update Product</h3>
        <br />
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Image </label>
            <br />
            <Row gutter={[16, 16]}>
              <Col lg={12} xs={24}>
                <figure className="card card-product">
                  <div className="img-wrap fill">
                    <img src={this.state.image} style={{ display: "block" }} />
                  </div>
                </figure>
              </Col>
              <Col lg={12} xs={24}>
                <div className="col-sm">
                  <FileUpload refreshFunction={this.onChangeImage} />
                </div>
              </Col>
            </Row>
          </div>

          <div className="form-group">
            <label>Name </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>

          <div className="form-group">
            <label>Description </label>
            <input
              type="textarea"
              required
              className="form-control"
              value={this.state.desc}
              onChange={this.onChangeDesc}
            />
          </div>

          <div className="form-group">
            <label>Category </label>
            <select
              required
              className="form-control"
              value={this.state.category}
              onChange={this.onChangeCategory}
            >
              {this.state.categories.map(function (product) {
                return (
                  <option key={product} value={product}>
                    {product}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label>Quantity </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.quantity}
              onChange={this.onChangeQuantity}
            />
          </div>

          <div className="form-group">
            <label>Price </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.price}
              onChange={this.onChangePrice}
            />
          </div>

          <div className="form-group">
            <label>Discount </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.discount}
              onChange={this.onChangeDiscount}
            />
          </div>

          <div className="form-group">
            <label>Discounted Price </label>
            <input
              type="text"
              required
              className="form-control"
              value={
                (this.state.discountedPrice =
                  this.state.price - this.state.discount)
              }
              onChange={this.onChangeDiscountedPrice}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Update" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default EditProduct;
