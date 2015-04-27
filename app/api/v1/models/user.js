var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');


var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true}
});

userSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) return next();
    
    bcrypt.genSalt(10, function(error, salt) {
        // TODO: DRY - Create a helper method to do this.
        //
        //   var processError = function(err, callback) {
        //       if(error) return callback(error);
        //   };
        if(error) return next(error);

        bcrypt.hash(user.password, salt, function(error, hash) {
            if(error) return next(error); // TODO: DRY

            user.password = hash;

            next();
        });
    });
});

userSchema.statics.authenticate = function(credentials, callback) {
    var User = this;

    var criteria = {username: credentials.username};
    var compare = function(record, password, callback) {
        record.comparePassword(password, callback);
    };
    var postCompare = function(error, isMatch) {
        return callback(error, isMatch);
    };

    User.findOne(criteria, function(error, record) {
        if(record) {
            compare(record, credentials.password, postCompare);
        } else {
            return callback(error, false);
        }
    });
};

userSchema.methods.comparePassword = function(password, callback) {
    var user = this;

    bcrypt.compare(password, user.password, function(error, isMatch) {
        return callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
