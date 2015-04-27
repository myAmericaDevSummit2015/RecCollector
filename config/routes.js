module.exports.apply = function(app, rest) {
    var modules = [
        __base + 'app/api/v1/routes/token',
        __base + 'app/api/v1/routes/api',
        __base + 'app/api/v1/routes/ridb',
        __base + 'app/api/v1/routes/weather',
        __base + 'app/api/v1/routes/textToSpeech'
    ];

    modules.forEach(function(module) {
        require(module).apply(app, rest);
    });
};
