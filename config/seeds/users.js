module.exports = function() {
    // TODO: These seeds could be DRY'd further, I suspect (exiquio)
    // Consider seeds just being a collection of attributes. seeds.js
    // could have a more robust method that does all the housekeeping
    // around checking for the the existence of a record and then record
    // creation. (exiquio);
    var User = require(__base + 'app/api/v1/models/user');

    [
        {
            username: process.env.MADC2015API_USERNAME,
            password: process.env.MADC2015API_PASSWORD
        }
    ].forEach(function(attributes) {
        User.find({username: attributes.username}, function(error, records) {
            if(records.length) return;

            new User(attributes).save();
        });
    });
}
