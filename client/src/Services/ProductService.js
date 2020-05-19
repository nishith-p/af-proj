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
};
