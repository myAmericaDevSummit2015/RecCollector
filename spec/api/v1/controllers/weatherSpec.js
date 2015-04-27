var assert = require('assert'),
    expect = require('expect'),
    Helper = require('../../../support/helper'),
    ApiHelper = require(__base + 'app/lib/apiHelper'),
    Factory = require(__base + 'spec/support/factory'),
    Api = require(__base + 'app/api/v1/models/api'),
    WeatherController = require(__base + 'app/api/v1/controllers/weather');

describe('WeatherController', function() {
    describe('read', function() {
        var urlBase = 'http://api.openweathermap.org/data/2.5/',
            endpoint;

        before(function() {
            Factory.clear();

            var apiObject = Factory.create('weather_api');

            Api.findOne = function(conditions, callback) {
                callback(null, apiObject);
            };

            ApiHelper.fetchEndpoint = function(endpoint, requestor) {
                requestor.handleResponse(null, {statusCode: 200}, {endpoint: endpoint});
            };
        });

        describe('type', function() {
            describe('when forecast', function() {
                before(function() {
                    endpoint = urlBase + 'forecast/daily?lat=90.0&lon=90.0&cnt=7&mode=json&units=imperial';
                });

                it('makes proper request for weather', function(done) {
                    var params = {
                        type: 'forecast',
                        coordinates: '90.0,90.0'
                    };
                    var request = {body: null, params: params, user: {}};
                    var content = request.body;
                    var callback = function(ingore, result) {
                        expect(result.endpoint).toEqual(endpoint);

                        done();
                    };

                    WeatherController.read(request, content, callback);
                });
            });

            describe('when current', function() {
                before(function() {
                    endpoint = urlBase + 'weather?lat=90.0&lon=90.0&units=imperial';
                });

                it('makes proper request for weather', function(done) {
                    var params = {
                        type: 'current',
                        coordinates: '90.0,90.0'
                    };
                    var request = {body: null, params: params, user: {}};
                    var content = request.body;
                    var callback = function(ingore, result) {
                        expect(result.endpoint).toEqual(endpoint);

                        done();
                    };

                    WeatherController.read(request, content, callback);
                });
            });
        });
    });
});
