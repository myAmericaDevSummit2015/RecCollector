var request = require('request');
    Helper = require('./helper');

module.exports = {
    raiseEndpointError: function(response, callback) {
        var message = 'Internal Error: Endpoint returned ' +
            response.statusCode;
        var internalError = new Error(message);
        internalError.statusCode = 500;

        return callback(internalError);
    },
    success: function(response) {
        return response.statusCode == 200;
    },
    processResponse: function(response, body, callback, next) {
        if(this.success(response)) {
            callback(body);
        } else {
            this.raiseEndpointError(response, next);
        }
    },
    fetchEndpoint: function(endpoint, callback, next) {
        var ApiHelper = this;
        var handleResponse = function(error, response, body) {
            Helper.processError(error, next);
            ApiHelper.processResponse(response, body, callback, next);
        };

        request(endpoint, handleResponse);
    }
};
