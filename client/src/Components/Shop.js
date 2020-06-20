import React, { useEffect, useState } from "react";
import Axios from "axios";
import SearchFeature from "./utils/SearchFeature";

const Shop = () => {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [SearchTerms, setSearchTerms] = useState("");

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };
    getProducts(variables);
  }, []);

  //GET PRODUCTS
  const getProducts = (variables) => {
    Axios.post("/product/viewm", variables)
      .then((response) => {
        if (response.data.success) {
          if (variables.loadMore) {
            setProducts([...Products, ...response.data.products]);
          } else {
            setProducts(response.data.products);
          }
          setPostSize(response.data.postSize);
        } else {
          alert("Failed");
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  //LOAD MORE BUTTON
  const onLoadMore = () => {
    let skip = Skip + Limit;

    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
      searchTerm: SearchTerms,
    };

    getProducts(variables);
    setSkip(skip);
  };

  //SEARCH
  const updateSearchTerms = (newSearchTerm) => {
    const variables = {
      skip: 0,
      limit: Limit,
      searchTerm: newSearchTerm,
    };
    setSkip(0);
    setSearchTerms(newSearchTerm);
    console.log(newSearchTerm);

    getProducts(variables);
  };

  //RENDER VIEW
  return (
    <div className="container" style={{ paddingTop: "40px" }}>
      <div style={{ marginBottom: "50px" }}>
        <h1 className="text-center display-4">Grid Fashion</h1>
        <blockquote class="blockquote">
          <p class="mb-0 text-center">Simplicity is the key.</p>
        </blockquote>
      </div>

      {/*search
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <SearchFeature refreshFunction={updateSearchTerms} />
      </div>*/}

      {Products.length === 0 ? (
        <div
          style={{
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>No Products</h2>
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
                    <h4 class="title">{product.title}</h4>
                    <p class="desc">{product.category}</p>
                  </figcaption>
                  <div class="bottom-wrap">
                    <a
                      href={`/shop/${product._id}`}
                      class="btn btn-outline-dark btn-sm float-right"
                    >
                      Check Out
                    </a>
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

      <br />

      {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            class="btn btn-outline-dark btn-sm"
            onClick={onLoadMore}
          >
            Load More
          </button>
        </div>
      )}
      <br />
    </div>
  );
};

export default Shop;
