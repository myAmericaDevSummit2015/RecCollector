var Apis = require(__base + 'app/lib/apis'),
    GeolocationHelper = require(__base + 'app/lib/geolocationHelper');

var renderResponse = function(data) {
    WeatherController.callback(null, data);
};

var fetch = function(api) {
    switch(WeatherController.type) {
        case 'current':
            api.fetchCurrent(WeatherController.coordinates, renderResponse);

            break;
        case 'forecast':
            api.fetchForecast(WeatherController.coordinates, renderResponse);

            break;
        default:
            var message = WeatherController.type + ' is not a valid type';
            var unprocessable = new Error(message);
            unprocessable.statusCode = 422;

            return callback(unprocessable);
    }
};

var WeatherController = {
    type: null,
    coordinates: null,
    callback: null,
    read: function(request, content, callback) {
        if(!request.user) {
            var unauthorized = new Error('Unauthorized');
            unauthorized.statusCode = 401;

            return callback(unauthorized);
        }

        WeatherController.type = request.params.type;
        WeatherController
            .coordinates = GeolocationHelper.parseCoordinates(request.params.coordinates);
        WeatherController.callback = callback;

        Apis.get('OpenWeatherMap', fetch);
    }
};

module.exports = WeatherController;
