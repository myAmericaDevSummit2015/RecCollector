module.exports.apply = function(app, rest) {
    var TokenController = require(
        __base + 'app/api/v1/controllers/token'
    );

    rest.get('token', TokenController.read);
};
