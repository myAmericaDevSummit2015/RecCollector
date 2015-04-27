module.exports.apply = function(app) {
    var morgan = require('morgan');

    app.use(morgan('common'));
};
