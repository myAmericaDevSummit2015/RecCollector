var API = require(__base + 'app/api/v1/models/api');

var renderNotFound = function(callback) {
    // TODO: Make these shared
    var notFound = new Error('Not found');
    notFound.statusCode = 404;

    return callback(notFound);
};

var render = function(api, callback) {
    return callback(null, {api: api});
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
        if(!request.user) {
            var unauthorized = new Error('Unauthorized');
            unauthorized.statusCode = 401;

            return callback(unauthorized);
        }
        
        find(request.params.name, render, callback);
    }
};
