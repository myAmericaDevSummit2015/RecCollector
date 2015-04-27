var assert = require('assert'),
    expect = require('expect'),
    Helper = require('../../../support/helper'),
    ApiHelper = require(__base + 'app/lib/apiHelper'),
    Factory = require(__base + 'spec/support/factory'),
    Api = require(__base + 'app/api/v1/models/api'),
    RIDBController = require(__base + 'app/api/v1/controllers/ridb');

describe('RIDBController', function() {
    describe('read', function() {
        var urlBase = 'https://ridb.recreation.gov/api/v1/',
            endpoint;

        before(function() {
            Factory.clear();

            var apiObject = Factory.create('ridb_api');

            Api.findOne = function(conditions, callback) {
                callback(null, apiObject);
            };

            // TODO: We should use the api object to pull this, not global (exiquio)
            global.__RIDB_KEY = 'key';

            ApiHelper.fetchEndpoint = function(endpoint, requestor) {
                requestor.handleResponse(null, {statusCode: 200}, {endpoint: endpoint});
            };
        });

        describe('type', function() {
            describe('when recreation_areas', function() {
                before(function() {
                    endpoint = urlBase + 'recareas?latitude=90.0&longitude=90.0&radius=100&limit=10&apikey=key';
                });

                it('makes proper request to RIDB', function(done) {
                    var params = {
                        type: 'recreation_areas',
                        coordinates: '90.0,90.0',
                        radius: '100',
                        limit: '10'
                    };
                    var request = {body: null, params: params, user: {}};
                    var content = request.body;
                    var callback = function(ingore, result) {
                        expect(result.endpoint).toEqual(endpoint);

                        done();
                    };

                    RIDBController.read(request, content, callback);
                });
            });

            describe('when facilities', function() {
                before(function() {
                    endpoint = urlBase + 'facilities?latitude=90.0&longitude=90.0&radius=100&limit=10&apikey=key';
                });

                it('makes proper request to RIDB', function(done) {
                    var params = {
                        type: 'facilities',
                        coordinates: '90.0,90.0',
                        radius: '100',
                        limit: '10'
                    };
                    var request = {body: null, params: params, user: {}};
                    var content = request.body;
                    var callback = function(ingore, result) {
                        expect(result.endpoint).toEqual(endpoint);

                        done();
                    };

                    RIDBController.read(request, content, callback);
                });
            });
        });
    });
});
