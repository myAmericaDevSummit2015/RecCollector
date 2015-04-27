var request = require('request'),
    Helper = require(__base + 'app/lib/helper'),
    ApiHelper = require(__base + 'app/lib/apiHelper');

var endpoints = {
    facilites: {
        handleResponse: function(error, response, body) {
            Helper.processError(error);
            ApiHelper.processResponse(response, body, RIDB);
        },
        fetch: function(coordinates, radius, limit) {
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


            ApiHelper.fetchEndpoint(endpoint, endpoints.facilites);
        }
    },
    recreationAreas: {
        handleResponse: function(error, response, body) {
            Helper.processError(error);
            ApiHelper.processResponse(response, body, RIDB);
        },
        fetch: function(coordinates, radius, limit) {
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


            ApiHelper.fetchEndpoint(endpoint, endpoints.recreationAreas);
        }
    }
};

var fetch = function(domain, coordinates, radius, limit, callback) {
    RIDB.callback = callback;

    domain.fetch(coordinates, radius, limit);
};

RIDB = {
    api: null,
    callback: null,
    fetchFacilities: function(coordinates, radius, limit, callback) {
        fetch(endpoints.facilites, coordinates, radius, limit, callback);
    },
    fetchRecreationAreas: function(coordinates, radius, limit, callback) {
        fetch(endpoints.recreationAreas, coordinates, radius, limit, callback);
    }
};

module.exports = RIDB;
