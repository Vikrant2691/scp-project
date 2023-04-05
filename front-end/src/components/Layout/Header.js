import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import HeaderOrderButton from "./HeaderOrderButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <div className="navbar navbar-fixed-top" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <span className="navbar-brand">ReactMeals</span>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <HeaderOrderButton onClick={props.onShowOrder} />
              </li>
              <li>
                <HeaderCartButton onClick={props.onShowCart} />
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
