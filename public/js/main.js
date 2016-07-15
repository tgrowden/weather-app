var app = angular.module('weatherApp', []);
app.controller('mainCtrl', function($scope, $http) {
    $scope.address = '289 E main st Frostburg MD';
    $scope.location = {};
    $scope.selectedLocation = false;
    
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
                $scope.location = data.data;
            } else {
                $scope.location = false;
            }
        });
    };

    $scope.getWeather = function(key) {
        
        var location = $scope.location[key];
        console.log(JSON.stringify(location, null, 2));
        var req = {
            method: 'POST',
            url: '/api/weather?lat=' + location.latitude + '&long=' + location.longitude
        };
        $http(req).then(function(success) {
            success.err = false;
            return success;
        }, function(err) {
            err.err = true;
            return err;
        }).then(function(data) {
            if (data.err === false) {
                data = data.data;
                console.log(JSON.stringify(data, null, 2));
                _(['minutely', 'hourly', 'daily']).forEach(function(item) {
                    _(data[item].data).forEach(function(i) {
                        i.formattedTime = moment(i.time * 1000).format('MM/DD/YY HH:mm');
                    });
                });
                console.log(JSON.stringify(data));
                $scope.weatherData = JSON.stringify(data, null, 2);
            }
        });
        $scope.selectedLocation = true;
    };

    $scope.setWeather = function(key) {
        console.log(key);
    };
    $scope.foo = function() {
        //console.log(this.value);
    };
});
