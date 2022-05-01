import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import CommonContext from "./contextProvider";

const GlobalState = ({ children, manifestData }) => {
  const [user, setUser] = useState("none");
  const [commonRoutes, setCommonRoutes] = useState([]);
  const [manifests, setManifests] = useState(manifestData);

  useEffect(() => {
    setManifests(manifestData);
  }, [manifestData]);

  return (
    <CommonContext.Provider
      value={{
        user,
        setUser,
        commonRoutes,
        setCommonRoutes,
        manifests,
        setManifests,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

GlobalState.propTypes = {
  children: propTypes.node.isRequired,
  manifestData: propTypes.array.isRequired,
};

export default GlobalState;
