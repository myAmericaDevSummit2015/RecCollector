var Apis = require(__base + 'app/lib/apis'),
    GeolocationHelper = require(__base + 'app/lib/geolocationHelper');

var fetch = function(api, options, next) {
    var render = function(data) {
        next(null, data);
    };

    switch(options.type) {
        case 'recreational_areas':
            api.fetchRecreationAreas(options, render, next);

            break;
        case 'facilities':
            api.fetchFacilities(options, render, next);

            break;
        default:
            var message = options.type + ' is not a valid resource'; 
            var notFound = new Error(message);
            notFound.statusCode = 404;

            return next(notFound);
    }
};

var RIDBController = {
    read: function(request, content, next) {
        // TODO: Replace with HTTP Error
        if(!request.user) {
            var unauthorized = new Error('Unauthorized');
            unauthorized.statusCode = 401;

            return callback(unauthorized);
        }

        var options = {
            type: request.params.type,
            coordinates: GeolocationHelper
                .parseCoordinates(request.params.coordinates),
            radius: request.params.radius,
            limit: request.params.limit
        };

        Apis.get('RIDB', options, fetch, next);
    }
};

module.exports = RIDBController;
