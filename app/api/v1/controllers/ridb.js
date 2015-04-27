var Apis = require(__base + 'app/lib/apis'),
    GeolocationHelper = require(__base + 'app/lib/geolocationHelper');

var renderResponse = function(data) {
    RIDBController.callback(null, data, {headers: {'Access-Control-Allow-Origin': '*'}});
};

var fetch = function(api) {
    switch(RIDBController.type) {
        case 'recreation_areas':
            api.fetchRecreationAreas(
                RIDBController.coordinates,
                RIDBController.radius,
                RIDBController.limit,
                renderResponse
            );

            break;
        case 'facilities':
            api.fetchFacilities(
                RIDBController.coordinates,
                RIDBController.radius,
                RIDBController.limit,
                renderResponse
            );

            break;
        default:
            throw new Error(RIDBController.type + ' is not a valid type');
    }
};

// TODO: Remove stuff from public scope that should be private (exiqiuo)
var RIDBController = {
    type: null,
    coordinates: null,
    radius: null,
    limit: null,
    callback: null,
    read: function(request, content, callback) {
        // TODO: Replace with HTTP Error
        if(!request.user) throw new Error('Unauthorized');

        RIDBController.type = request.params.type;
        RIDBController
            .coordinates = GeolocationHelper.parseCoordinates(request.params.coordinates);
        RIDBController.radius = request.params.radius;
        RIDBController.limit = request.params.limit;
        RIDBController.callback = callback;

        Apis.get('RIDB', fetch);
    }
};

module.exports = RIDBController;
