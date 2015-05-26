var mongoose = require('mongoose'),
    Api = require(__base +  'app/api/v1/models/api'),
    OpenWeatherMap = require('./openWeatherMap'),
    RIDB = require('./ridb');

var implement = function(name, options, callback, next) {
    var addOperations = function(api) {
        switch(api.name) {
            case 'OpenWeatherMap':
                api.fetchCurrent = OpenWeatherMap.fetchCurrent;
                api.fetchForecast = OpenWeatherMap.fetchForecast;

                break;
            case 'RIDB':
                api.fetchRecreationAreas = RIDB.fetchRecreationAreas;
                api.fetchFacilities = RIDB.fetchFacilities;

                break;
            default:
                throw new Error('Failed to add operations: ' + api.name);
        }
    };

    var yieldTo = function(api) {
        callback(api, options, next);
    };

    var set = function(error, api) {
        if(error) {
            throw new Error(error);
        } else {
            addOperations(api);
            yieldTo(api);
        }
    };

    Api.findOne({name: name}, set);
};

var Apis = {
    get: function(name, options, callback, next) {
        implement(name, options, callback, next);
    }
};

module.exports = Apis;
