var assert = require('assert'),
    expect = require('expect'),
    watson = require('watson-developer-cloud'),
    Helper = require('../../../support/helper'),
    TextToSpeechController = require(__base + 'app/api/v1/controllers/textToSpeech');

describe('TextToSpeechController', function() {
    describe('read', function(done) {
        var expectResponse;

        before(function() {
            global.__services = {
                'text_to_speech': [
                    {
                        'credentials': {
                            'usernamse': 'username',
                            'password': 'password'
                        }
                    }
                ]
            };

            watson.text_to_speech = function(options) {
                return {
                    synthesize: function(options) { 
                        return {
                            on: function(string, response) {},
                            pipe: function(response) {
                                expect(response.value)
                                    .toEqual(expectedResponse);
                                        
                                if(response.done) {
                                    return response.done();
                                } else {
                                    return;
                                }
                            }
                        };
                    }
                };
            };
        });

        describe('without text', function() {
            before(function() {
                expectedResponse = true;
            });

            it('returns an error', function(done) {
                var request = {params: {}, user: {}};
                var response = {value: true, done: done};

                var call = function() {
                    TextToSpeechController.read(request, response);
                };

                expect(call).toThrow('Missing text param');

                done();
            });
        });

        describe('with text', function() {
            before(function() {
                expectedResponse = true;
            });

            it('renders expected response', function(done) {
                var params = {text: 'test'};
                var request = {params: params, user: {}};
                var response = {value: true, done: done};

                TextToSpeechController.read(request, response);
            });
        });
    });
});
