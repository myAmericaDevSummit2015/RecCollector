module.exports.apply = function(app) {
    var CORS = require('connect-cors');
    var options = {
        origin: '*',
        methods: ['GET', 'POST', 'PUT'],
        headers: [
            'Allow-Origin',
            'Allow-Headers'
        ],
        credentials: false
    };

    app.use(CORS(options));
};
