'use strict';

module.exports = function (defaults) {
  if (typeof defaults !== 'object') {
    defaults = {};
  }

  defaults = {
    baseUri: defaults.baseUri || '/',
    router: defaults.router,
    headerTemplate: defaults.headerTemplate || function () {
      return `---------------------\nROUTES AVAILABLE FOR: ${this.baseUri}\n---------------------`;
    },
    uriTemplate: defaults.uriTemplate || function (method, uri, endpoint) {
      return `==> ${method.toUpperCase()} ${endpoint}`;
    },
    footerTemplate: defaults.footerTemplate || function () {
      return '';
    },
    whilst: defaults.whilst || function () {
      return true;
    }
  };

  return function (options) {
    if (typeof options !== 'object') {
      options = {};
    }

    options = {
      baseUri: options.baseUri || defaults.baseUri,
      router: options.router || defaults.router,
      headerTemplate: options.headerTemplate || defaults.headerTemplate,
      uriTemplate: options.uriTemplate || defaults.uriTemplate,
      footerTemplate: options.footerTemplate || defaults.footerTemplate,
      whilst: options.whilst || defaults.whilst
    };

    if (!options.whilst() || !options.router || !options.router.stack.length) {
      return;
    }

    var uri;
    var endpoint;

    console.log(options.headerTemplate());

    options.router.stack.forEach(function (stack) {
      for (var method in stack.route.methods) {
        if (stack.route.methods.hasOwnProperty(method)) {
          uri = `${options.baseUri}${stack.route.path}`;
          endpoint = stack.route.path;
          console.log(options.uriTemplate(method, uri, endpoint));
        }
      }
    });

    console.log(options.footerTemplate());
  };
};
