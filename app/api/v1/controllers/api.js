var API = require(__base + 'app/api/v1/models/api');

var renderNotFound = function(next) {
    // TODO: Make these shared
    var notFound = new Error('Not found');
    notFound.statusCode = 404;

    return next(notFound);
};

var renderInternalError = function(error, next) {
    var internalError = new Error('Internal error: ' + error.message);
    internalError.statusCode = 500;

    return next(internalError);
};

var render = function(api, next) {
    return next(null, {api: api});
};

var find = function(name, callback, next) {
    API.findOne({name: name}, function(error, api) {
        if(error) return renderInternalError(error, next);

        if(!api) return renderNotFound(next);

        return callback(api, next);
    });
};

module.exports = {
    read: function(request, content, next) {
        // TODO: Replace with HTTP Error
        if(!request.user) {
            var unauthorized = new Error('Unauthorized');
            unauthorized.statusCode = 401;

            return next(unauthorized);
        }
        
        find(request.params.name, render, next);
    }
};
