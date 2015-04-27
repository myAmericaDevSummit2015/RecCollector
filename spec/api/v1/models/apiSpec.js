var assert = require('assert'),
    expect = require('expect'),
    Helper = require('../../../support/helper'),
    Api = require(__base + 'app/api/v1/models/api'),
    ApiAttributes = require(__base + 'spec/support/factories/api');

describe('Api', function() {
    var api = new Api(ApiAttributes);

    describe('fields', function() {
        it('has correct name', function(done) {
            expect(api.name).toEqual(ApiAttributes.name);

            done();
        });

        it('has correct website', function(done) {
            expect(api.website).toEqual(ApiAttributes.website);

            done();
        });

        it('has correct key', function(done) {
            expect(api.key).toEqual(ApiAttributes.key);

            done();
        });
    });

    describe('interface', function() {
        describe('#fetch', function() {
            // TODO: This error should be a custom one instead and we would test for that (exiquio)
            /*
            it('throws Error with appropriate message', function(done) {
                expect(api.fetch).toThrow(/Interface not implemented/);

                done();
            });
            */

            // TODO: Find a way to test Mongoose Schema methods like this one. (exiquio)
            Helper.pending('Implement #fetch spec');
        });
    });
});
