# express-log-routes [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

[![Greenkeeper badge](https://badges.greenkeeper.io/busterc/express-log-routes.svg)](https://greenkeeper.io/)

> console.log available Express routes 

## Installation

```sh
$ npm install --save express-log-routes
```

## Usage

```js
var router = require('express').Router();
var LogRoutes = require('express-log-routes');

// Initialize with the default configuration:
/*
{
  baseUri: '/',
  router: undefined,
  headerTemplate: function () {
    return `---------------------\nROUTES AVAILABLE FOR: ${this.baseUri}\n---------------------`;
  },
  uriTemplate: function (method, uri, endpoint) {
    return `==> ${method.toUpperCase()} ${endpoint}`;
  },
  footerTemplate: function () {
    return '';
  },
  whilst: function () {
    return true;
  }
}
*/
var logRoutes = LogRoutes();

// or, customize the initial configuration
var options = {
  whilst: function() {
    // only during dev
    if (process.env.ENV === 'dev') {
      return true;
    }
    return false;
  }
};
logRoutes = LogRoutes(options);

// ...

// Note: if you pass a router into the initial configuration,
//       you can then simply activate the logging with:
//
//         logRoutes();
//
// Otherwise: activate logging for a specific router:
logRoutes({
  router: router,
  baseUri: '/api/user' // <-- you can also override initial configurations
});

```
## License

ISC © [Buster Collings](https://about.me/buster)


[npm-image]: https://badge.fury.io/js/express-log-routes.svg
[npm-url]: https://npmjs.org/package/express-log-routes
[travis-image]: https://travis-ci.org/busterc/express-log-routes.svg?branch=master
[travis-url]: https://travis-ci.org/busterc/express-log-routes
[daviddm-image]: https://david-dm.org/busterc/express-log-routes.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/busterc/express-log-routes
