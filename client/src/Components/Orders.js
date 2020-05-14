import React, { useState, useContext, useEffect } from "react";
import OrderItem from "./OrderItem";
import OrderService from "../Services/OrderService";
import Message from "./Message";
import { AuthContext } from "../Context/AuthContext";

const Orders = (props) => {
  //Set initial state
  const [order, setOrder] = useState({ name: "" });

  //Variable to fetch Orders from DB
  const [orders, setOrders] = useState([]);

  //Alerts (Success, Errors..)
  const [message, setMessage] = useState(null);

  //Authentication
  const authContext = useContext(AuthContext);

  useEffect(() => {
    OrderService.getOrders().then((data) => {
      setOrders(data.orders);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    OrderService.postOrder(order).then((data) => {
      const { message } = data;
      resetForm();
      if (!message.msgError) {
        OrderService.getOrders().then((getData) => {
          setOrders(getData.orders);
          setMessage(message);
        });
      } else if (message.msgBody == "Unauthorized") {
        setMessage(message);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
    });
  };

  const onChange = (e) => {
    setOrder({ name: e.target.value });
  };

  const resetForm = () => {
    setOrder({ name: "" });
  };

  return (
    <div className="container">
      <ul className="list-group">
        {orders.map((order) => {
          return <OrderItem key={order._id} order={order} />;
        })}
      </ul>
      <br></br>

      <form onSubmit={onSubmit}>
        <label htmlFor="order">Orders</label>
        <input
          type="text"
          name="order"
          value={order.name}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Order"
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Submit
        </button>
        {message ? <Message message={message} /> : null}
      </form>
    </div>
  );
};

export default Orders;
