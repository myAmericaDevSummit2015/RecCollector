module.exports.apply = function(app, rest) {
    var TokenController = require(
        __base + 'app/api/v1/controllers/token'
    );

    var doNext = function(request, response, next) {
        next();
    };

    app.use('/api/v1/token', function(request, response, next) {
        if(require.method === 'OPTIONS') { console.log('fuck'); next(); }
    });

    rest.get('token', TokenController.read);
};
