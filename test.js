'use strict';

var exec = require('child_process').exec;
var http = require('http');
var test = require('tap').test;
var express = require('express');
var request = require('request');
var LogRoutes = require('./index.js');

test('this should see valid routes and not see invalid routes', t => {
  t.plan(4);

  var baseUri = '/test';

  var log = [];
  console.log = function (d) {
    log.push(d);
  };


  // test typical router setup

  var router = express.Router();

  router.get('/ftw', function (request, response) {
    console.log
    return response.send('ftw');
  });

  var logRoutes = LogRoutes();

  logRoutes({
    baseUri: baseUri,
    router: router,
    headerTemplate: function () {
      return `-- ${baseUri} --`;
    }
  });

  t.ok(log.indexOf('==> GET /ftw') > -1, 'valid route');
  t.ok(log.indexOf('==> GET /wtf') === -1, 'invalid route');


  // test a new router, for coverage

  var routerCustomized = express.Router();

  routerCustomized.get('/omg', function (request, response) {
    return response.send('omg');
  });

  var logRoutesCustomized = LogRoutes({
    router: routerCustomized
  });

  logRoutesCustomized();

  t.ok(log.indexOf('==> GET /omg') > -1, 'valid route');


  // test a new router, validating whilst()

  var routerWhilst = express.Router();

  routerWhilst.get('/y-u-no-c-me', function (request, response) {
    return response.send('y u no c me');
  });

  logRoutesCustomized({
    whilst: function () {
      return false;
    }
  });

  t.ok(log.indexOf('==> GET /y-u-no-c-me') === -1, 'valid route not logged, due to whilst');
});
