var assert = require('assert'),
    expect = require('expect'),
    Helper = require('../../../support/helper'),
    RouteHelper = require(__base + 'spec/support/route'),
    RIDBRoute = require(__base + 'app/api/v1/routes/ridb');

describe('RIDBRoute', function() {
    var rest = {
        method: null,
        path: null
    };

    var path,
        method;

    describe('GET /ridb', function(done) {
        beforeEach(function() {
            rest.get = function(path, callback) {
                this.method = 'GET';
                this.path = path;
            };
        });

        it('receives a GET request', function(done) {
            expect(RouteHelper.isGetRequest(RIDBRoute, null, rest)).toEqual(true);

            done();
        });

        it('receives request with proper path', function(done) {
            var path = 'ridb/:type/:coordinates/:radius/:limit';

            expect(RouteHelper.isCorrectPath(RIDBRoute, null, rest, path)).toEqual(true);

            done();
        });
    });
});
