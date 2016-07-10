var express = require('express'),
  router = express.Router(),
  db = require('../models'),
  config = require('../../config/config'),
  geocoder = (require('node-geocoder')(config.geocoder)),
  Forecast = require('forecast'),
  forecast = new Forecast(config.forecast);

module.exports = function (app) {
  /**
  * Request coordinates based on city/state
  **/
  app.post('/api/coords', function(req, res, next) {
    var address = setReq('address');//req.query.address ? req.query.address : req.body.address ? req.body.address : null;
    console.log(address);
    var response = res;
    geocoder.geocode(address, function(err, res) {
      if (err) {
        response.send({err: err});
      } else {
        response.send(res);
      }
    });
  });


  app.post('/api/weather', function (req, res, next) {
    var lat = setReq('lat'),
      long = setReq('long');
    console.log(req.body);
    var id = req.body.id;
    res.send({id: id});
  });

  // Hacky way to allow either form submissions or query params
  var setReq = function(name) {
    var response = req.query[name] ? req.query[name] : req.body[name] ? req.body[name] : null;
    return response;
  };

};
