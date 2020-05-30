export default {
  postPayment: (payment) => {
    return fetch("/user/addorder", {
      method: "post",
      body: JSON.stringify(payment),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },
};
