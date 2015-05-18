var request = require('request');
    // REVIEW: Why did this get pulled in? Should we piggy back it's methods?
    // (exiquio)
    //Helper = require('./helper');

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
    processResponse: function(response, body, api) {
        if(this.success(response)) {
            api.callback(body);
        } else {
            this.raiseEndpointError(response, api.callback);
        }
    },
    fetchEndpoint: function(endpoint, requestor) {
        request(endpoint, requestor.handleResponse);
    }
};
