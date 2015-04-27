var assert = require('assert'),
    expect = require('expect'),
    Helper = require('../../../support/helper'),
    RouteHelper = require(__base + 'spec/support/route'),
    TokenRoute = require(__base + 'app/api/v1/routes/token');

describe('TokenRoute', function() {
    var rest = {
        method: null,
        path: null
    };

    var path,
        method;

    describe('GET /token', function(done) {
        beforeEach(function() {
            rest.get = function(path, callback) {
                this.method = 'GET';
                this.path = path;
            };
        });

        it('receives a GET request', function(done) {
            expect(RouteHelper.isGetRequest(TokenRoute, null, rest))
                .toEqual(true);

            done();
        });

        it('receives request with proper path', function(done) {
            var path = 'token';

            expect(RouteHelper.isCorrectPath(TokenRoute, null, rest, path))
                .toEqual(true);

            done();
        });
    });
});
