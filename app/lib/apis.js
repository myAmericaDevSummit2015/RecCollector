var mongoose = require('mongoose'),
    Api = require(__base +  'app/api/v1/models/api'),
    OpenWeatherMap = require('./openWeatherMap'),
    RIDB = require('./ridb');

var yieldTo = function(api) {
    Apis.callback(api);
};

var assign = function(api) {
    switch(api.name) {
        case 'OpenWeatherMap':
            OpenWeatherMap.api = api;

            break;
        case 'RIDB':
            RIDB.api = api;

            break;
        default:
            throw new Error('Failed to assign api: ' + api.name);
    }
};

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

var addToModule = function(api) {
    Apis.api = api;
};

var set = function(error, api) {
    if(error) {
        throw new Error(error);
    } else {
        assign(api);
        addOperations(api);
        addToModule(api);
        yieldTo(api);
    }
};

var implement = function(name) {
    Api.findOne({name: name}, set);
};

var Apis = {
    api: null,
    callback: null,
    get: function(name, callback) {
        Apis.callback = callback;

        implement(name);
    }
};

module.exports = Apis;
