module.exports.apply = function(app, rest) {
    var options = {context: '/api/v1'};

    app.use(rest.rester(options));
};
