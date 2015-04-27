var assert = require('assert'),
    expect = require('expect'),
    Helper = require('../../../support/helper'),
    Factory = require(__base + 'spec/support/factory'),
    API = require(__base + 'app/api/v1/models/api'),
    APIController = require(__base + 'app/api/v1/controllers/api');

describe('APIController', function() {
    describe('read', function() {
        var api;

        before(function() {
            Factory.clear();
            
            api = Factory.build('api');

            var renderNotFound = function() {
                throw new Error('Not found');
            };

            API.findOne = function(criteria, callback) {
                if(criteria.name != api.name) renderNotFound();

                return callback(null, api);
            };
        });

        describe('when name is not provided', function() {
            it('throws an error', function(done) {
                var request = {body: null, params: {}, user: {}};
                var content = request.body;
                var callback = function() {
                    throw new Error('WARNING: Dummy callback called');
                };

                var call = function() {
                    APIController.read(request, content, callback);
                };

                expect(call).toThrow('Not found');

                done();
            });
        });

        describe('when name is invalid', function() {
            it('throws an error', function(done) {
                var params = {name: 'invalid'};
                var request = {body: null, params: params, user: {}};
                var content = request.body;
                var callback = function() {
                    throw new Error('WARNING: Dummy callback called');
                };

                var call = function() {
                    APIController.read(request, content, callback);
                };

                expect(call).toThrow('Not found');

                done();
            });
        });

        describe('when name is valid', function() {
            it('returns api', function(done) {
                var params = {name: api.name};
                var request = {body: null, params: params, user: {}};
                var content = request.body;
                var callback = function(ignore, result) {
                    expect(api).toEqual(result.api);

                    done();
                };

                APIController.read(request, content, callback);
            });
        });
    });
});
