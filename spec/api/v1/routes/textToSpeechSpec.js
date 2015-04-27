var assert = require('assert'),
    expect = require('expect'),
    Helper = require('../../../support/helper'),
    RouteHelper = require(__base + 'spec/support/route'),
    TextToSpeechRoute = require(__base + 'app/api/v1/routes/textToSpeech');

describe('TextToSpeechRoute', function() {
    var app,
        rest;

    describe('GET /textToSpeech', function(done) {
        before(function() {
            app = {
                use: function() {}
            };

            rest = {
                dispatcher: function(method, path, callback) {
                    this.method = method;
                    this.path = path;
                }
            };
        });

        it('receives a GET request', function(done) {
            expect(RouteHelper.isGetRequest(TextToSpeechRoute, app, rest))
                .toEqual(true);

            done();
        });

        it('receives request with proper path', function(done) {
            var path = '/api/v1/text_to_speech/:text';

            expect(RouteHelper.isCorrectPath(TextToSpeechRoute, app, rest, path))
                .toEqual(true);

            done();
        });
    });
});
