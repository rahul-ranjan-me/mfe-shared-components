import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

import "./header.scss";

const Header = ({ children }) => {
  return (
    <div className="masthead-container">
      <div className="masthead">
        {/* <Link to="/">
          <span className="brand-logo" />
          <span className="brand-name logoText">Bootstrap Utility</span>
        </Link> */}
        <h1>Header</h1>
        <p>I am a module federated header component exposed from the shared-component MFE.</p>
        {children}
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
