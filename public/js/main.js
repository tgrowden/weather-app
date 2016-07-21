var app = angular.module('weatherApp', []);
app.controller('mainCtrl', function($scope, $http) {
    var skycons = new Skycons({"color": "black"});
    $scope.address = '289 E main st Frostburg MD';
    $scope.coordinates = false;
    
    $scope.getCoords = function() {
        var req = {
            method: 'POST',
            url: '/api/coords?address=' + $scope.address
        };
        $http(req).then(function(success) {
            success.err = false;
            return success;
        }, 
        function(err) {
            err.err = true;
            return err;
        }).then(function(data) {
            if (data.err === false) {
                $scope.locations = data.data;
            } else {
                $scope.locations = false;
            }
        });
    };

    $scope.getWeather = function(key) {
        
        var selectedLocation = $scope.locations[key];
        var req = {
            method: 'POST',
            url: '/api/weather?lat=' + selectedLocation.latitude + '&long=' + selectedLocation.longitude
        };
        $http(req).then(function(success) {
            success.err = false;
            return success;
        }, function(err) {
            err.err = true;
            return err;
        }).then(function(data) {
            if (data.err === false) {
                var weatherData = data.data;
                _(['minutely', 'hourly', 'daily']).forEach(function(index) {
                    weatherData[index].title = index;
                    _(weatherData[index].data).forEach(function(i) {
                        i.timeString = moment(i.time * 1000).format('LT');
                        i.dateString = moment(i.time * 1000).calendar();
                        i.dayString = moment(i.time * 1000).format('dddd');
                        i.cloudCover = (i.cloudCover * 100).toFixed(0) + '%';
                        i.humidity = (i.humidity * 100).toFixed(0) + '%';
                        i.precipProbability = (i.precipProbability * 100).toFixed(0) + '%';
                        if (index == 'daily') {
                            i.sunriseTimeString = moment(i.sunriseTime * 1000).format('LT');
                            i.sunsetTimeString = moment(i.sunsetTime * 1000).format('LT');
                            i.precipIntensityMaxTimeString = moment(i.precipIntensityMaxTimeString * 1000).format('LT');
                            i.temperatureMinTimeString = moment(i.temperatureMinTime * 1000).format('LT');
                            i.temperatureMaxTimeString = moment(i.temperatureMaxTime * 1000).format('LT');
                            i.apparentTemperatureMinTimeString = moment(i.apparentTemperatureMinTime * 1000).format('LT');
                            i.apparentTemperatureMaxTimeString = moment(i.apparentTemperatureMaxTime * 1000).format('LT');
                            i.moonPhase = (i.moonPhase * 100).toFixed(0) + '%';
                        }
                    });
                });
                $scope.weatherData = weatherData;
                $scope.setWeather('hourly');
            }
        });
    };

    $scope.setWeather = function(key) {
        $scope.weatherData.selected = $scope.weatherData[key];
        document.getElementById('textarea').value = JSON.stringify($scope.weatherData.selected, null, 2);
    };

    $scope.skycons = function(element, attrs) {
        var el = element[0];
        var icon = attrs.skycons;
        console.log(attrs);
        skycons.add(el, icon);
        skycons.play();
        console.log(JSON.stringify(attrs, null, 2));
    };
});

app.directive('skycons', function () {
    return function (scope, element, attrs) {
        scope.skycons(element, attrs);
    };
});
