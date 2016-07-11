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
        var address = setReq('address', req);//req.query.address ? req.query.address : req.body.address ? req.body.address : null;
        var response = res;
        geocoder.geocode(address, function(err, res) {
            if (err) {
                response.json({err: err});
            } else {
                response.json(res);
            }
        });
    });


    app.post('/api/weather', function (req, res, next) {
        var lat = setReq('lat', req),
            long = setReq('long', req);
        forecast.get([lat, long], function(err, weather) {
            res.json(weather);
        });
    });

  // Hacky way to allow either form submissions or query params
    var setReq = function(name, req) {
        var response = req.query[name] ? req.query[name] : req.body[name] ? req.body[name] : null;
        return response;
    };

};
