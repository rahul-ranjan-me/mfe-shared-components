import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import GlobalContext from "./contextProvider";
import { getComponent } from "../utils";

const ErrorModule = () => (
  <div>
    There&rsquo;s some error occured while loading the module. Please try again
  </div>
);

const MFAComponentLoader = (props) => {
  const { componentName } = props;
  const { federatedComponents } = useContext(GlobalContext);
  const [pluginLoaded, setPluginLoaded] = useState(false);
  const [componentTo, setComponentTo] = useState(() => {});

  useEffect(() => {
    const fetchComponentData = async () => {
      setPluginLoaded(false);
      try {
        const Module = await getComponent(
          federatedComponents[componentName],
          componentName
        );
        setComponentTo(<Module {...props} />); // eslint-disable-line react/jsx-props-no-spreading
      } catch (err) {
        setComponentTo(<ErrorModule />);
      }
      setPluginLoaded(true);
    };
    fetchComponentData();
  }, [federatedComponents]);

  return (
    pluginLoaded ? componentTo : <span className="loading">Loading</span>
  );
};

MFAComponentLoader.defaultProps = {
  componentName: undefined,
};

MFAComponentLoader.propTypes = {
  componentName: PropTypes.string,
};

export default MFAComponentLoader;
