import React from "react";
import PropTypes from "prop-types";
import { helloWorld } from "../../actions/General";
import classes from "./AdoptPage.module.css";

const AdoptPage = ({ message, errorMessage }) => {
  return (
    <>
      <h2 className={classes.CenterText}>ADOPT A PET</h2>
    </>
  );
};

AdoptPage.getInitialProps = async () => {
  return helloWorld()
    .then((payload) => {
      return {
        message: payload,
      };
    })
    .catch((error) => ({
      errorMessage: error.message,
    }));
};

AdoptPage.propTypes = {
  message: PropTypes.string,
  errorMessage: PropTypes.string,
};

AdoptPage.defaultProps = {
  message: null,
  errorMessage: null,
};

export default AdoptPage;
