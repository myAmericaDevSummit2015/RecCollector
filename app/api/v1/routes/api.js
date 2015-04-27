module.exports.apply = function(app, rest) {
    var APIController = require(
        __base + 'app/api/v1/controllers/api'
    );

    rest.get('api/:name', APIController.read);
};
