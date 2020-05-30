export default {
  postCategory: (category) => {
    return fetch("/category/add", {
      method: "post",
      body: JSON.stringify(category),
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

  editCategory: (category, id) => {
    return fetch("/category/update/" + id, {
      method: "post",
      body: JSON.stringify(category),
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

  deleteCategory: (id) => {
    return fetch("/category/delete/" + id, {
      method: "delete",
    }).then((response) => {
      if (response.status != 401) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "Unauthorized" }, msgError: true };
      }
    });
  },
};
