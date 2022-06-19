import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import GlobalContext from "../contextProvider";

const SharedContextExample = ({ link }) => {
  const { user, setUser } = useContext(GlobalContext);
  const userRef = useRef();
  const updateUser = () => setUser(userRef.current.value);

  return (
    <div className="tocs">
      <h1>Data sharing through GlobalContext example</h1>
      <p>
        Enter some text on the input which will be shared across different
        micro front-end.
      </p>
      <p>
        <input type="text" ref={userRef} onKeyUp={updateUser} />
        {" "}
        Shared data:
        {" "}
        <strong>{user && user}</strong>
      </p>
      <p>
        <Link to={link}>
          Click on the link to see the data through the shared context
        </Link>
      </p>
    </div>
  );
};

SharedContextExample.propTypes = {
  link: PropTypes.string.isRequired,
};

export default SharedContextExample;
