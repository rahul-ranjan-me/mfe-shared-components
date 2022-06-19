import React from "react";
import { Link, useLocation } from "react-router-dom";

const tabbedLinks = [
  {
    name: "Home",
    to: "/",
    id: "home",
  },
  {
    name: "Micro front-end page",
    to: "/payments",
    id: "micro-front-endpage",
  },
];

const TabbedLinks = () => {
  const { pathname } = useLocation();
  return (
    <ul className="tabbed-links">
      {tabbedLinks.map((link) => (
        <li key={link.id}>
          <Link
            className={link.to === pathname ? "selected" : null}
            to={link.to}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TabbedLinks;
