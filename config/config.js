var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'weather-app'
    },
    port: process.env.PORT || 3000,
    db: 'sqlite://localhost/weather-app-development',
    storage: rootPath + '/data/weather-app-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'weather-app'
    },
    port: process.env.PORT || 3000,
    db: 'sqlite://localhost/weather-app-test',
    storage: rootPath + '/data/weather-app-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'weather-app'
    },
    port: process.env.PORT || 3000,
    db: 'sqlite://localhost/weather-app-production',
    storage: rootPath + 'data/weather-app-production'
  }
};

config[env].forecast = {
  service: 'forecast.io',
  key: '107055a7ea288c7e51bd64f4b1ab1daa',
  units: 'f',
  cache: true,
  ttl: {
    minutes:30
  }
};

config[env].geocoder = {
  provider: 'google'
};

module.exports = config[env];
