module.exports = {
    raiseError: function(error) {
        throw new Error(error);
    },
    processError: function(error) {
        if(error) {
            this.raiseError(error);
        }
    }
};
