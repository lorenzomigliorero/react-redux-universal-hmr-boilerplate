# React Redux Universal HMR Boilerplate

[![Travis](https://img.shields.io/travis/lorenzomigliorero/react-redux-universal-hmr-boilerplate.svg?maxAge=2592000&style=flat-square)](https://travis-ci.org/lorenzomigliorero/react-redux-universal-hmr-boilerplate)

* Webpack v2
* HMR (also for reducers) in development mode
* React router v4
* Redux v3.6
* CSS Modules, also in SSR
* Optional static build
* React component creation wizard
* Flexbox grid

## How it works

This boilerplate uses React Router v4, with server side rendering.
SSR for CSS modules doesn't require https://github.com/kriasoft/isomorphic-style-loader, the syntax remains the same, no extra wrapper function for component is needed.
The server-side rendering of CSS modules use `css-modules-transform`, with a custom simple preprocess, which recreates the webpack loaders flux on every required scss.

* [Installation](#installation)
* [Development](#development)
* [Production](#production)
* [Static](#static)
* [Component](#component)
* [After deploy](#after-deploy)

## Installation
```javascript
npm run i    
```
...as usual...

## Development

Run website in development mode on `localhost:3001`, with Hot Module Replacement for Reducers and Components

```javascript
npm run dev
```

## Production

### Build

Run build server and client

```
npm run build
```

### Start 

Run website in production mode on `localhost:3000`

```
npm start
```

## Static

This command runs a static build, that contains plain html files.
The navigation will use hash router, instead of browser history.

```
npm run build:static
```

## Component

This command launches simple wizard for the creation of a react component.
The component will be created on `src/components`.

```
npm run component

Type the name of the component: Test

What kind of component do you need? (Use arrow keys)
> functional
  stateless
  
Component succesfully created. Do you need another component? (Y/n)
```

## After deploy

After deploy, you can run these commands for a complete live environment on `localhost:3000`:
 
```
npm i --production
npm run build
npm start
```
## Contributing

[https://github.com/michalkvasnicak/babel-plugin-css-modules-transform](https://github.com/michalkvasnicak/babel-plugin-css-modules-transform)
[https://github.com/claudiocalautti](https://github.com/claudiocalautti)
