import React from "react";

import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer">
        <span className="footer-texts">
          {`Powered by ${new Date().getFullYear()}`}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
