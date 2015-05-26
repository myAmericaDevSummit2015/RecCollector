var request = require('request'),
    Helper = require(__base + 'app/lib/helper'),
    ApiHelper = require(__base + 'app/lib/apiHelper');

var endpoints = {
    facilites: {
        fetch: function(coordinates, radius, limit, callback, next) {
            var endpoint = [
                'https://ridb.recreation.gov/api/v1/facilities?latitude=',
                coordinates.latitude,
                '&longitude=',
                coordinates.longitude,
                '&radius=',
                radius,
                '&limit=',
                limit,
                '&apikey=',
                __RIDB_KEY
            ].join('');

            ApiHelper.fetchEndpoint(endpoint, callback, next);
        }
    },
    recreationAreas: {
        fetch: function(coordinates, radius, limit, callback, next) {
            var endpoint = [
                'https://ridb.recreation.gov/api/v1/recareas?latitude=',
                coordinates.latitude,
                '&longitude=',
                coordinates.longitude,
                '&radius=',
                radius,
                '&limit=',
                limit,
                '&apikey=',
                __RIDB_KEY
            ].join('');

            ApiHelper.fetchEndpoint(endpoint, callback, next);
        }
    }
};

var fetch = function(domain, coordinates, radius, limit, callback, next) {
    domain.fetch(coordinates, radius, limit, callback, next);
};

RIDB = {
    fetchFacilities: function(options, callback, next) {
        fetch(
            endpoints.facilites,
            options.coordinates,
            options.radius,
            options.limit,
            callback,
            next
        );
    },
    fetchRecreationAreas: function(options, callback, next) {
        fetch(
            endpoints.recreationAreas,
            options.coordinates,
            options.radius,
            options.limit,
            callback,
            next
        );
    }
};

module.exports = RIDB;
