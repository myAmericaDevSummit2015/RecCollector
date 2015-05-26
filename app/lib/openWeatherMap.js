var request = require('request'),
    Helper = require(__base + 'app/lib/helper'),
    ApiHelper = require(__base + 'app/lib/apiHelper');

var endpoints = {
    current: {
        fetch: function(coordinates, callback, next) {
            var endpoint = [
                'http://api.openweathermap.org/data/2.5/weather?lat=',
                coordinates.latitude,
                '&lon=',
                coordinates.longitude,
                '&units=imperial'
            ].join('');

            ApiHelper.fetchEndpoint(endpoint, callback, next);
        }
    },
    forecast: {
        fetch: function(coordinates, callback, next) {
            var endpoint = [
                'http://api.openweathermap.org/data/2.5/forecast/daily?lat=',
                coordinates.latitude,
                '&lon=',
                coordinates.longitude,
                '&cnt=7',
                '&mode=json',
                '&units=imperial'
            ].join('');

            ApiHelper.fetchEndpoint(endpoint, callback, next);
        }
    }
};

var fetch = function(domain, coordinates, callback, next) {
    domain.fetch(coordinates, callback, next);
};

OpenWeatherMap = {
    fetchCurrent: function(options, callback, next) {
        fetch(endpoints.current, options.coordinates, callback, next);
    },
    fetchForecast: function(options, callback, next) {
        fetch(endpoints.forecast, options.coordinates, callback, next);
    }
};

module.exports = OpenWeatherMap;
