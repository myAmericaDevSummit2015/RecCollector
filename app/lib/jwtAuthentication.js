var jwt = require('jwt-simple'),
    User = require(__base + 'app/api/v1/models/user');

var isExempt = function(request) {
    // TODO: Unhard code path
    return request._parsedUrl.pathname === '/api/v1/token';
};

var parseToken = function(request) {
    return (request.body && request.body.access_token) ||
        (request.query && request.query.access_token) ||
        request.headers['x-access-token'];
};

var validateToken = function(request, response, next) {
    if(isExempt(request)) return next(); 

    var token = parseToken(request);

    if(!token) return next();

    try {
        var decodedToken = jwt
            .decode(token, __JWT_SECRET);

        if(decodedToken.exp <= Date.now()) {
            // TODO: HTTP Error (exiquio)
            throw new Error('Access token has expired');
        }

        // TODO: use _id (exiquio)
        User.findOne({username: decodedToken.iss}, function(error, user) {
            request.user = user;

            next();
        });

    } catch(error) {
        // NOTE: jwt-token throws errors when decode fails. It only means we
        // don't have an authenticated users.
        return next();
    }
};

module.exports = function() {
    return validateToken;
};
