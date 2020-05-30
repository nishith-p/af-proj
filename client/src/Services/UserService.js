export default {
  getManagers: () => {
    return fetch("/user/getManagers").then((response) => {
      if (response.status != 401) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "Unauthorized" }, msgError: true };
      }
    });
  },

  getUsers: () => {
    return fetch("/user/getUsers").then((response) => {
      if (response.status != 401) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "Unauthorized" }, msgError: true };
      }
    });
  },

  editUser: (user, id) => {
    return fetch("/user/update/" + id, {
      method: "post",
      body: JSON.stringify(user),
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

  deleteUser: (id) => {
    return fetch("/user/delete/" + id, {
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
