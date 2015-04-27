module.exports.apply = function(app) {
    var JWTAuthentication = require(__base + 'app/lib/jwtAuthentication');

    app.use(JWTAuthentication());
};
