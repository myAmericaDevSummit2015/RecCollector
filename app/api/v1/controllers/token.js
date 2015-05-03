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

var render = function(credentials, callback) {
    var token = jwtToken(credentials.username);

    var message = {
        token: token,
        expires: expiration(),
        username: credentials.username
    };

    return callback(null, message);
};

var TokenController = {
    read: function(request, content, callback) {
        var authorizationHeader = request.headers.authorization;

        if(authorizationHeader) {
            var credentials = parseCredentials(authorizationHeader);

            if(credentials) {
                var handleAuthentication = function(error, isMatch) {
                    if(error) throw new Error(error); // TODO: Make an HTTP Response

                    if(isMatch) {
                        render(credentials, callback);
                    } else {
                        // TODO: Render HTTP Error
                        throw new Error('Invalid credentials');
                    }
                };

                User.authenticate(credentials, handleAuthentication);
            } else {
                // TODO: Render HTTP Error
                throw new Error('Missing HTTP Basic Authentication header');
            }
        } else {
            // TODO: We should render 401
            throw new Error('Missing HTTP Basic Authentication header');
        }
    }
};

module.exports = TokenController;
