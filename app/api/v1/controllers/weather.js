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
            throw new Error(WeatherController.type + ' is not a valid type');
    }
};

var WeatherController = {
    type: null,
    coordinates: null,
    callback: null,
    read: function(request, content, callback) {
        // TODO: Replace with HTTP Error
        if(!request.user) throw new Error('Unauthorized');

        WeatherController.type = request.params.type;
        WeatherController
            .coordinates = GeolocationHelper.parseCoordinates(request.params.coordinates);
        WeatherController.callback = callback;

        Apis.get('OpenWeatherMap', fetch);
    }
};

module.exports = WeatherController;
