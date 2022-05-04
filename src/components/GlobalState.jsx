import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import CommonContext from "./contextProvider";

const GlobalState = ({ children, federatedComponentsData, appRoutesData }) => {
  const [user, setUser] = useState("none");
  const [federatedComponents, setFederatedComponents] = useState([]);
  const [appRoutes, setAppRoutes] = useState([]);

  useEffect(() => {
    setFederatedComponents(federatedComponentsData);
    setAppRoutes(appRoutesData);
  }, [appRoutesData, federatedComponentsData]);

  return (
    <CommonContext.Provider
      value={{
        user,
        setUser,
        federatedComponents,
        setFederatedComponents,
        appRoutes,
        setAppRoutes,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

GlobalState.propTypes = {
  children: propTypes.node.isRequired,
};

export default GlobalState;
