var assert = require('assert'),
    expect = require('expect'),
    Helper = require('../../../support/helper'),
    RouteHelper = require(__base + 'spec/support/route'),
    WeatherRoute = require(__base + 'app/api/v1/routes/weather');

describe('WeatherRoute', function() {
    var rest = {
        method: null,
        path: null
    };

    var path,
        method;

    describe('GET /weather', function(done) {
        beforeEach(function() {
            rest.get = function(path, callback) {
                this.method = 'GET';
                this.path = path;
            };
        });

        it('receives a GET request', function(done) {
            expect(RouteHelper.isGetRequest(WeatherRoute, null, rest)).toEqual(true);

            done();
        });

        it('receives request with proper path', function(done) {
            var path = 'weather/:type/:coordinates';

            expect(RouteHelper.isCorrectPath(WeatherRoute, null, rest, path)).toEqual(true);

            done();
        });
    });
});
