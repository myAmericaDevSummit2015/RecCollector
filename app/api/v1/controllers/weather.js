var Apis = require(__base + 'app/lib/apis'),
    GeolocationHelper = require(__base + 'app/lib/geolocationHelper');

var fetch = function(api, options, next) {
    var render = function(data) {
        next(null, data);
    };

    switch(options.type) {
        case 'current':
            api.fetchCurrent(options, render, next);

            break;
        case 'forecast':
            api.fetchForecast(options, render, next);

            break;
        default:
            var message = WeatherController.type + ' is not a valid type';
            var unprocessable = new Error(message);
            unprocessable.statusCode = 422;

            return next(unprocessable);
    }
};

var WeatherController = {
    read: function(request, content, next) {
        if(!request.user) {
            var unauthorized = new Error('Unauthorized');
            unauthorized.statusCode = 401;

            return callback(unauthorized);
        }

        var options = {
            type: request.params.type,
            coordinates: GeolocationHelper
                .parseCoordinates(request.params.coordinates)
        };

        Apis.get('OpenWeatherMap', options, fetch, next);
    }
};

module.exports = WeatherController;
