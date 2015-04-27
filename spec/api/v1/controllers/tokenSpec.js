var assert = require('assert'),
    expect = require('expect'),
    jwt = require('jwt-simple'),
    Helper = require('../../../support/helper'),
    Factory = require(__base + 'spec/support/factory'),
    UserAttributes = require(__base + 'spec/support/factories/user'),
    User = require(__base + 'app/api/v1/models/user'),
    TokenController = require(__base + 'app/api/v1/controllers/token');

describe('TokenController', function() {
    describe('read', function() {
        var generateAuthorizationHeader = function(username, password) {
            var credentials = [username, ':', password].join('');
            var credentialsBase64 = new Buffer(credentials, 'utf8')
                .toString('base64');

            return 'Authorization:Basic ' + credentialsBase64;
        };

        var user;

        before(function() {
            Factory.clear();

            user = Factory.create('user');

            user.comparePassword = function(password, callback) {
                callback(null, user.password == password);
            };

            User.findOne = function(criteria, callback) {
                if(criteria.username == user.username) {
                    callback(null, user);
                } else {
                    callback(null, null);
                }
            };

            global.__JWT_SECRET = 'secret';
        });

        describe('when crendentials are invalid', function() {
            var callback = function() {
                throw new Error('Callback called when it should not be');
            };

            describe('when authorization header is missing', function() {
                it('raises appropriate error', function(done) {
                    var request = {body: null, headers: null};
                    var content = request.body;

                    var call = function() {
                        TokenController.read(request, content, callback);
                    };

                    expect(call)
                        .toThrow('Missing HTTP Basic Authentication header');

                    done();
                });
            });

            describe('when auhtorization header is malformed', function() {
                it('raises appropriate error', function(done) {
                    var headers = {authorization: 'invalid'};
                    var request = {body: null, headers: headers};
                    var content = request.body;

                    var call = function() {
                        TokenController.read(request, content, callback);
                    };

                    expect(call)
                        .toThrow('Missing HTTP Basic Authentication header');

                    done();
                });
            });

            describe('when username is invalid', function() {
                it('raises appropriate error', function(done) {
                    var authorization = generateAuthorizationHeader(
                        'invalid',
                        UserAttributes.password
                    );

                    var headers = {authorization: authorization};
                    var request = {body: null, headers: headers};
                    var content = request.body;

                    var call = function() {
                        TokenController.read(request, content, callback);
                    };

                    expect(call).toThrow('Invalid credentials');

                    done();
                });
            });

            describe('when password is invalid', function() {
                it('raises appropriate error', function(done) {
                    var authorization = generateAuthorizationHeader(
                        UserAttributes.username,
                        'invalid'
                    );

                    var headers = {authorization: authorization};
                    var request = {body: null, headers: headers};
                    var content = request.body;

                    var call = function() {
                        TokenController.read(request, content, callback);
                    };

                    expect(call).toThrow('Invalid credentials');

                    done();
                });
            });
        });

        describe('when crendentials are valid', function() {
            it('returns token', function(done) {
                var authorization = generateAuthorizationHeader(
                    user.username,
                    user.password
                );
                var headers = {authorization: authorization};
                var request = {body: null, headers: headers};
                var content = request.body;

                var callback = function(ignore, result) {
                    expect(result.token).toExist();

                    done();
                };

                TokenController.read(request, content, callback);
            });
        });
    });
});
