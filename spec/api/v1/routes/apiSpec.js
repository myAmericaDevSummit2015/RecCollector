var assert = require('assert'),
    expect = require('expect'),
    Helper = require('../../../support/helper'),
    RouteHelper = require(__base + 'spec/support/route'),
    APIRoute = require(__base + 'app/api/v1/routes/api');

describe('APIRoute', function() {
    var rest = {
        method: null,
        path: null
    };

    var path,
        method;

    describe('GET /api', function(done) {
        beforeEach(function() {
            rest.get = function(path, callback) {
                this.method = 'GET';
                this.path = path;
            };
        });

        it('receives a GET request', function(done) {
            expect(RouteHelper.isGetRequest(APIRoute, null, rest))
                .toEqual(true);

            done();
        });

        it('receives request with proper path', function(done) {
            var path = 'api/:name';

            expect(RouteHelper.isCorrectPath(APIRoute, null, rest, path))
                .toEqual(true);

            done();
        });
    });
});
