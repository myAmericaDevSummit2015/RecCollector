var mongoose = require('mongoose');

module.exports.connect = function() {
    console.log('Connecting to database...');

    mongoose.connect(__services['mongolab'][0]['credentials']['uri'], function(error) {
        if(error) {
            console.log('Database connection error', error);
        } else {
            console.log('Database connected successfully');
        }
    });
};
