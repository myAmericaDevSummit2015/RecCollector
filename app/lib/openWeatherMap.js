var request = require('request'),
    Helper = require(__base + 'app/lib/helper'),
    ApiHelper = require(__base + 'app/lib/apiHelper');

var endpoints = {
    current: {
        handleResponse: function(error, response, body) {
            Helper.processError(error, OpenWeatherMap.callback);
            ApiHelper.processResponse(response, body, OpenWeatherMap);
        },
        fetch: function(coordinates) {
            var endpoint = [
                'http://api.openweathermap.org/data/2.5/weather?lat=',
                coordinates.latitude,
                '&lon=',
                coordinates.longitude,
                '&units=imperial'
            ].join('');

            ApiHelper.fetchEndpoint(endpoint, endpoints.current);
        }
    },
    forecast: {
        handleResponse: function(error, response, body) {
            Helper.processError(error, OpenWeatherMap.callback);
            ApiHelper.processResponse(response, body, OpenWeatherMap);
        },
        fetch: function(coordinates) {
            var endpoint = [
                'http://api.openweathermap.org/data/2.5/forecast/daily?lat=',
                coordinates.latitude,
                '&lon=',
                coordinates.longitude,
                '&cnt=7',
                '&mode=json',
                '&units=imperial'
            ].join('');

            ApiHelper.fetchEndpoint(endpoint, endpoints.forecast);
        }
    }
};

var fetch = function(domain, coordinates, callback) {
    OpenWeatherMap.callback = callback;

    domain.fetch(coordinates);
};

OpenWeatherMap = {
    api: null,
    callback: null,
    fetchCurrent: function(coordinates, callback) {
        fetch(endpoints.current, coordinates, callback);
    },
    fetchForecast: function(coordinates, callback) {
        fetch(endpoints.forecast, coordinates, callback);
    }
};

module.exports = OpenWeatherMap;
