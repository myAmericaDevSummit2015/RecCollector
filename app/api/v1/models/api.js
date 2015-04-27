var mongoose = require('mongoose');

var apiSchema = mongoose.Schema({
    name: {type: String},
    website: String,
    key: String
});

apiSchema.fetch = function() {
  throw new Error('Interface not implemented: api#fetch');
};

module.exports = mongoose.model('Api', apiSchema);
