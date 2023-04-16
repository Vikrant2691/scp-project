import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    email: true,
    street: true,
    city: true,
    postalCode: true,
    cardNumber: true,
    endDate: true,
    cvv: true,
  });

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const cardNumberInputRef = useRef();
  const endDateInputRef = useRef();
  const cvvInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredCardNumber = cardNumberInputRef.current.value;
    const enteredEndDate = endDateInputRef.current.value;
    const enteredCvv = cvvInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredEmailIsValid = !isEmpty(enteredEmail);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredCardNumberIsValid = !isEmpty(enteredCardNumber);
    const enteredEndDateIsValid = !isEmpty(enteredEndDate);
    const enteredCvvIsValid = !isEmpty(enteredCvv);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      email: enteredEmailIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      cardNumber: enteredCardNumberIsValid,
      endDate: enteredEndDateIsValid,
      cvv: enteredCvvIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredEmailIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredCardNumberIsValid &&
      enteredEndDateIsValid &&
      enteredCvvIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      email: enteredEmail,
      street: enteredStreet,
      city: enteredCity,
      cardNumber: enteredCardNumber,
      endDate: enteredEndDate,
      cvv: enteredCvv,
      postalCode: enteredPostalCode,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const emailControlClasses = `${classes.control} ${
    formInputsValidity.email ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;
  const cardNumberControlClasses = `${classes.control} ${
    formInputsValidity.cardNumber ? "" : classes.invalid
  }`;
  const endDateControlClasses = `${classes.control} ${
    formInputsValidity.endDate ? "" : classes.invalid
  }`;
  const cvvControlClasses = `${classes.control} ${
    formInputsValidity.cvv ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={emailControlClasses}>
        <label htmlFor="email">Your Email</label>
        <input type="text" id="email" ref={emailInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid email!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={cardNumberControlClasses}>
        <label htmlFor="cardNumber">Card Number</label>
        <input type="text" id="cardNumber" ref={cardNumberInputRef} />
      </div>
      <div className={endDateControlClasses}>
        <label htmlFor="endDate">End Date</label>
        <input type="text" id="endDate" ref={endDateInputRef} />
      </div>
      <div className={cvvControlClasses}>
        <label htmlFor="cvv">CVV</label>
        <input type="text" id="cvv" ref={cvvInputRef} />
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
