import React from "react";
import propTypes from "prop-types";

import "./header.scss";

const Header = ({ children }) => {
  return (
    <div className="masthead-container">
      <div className="masthead">
        <h1>Header</h1>
        <p>I am a module federated header component exposed from the shared-component MFE.</p>
        {children}
      </div>
    </div>
  );
};

Header.defaultProps = {
  children: null
};

Header.propTypes = {
  children: propTypes.node,
};

export default Header;
