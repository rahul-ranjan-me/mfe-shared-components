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

const setupRemotes = async (modules) => {
  for (const i in modules) {
    // eslint-disable-line no-restricted-syntax
    if (module[i]) {
      const { url } = module[i];
      await loadScripts(url);
    }
  }
};

const getAppRoutes = async (modules, appLocalRoutes) => {
  let allModuleRoutes = [...appLocalRoutes];
  for (const i in modules) {
    if (modules[i].noInitialRoutes) continue;
    const { name } = modules[i];
    const moduleRoutes = await getComponent(name, "./routes");
    allModuleRoutes = [...allModuleRoutes, ...moduleRoutes];
  }
  return allModuleRoutes;
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

const getRoutes = async (modules, appLocalRoutes, key) => {
  let allModuleRoutes = [...appLocalRoutes];
  let allComponents = [];
  const manifests = [];
  for (const i in modules) {
    // eslint-disable-line no-restricted-syntax
    if (modules[i].noInitialRoutes) continue;
    const { url } = modules[i];

    try {
      const response = await fetch(`${url}/manifest.json`);
      const data = await response.json();
      const { moduleName, appRoutes, components } = data;
      manifests.push({
        url,
        moduleName,
        moduleRoutes: flattenArrOnKey(appRoutes, key),
        components,
      });
      allModuleRoutes = [...allModuleRoutes, ...appRoutes];
      allComponents = [...allComponents, ...components];
    } catch (e) {
      console.log(e);
    }
  }

  return {
    manifests,
    allModuleRoutes,
    allComponents,
  };
};

const loadLazy = (moduleName, componentName) =>
  lazy(() => dynamicFederation(moduleName, componentName));

const findModule = (name, manifests, type) => {
  const nestedObj = type !== "component" ? "moduleRoutes" : "components";
  for (let i = 0; i < manifests.length; i++) {
    for (let z = 0; z < manifests[i][nestedObj].length; z++) {
      if (
        type !== "component"
          ? manifests[i][nestedObj][z].path === name
          : manifests[i][nestedObj][z].indexOf(name) !== -1
      ) {
        const { url, moduleName } = manifests[i];
        return { url, moduleName, index: i };
      }
    }
  }
  return undefined;
};

const loadModule = ({ url, moduleName }) => {
  return new Promise((resolve, reject) => {
    loadScripts(`${url}remoteEntry.js`).then(async () => {
      try {
        const mfaModule = await getComponent(moduleName, "./routes");
        if (mfaModule) {
          resolve(mfaModule);
        } else {
          reject(new Error("Error loading module."));
        }
      } catch (err) {
        reject(new Error("Error loading module."));
      }
    });
  });
};

export {
  dynamicFederation,
  loadScripts,
  getAppRoutes,
  getComponent,
  setupRemotes,
  flattenArrOnKey,
  getRoutes,
  loadLazy,
  findModule,
  loadModule,
};
