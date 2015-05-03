module.exports.apply = function(app) {
    var CORS = require('connect-cors');
    var options = {
        origin: '*',
        methods: ['GET', 'POST', 'PUT'],
        headers: [
            'Authorization',
        ],
        credentials: false
    };

    app.use(CORS(options));
};
