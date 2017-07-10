# React Redux Universal HMR Boilerplate

[![Travis](https://img.shields.io/travis/lorenzomigliorero/react-redux-universal-hmr-boilerplate.svg?maxAge=2592000&style=flat-square)](https://travis-ci.org/lorenzomigliorero/react-redux-universal-hmr-boilerplate) [![David](https://img.shields.io/david/lorenzomigliorero/react-redux-universal-hmr-boilerplate.svg?maxAge=2592000&style=flat-square)]() [![David](https://img.shields.io/david/dev/lorenzomigliorero/react-redux-universal-hmr-boilerplate.svg?maxAge=2592000&style=flat-square)]()

* Webpack v3
* HMR (also for reducers) in development mode
* React router v4
* Redux v3.7
* CSS Modules
* Optional static build
* Long term caching for static assets
* Images optimization ([libpngissue fix for OSX user](https://github.com/tcoopman/image-webpack-loader#libpng-issues))
* React component creation wizard
* Flexbox grid

## How it works

This boilerplate uses React Router v4, with server side rendering.
SSR for CSS modules use `css-loader/locals`, no extra wrapper function for component is needed.

* [Installation](#installation)
* [Development](#development)
* [Production](#production)
* [Static](#static)
* [Component](#component)
* [After deploy](#after-deploy)

## Installation
```javascript
yarn install
```
...as usual...

## Development

Run website in development mode on `localhost:3001`, with Hot Module Replacement for Reducers and Components

```javascript
yarn run dev
```

## Production

### Build

Run build server and client

```
yarn run build
```

### Start 

Run website in production mode on `localhost:3000`

```
yarn run start
```

## Static

This command runs a static build, that contains plain html files.
The navigation will use hash router, instead of browser history.

```
yarn run build:static
```

## Component

This command launches simple wizard for the creation of a react component.
The component will be created on `src/components`.

```
yarn run component

Type the name of the component: Test

What kind of component do you need? (Use arrow keys)
> functional
  stateless
  
Component succesfully created. Do you need another component? (Y/n)
```

## After deploy

After deploy, you can run these commands for a complete live environment on `localhost:3000`:
 
```
yarn install --production
yarn run build
yarn start
```

## Contributing

[https://github.com/claudiocalautti](https://github.com/claudiocalautti)

[https://github.com/dwightjack/umeboshi-cli](https://github.com/dwightjack/umeboshi-cli)