# Shared components micro front-end

'shared-components' is a special micro front-end to expose re-usable components, utilities methods, configuration as Webpack module federated components.

Since shared-component is server as micro front-end, so you don't need to re-deploy your other consumer micro front-ends or shell application to consume new version of exposed wares from this.

`"./dynamicFederationUtils": "./src/utils/dynamiceFederationUtils"`
`"./components": "./src/components"`

## Running locally

`npm run start`
By default it runs on port `6002` on dev environment. You can update the port in `start` script of `package.json`. Make sure you are updating the micro front-end and shell application to read the new configured port if you wish to change it.

You will need to go to `src/index.js` files of micro front-ends to update it, if you are not reading it from any dynamice location like REST endpoint etc.

This repo exposes helping APIs or Component for Webpack dynamic module federation.

### Dynamic federation utilitis
`src/utils/dynamiceFederationUtils`

All methods required to load micro front-end components or routes dynamically.

### MFEComponentLoader
`/src/components/MFAComponentLoader.jsx`

Component that helps loading exposed modules dynamically.

### Context to share data across MFEs

`src/components/GlobalState.jsx` and `src/components/contextProvider.jsx`

### Other example reusable components

- Header
- Footer
- Readme
- SharedContextExample

## Template repos:
- Shell container: [git@github.com:rahul-ranjan-me/mfe-shell-app.git](https://github.com/rahul-ranjan-me/mfe-shell-app)
- Shared components: [git@github.com:rahul-ranjan-me/mfe-shared-components.git](https://github.com/rahul-ranjan-me/mfe-shared-components)
- Micro front-end application: [git@github.com:rahul-ranjan-me/mfe-app.git](https://github.com/rahul-ranjan-me/mfe-app)
