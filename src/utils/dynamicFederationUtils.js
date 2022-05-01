import { lazy } from "react";
import "isomorphic-fetch";

const dynamicFederation = async (scope, module) => {
  const container = window[scope];
  await container.init(__webpack_share_scopes__.default);
  return container.get(module).then((factory) => {
    const Module = factory();
    return Module;
  });
};

const loadScripts = async (url) => {
  await new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.src = url;
    (script.type = "text/javascript"), (script.async = true);

    script.onload = function () {
      script.parentElement.removeChild(script);
      resolve();
    };

    script.onerror = function (error) {
      reject(new Error(error));
    };

    document.head.appendChild(script);
  });
};

const getComponent = async (module, componentName) => {
  const moduleRoutes = await dynamicFederation(module, componentName);
  return !moduleRoutes?.default ? [] : moduleRoutes.default;
};

const flattenArrOnKey = (arr, key) => {
  return [...arr].reduce((prev, current) => {
    let childObj;
    current = { ...current };
    if (current[key]) {
      childObj = [...current[key]];
      delete current[key];
    }
    prev.push(current);
    if (childObj) {
      const flatArr = flattenArrOnKey(childObj, key);
      prev = prev.concat(flatArr);
    }

    return prev;
  }, []);
};

const loadLazy = (moduleName, componentName) =>
  lazy(() => dynamicFederation(moduleName, componentName));

const setupInitialApp = async (configs, appRoutes) => {
  const setupAppPromise = new Promise((resolve, reject) => {
    let updateWithModuleName = {};
    let appRoutesInitial = appRoutes;

    configs.map(async (config, index) => {
      const { url, name } = config;
      await loadScripts(`${url}remoteEntry.js`);
      const moduleRoutes = await getComponent(name, "./appRoutes");
      if (moduleRoutes) {
        appRoutesInitial = [...appRoutesInitial, ...moduleRoutes];
      }
      const exposedComponents = await getComponent(name, "./exposedComponents");

      exposedComponents.map((component) => {
        if (component !== "./appRoutes") updateWithModuleName[component] = name;
      });

      if (index === configs.length - 1) {
        resolve({
          updateWithModuleName,
          appRoutesInitial,
        });
      }
    });
  });

  return await setupAppPromise;
};

export {
  dynamicFederation,
  loadScripts,
  getComponent,
  flattenArrOnKey,
  loadLazy,
  setupInitialApp,
};
