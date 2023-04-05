import React, { useContext, useEffect, useState } from "react";

import Modal from "../UI/Modal";
import OrderItem from "./OrderItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

const Order = (props) => {


  let [totalAmount, setTotalAmount] = useState(0);

  const [loadedMeals, setLoadedMeals] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    const retrieveOrderHandler = async () => {
      const response = await fetch(
        "https://d6hv1f8eaf.execute-api.us-east-1.amazonaws.com/scp-project/getorders",
        {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({}),
        }
      );

      console.log(response);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const orders = responseData.body.Items[0].orderedItems;
      setOrderStatus(responseData.body.Items[0].orderStatus);

      console.log(orders);

      const meals = [];
      let orderTotal = 0;

      for (const order of orders) {
        meals.push({
          id: order.id,
          name: order.name,
          amount: order.amount,
          price: order.price,
        });
        orderTotal = orderTotal + order.price * order.amount;
      }
      setLoadedMeals(meals);
      setTotalAmount(orderTotal);
    };
    retrieveOrderHandler();
  }, [setLoadedMeals, setTotalAmount]);

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {loadedMeals.map((item) => (
        <OrderItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
        />
      ))}
    </ul>
  );


  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{"$ "+totalAmount}</span>
        <span>{orderStatus}</span>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>{cartModalContent}</Modal>
  );
};

export default Order;
