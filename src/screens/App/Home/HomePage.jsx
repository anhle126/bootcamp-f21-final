import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { logout } from "../../../actions/User";
// import { getAllCats, getAdoptableCats, getCatInfo } from "../../../actions/Cat";
import urls from "../../../../utils/urls";
import classes from "./HomePage.module.css";

const handleLogout = () =>
  logout()
    .then(() => Router.replace(urls.pages.index))
    .catch(() => window.alert("An error occurred while trying to logout!"));
  //  getAllCats()
  //  getAdoptableCats()
  //  getCatInfo("618db4a77ad851611d5ab859")
  //  .then(() => Router.replace(urls.pages.index))
  //  .catch(() => window.alert("An error occurred while trying to get all cats!"));
  //  above is me trying to test Cat functions when you click log out lol
  

const HomePage = ({ currentUser }) => (
  <div className={classes.root}>
    <h2 className={classes.centerText}>
      Welcome to our app, {currentUser.username}!
    </h2>
    <h3>
      This page can only be accessed by logged-in users, because _app.js
      reroutes users who are not logged-in away from this page.
    </h3>
    <button className={classes.bttn} type="button" onClick={handleLogout}>
      Logout
    </button>
  </div>
);

HomePage.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default HomePage;
