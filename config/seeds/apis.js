module.exports = function() {
    var Api = require(__base + 'app/api/v1/models/api');

    [
        {
            name: 'RIDB',
            url: 'http://usda.github.io/RIDB',
            key: __RIDB_KEY,
        },
        {
            name: 'OpenWeatherMap',
            url: 'http://openweathermap.org/api',
            key: null
        }
    ].forEach(function(apiAttributes) {
        Api.find({name: apiAttributes.name}, function(error, apiRecord) {
            if(apiRecord.length) return

            new Api(apiAttributes).save();
        });
    });
}
