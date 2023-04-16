import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import { v4 as uuidv4 } from "uuid";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const paymentStatusHandler = (value) => {
    setPaymentStatus(value);
  };

  const submitOrderHandler = async (userData) => {
    const id = uuidv4();
    console.log({
      Items: {
        id: id,
        user: userData,
        orderedItems: cartCtx.items,
      },
    });

    const dateInt = parseInt(Date.now());

    setIsSubmitting(true);

    const response = await fetch(
      "https://d6hv1f8eaf.execute-api.us-east-1.amazonaws.com/scp-project/order",
      {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          Item: {
            id: id,
            date: dateInt,
            user: userData,
            orderedItems: cartCtx.items,
            orderStatus: "Submitted",
          },
        }),
      }
    );

    console.log(response.body);
    if (response.status === 200) {
      setIsSubmitting(false);
      setDidSubmit(true);
      paymentStatusHandler(false);
      cartCtx.clearCart();
    } else {
      setIsSubmitting(false);
      paymentStatusHandler(true);
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const paymentDeclinedModalContent = <p>Payment Declined. Please try again</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
      {paymentStatus && paymentDeclinedModalContent}
    </Modal>
  );
};

export default Cart;
