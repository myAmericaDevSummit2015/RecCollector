var mockDb = require(__base + 'spec/support/mockDb');

module.exports = {
    mocks: {
        'weather_api': require(__base + 'spec/support/factories/weather_api'),
        'ridb_api': require(__base + 'spec/support/factories/ridb_api'),
        'user': require(__base + 'spec/support/factories/user'),
        'api': require(__base + 'spec/support/factories/api')
    },
    build: function(type, data) {
        var mock = this.mocks[type];

        data = data ? Object.assign(mock, data) : mock;

        return data;
    },
    create: function(type, data) {
        return mockDb.create(this.build(type, data));
    },
    find: function(id) {
        return mockDb.find(id);
    },
    clear: function() {
        mockDb.clear();
    }
};
