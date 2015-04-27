var request = require('request'),
    Helper = require('./helper');

module.exports = {
    raiseEndpointError: function(response) {
        throw new Error('Endpoint error: ' + response.statusCode);
    },
    success: function(response) {
        return response.statusCode == 200;
    },
    processResponse: function(response, body, api) {
        if(this.success(response)) {
            api.callback(body);
        } else {
            this.raiseEndpointError(response);
        }
    },
    fetchEndpoint: function(endpoint, requestor) {
        request(endpoint, requestor.handleResponse);
    }
};
