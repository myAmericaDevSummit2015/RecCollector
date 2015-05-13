module.exports = {
    raiseError: function(error, callback) {
        var internalError = new Error('Internal Error: ' + error.message);
        interalError.statusCode = 500;

        return callback(internalError);
    },
    processError: function(error, callback) {
        if(error) {
            this.raiseError(error);
        }
    }
};
