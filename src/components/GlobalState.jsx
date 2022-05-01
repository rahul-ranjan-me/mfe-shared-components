import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import CommonContext from "./contextProvider";

const GlobalState = ({
  children,
  federatedComponentsData,
  appRoutesData,
}) => {
  const [user, setUser] = useState("none");
  const [federatedComponents, setFederatedComponents] =
    useState(federatedComponentsData);
  const [appRoutes, setAppRoutes] = useState(appRoutesData);

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
