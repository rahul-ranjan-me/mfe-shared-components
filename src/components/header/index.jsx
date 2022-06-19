import React from "react";
import propTypes from "prop-types";
import TabbedLinks from "./TabbedLink";

import "./header.scss";

const Header = ({ children }) => {
  return (
    <div className="masthead-container">
      <div className="masthead">
        <h1>Module federation app (create-mfa-app)</h1>
        <p>
          I am a module federated header component exposed from the
          shared-component MFE.
        </p>
        <TabbedLinks />
        {children}
      </div>
    </div>
  );
};

Header.defaultProps = {
  children: null,
};

Header.propTypes = {
  children: propTypes.node,
};

export default Header;
