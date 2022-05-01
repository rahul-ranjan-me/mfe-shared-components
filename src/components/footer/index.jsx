import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <span className="footer-texts">
        Powered by {new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default Footer;
