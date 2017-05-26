# React Redux Universal HMR Boilerplate

* Webpack v2
* HMR (also for reducers) in development mode
* React router v4
* Redux v3.6
* CSS Modules, also in SSR
* Optional static build

* [Installation](#installation)
* [Development](#development)
* [Production](#production)
* [Static](#static)
* [After deploy](#after-deploy)

## Installation
```javascript
npm run i    
```

## Development

Run website in development mode on `localhost:3001`, with Hot Module Replacement

```javascript
npm run dev
```

## Production

### Build

Run build server and client

```javascript
npm run build
```

### Start 

Run website in production mode on `localhost:3000`

```javascript
npm start
```

## Static

Run a static build

```javascript
npm run build:static
```

## After deploy

After deploy, you can run this commands for a complete live environment on `localhost:3000`:
 
```javascript
npm i --production
npm run build
npm start
```
