var moment = require('moment'),
    jwt = require('jwt-simple'),
    User = require(__base + 'app/api/v1/models/user');

var parseCredentials = function(header) {
    // TODO: Handle case where [1] doesn't exist
    var credentials = header.split(' ')[1];

    if(!credentials) return null;

    var credentialsUTF8 = new Buffer(credentials, 'base64')
        .toString('utf8');
    
   // REVIEW: Is there a more succinct way to do this? (exiquio)
    var credentialsSplit = credentialsUTF8.split(':');
    var username = credentialsSplit[0],
        password = credentialsSplit[1];

    return {username: username, password: password};
};

var expires;

var expiration = function() { 
    if(!expires) expires = moment().add(7, 'days').valueOf(); 

    return expires;
};

var jwtToken = function(username) {
    var tokenProperties = {
        iss: username,
        exp: expiration()
    };

    return jwt.encode(tokenProperties, __JWT_SECRET);
};

var render = function(credentials, next) {
    var token = jwtToken(credentials.username);

    var message = {
        token: token,
        expires: expiration(),
        username: credentials.username
    };

    return next(null, message);
};

var TokenController = {
    read: function(request, content, next) {
        var authorizationHeader = request.headers.authorization;

        var message;
        var unprocessable;

        if(authorizationHeader) {
            var credentials = parseCredentials(authorizationHeader);

            if(credentials) {
                var handleAuthentication = function(error, isMatch) {
                    if(error) {
                        error.statusCode = 500;

                        return next(error);
                    }

                    if(isMatch) {
                        render(credentials, next);
                    } else {
                        var forbidden = new Error('Invalid credentials');
                        forbidden.statusCode = 403;

                        return next(forbidden);
                    }
                };

                User.authenticate(credentials, handleAuthentication);
            } else {
                message = 'Missing HTTP Basic Authentication credentials';
                unprocessable = new Error(message);
                unprocessable.statusCode = 422;

                return next(unprocessable);
            }
        } else {
            message = 'Missing HTTP Basic Authentication header';
            unprocessable = new Error(message);
            unprocessable.statusCode = 422;

            return next(unprocessable);
        }
    }
};

module.exports = TokenController;
