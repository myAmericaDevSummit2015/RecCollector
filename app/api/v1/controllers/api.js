var API = require(__base + 'app/api/v1/models/api');

var renderNotFound = function(callback) {
    // TODO: Render HTTP 404
    throw new Error('Not found');
};

var render = function(api, callback) {
    var header = {'Access-Control-Allow-Origin': '*'};

    return callback(null, {api: api}, {header: header});
};

var find = function(name, next, callback) {
    API.findOne({name: name}, function(error, api) {
        if(error) console.log('An error occured', error);

        if(!api) return renderNotFound(callback);

        return next(api, callback);
    });
};

module.exports = {
    read: function(request, content, callback) {
        // TODO: Replace with HTTP Error
        if(!request.user) throw new Error('Unauthorized');
        
        find(request.params.name, render, callback);
    }
};
