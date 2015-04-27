var path = require('path');

module.exports = (function() {
    global.__base = path.resolve('./') + '/';

    return {
        pending: function(message) {
            console.log('Pending: ', message);
        }
    };
})();
