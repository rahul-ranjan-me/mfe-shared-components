import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import GlobalContext from "./contextProvider";
import { findModule, loadScripts, getComponent } from "../utils";

const ErrorModule = () => (
  <div>
    There&rsquo;s some error occured while loading the module. Please try again
  </div>
);

const MFAComponentLoader = (props) => {
  const { componentName } = props;
  const { manifests, setManifests } = useContext(GlobalContext);
  const [pluginLoaded, setPluginLoaded] = useState(false);
  const [componentTo, setComponentTo] = useState(() => {});

  useEffect(() => {
    const fetchComponentData = async () => {
      const foundModule = findModule(componentName, manifests, "component");
      if (!foundModule) {
        setComponentTo(<ErrorModule />);
        setPluginLoaded(true);
        return;
      }
      const { url, moduleName, index } = foundModule;
      const allManifests = [...manifests];
      setPluginLoaded(false);
      try {
        if (!manifests[index].loaded) await loadScripts(`${url}remoteEntry.js`);
        const Module = await getComponent(moduleName, componentName);
        setComponentTo(<Module {...props} />);
        allManifests[index].loaded = true;
        setManifests(allManifests);
      } catch (err) {
        setComponentTo(<ErrorModule />);
      }
      setPluginLoaded(true);
    };
    fetchComponentData();
  }, [manifests.length, componentName]);
  return (
    <>{pluginLoaded ? componentTo : <span className="loading">Loading</span>}</>
  );
};

MFAComponentLoader.defaulProps = {
  componentName: undefined,
};

MFAComponentLoader.propTypes = {
  componentName: PropTypes.string,
};

export default MFAComponentLoader;
