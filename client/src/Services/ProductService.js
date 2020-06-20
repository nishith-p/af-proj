import axios from "axios";

export default {
  getProduct: () => {
    return fetch("/product/view").then((response) => {
      if (response.status != 401) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "Unauthorized" }, msgError: true };
      }
    });
  },

  postProduct: (product) => {
    return fetch("/product/add", {
      method: "post",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status != 401) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "Unauthorized" }, msgError: true };
      }
    });
  },

  editProduct: (product, id) => {
    return fetch("/product/update/" + id, {
      method: "post",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status != 401) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "Unauthorized" }, msgError: true };
      }
    });
  },

  deleteProduct: (id) => {
    return fetch("/product/delete/" + id, {
      method: "delete",
    }).then((response) => {
      if (response.status != 401) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "Unauthorized" }, msgError: true };
      }
    });
  },

  postProd: (product) => {
    return axios
      .post("/product/add", product)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
};
