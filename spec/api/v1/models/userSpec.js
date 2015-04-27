var assert = require('assert'),
    expect = require('expect'),
    Helper = require('../../../support/helper'),
    User = require(__base + 'app/api/v1/models/user'),
    UserAttributes = require(__base + 'spec/support/factories/user');

describe('User', function() {
    var user;

    before(function() {
        user = new User(UserAttributes);
        

        user.comparePassword = function(password, callback) {
            return callback(null, password == user.password);
        };

        User.findOne = function(criteria, callback) {
            if(criteria.username == user.username) {
                callback(null, user);
            } else {
                var attributes = {
                    username: criteria.username,
                    password: 'invalid'
                };

                callback(null, new User(attributes));
            }
        };
    });

    describe('fields', function() {
        it('has correct username', function(done) {
            expect(user.username).toEqual(UserAttributes.username);

            done();
        });

        // TODO: Refactor to test with presave hooks in place and on a "saved"
        // object. 
        it('has correct password', function(done) {
            expect(user.password).toEqual(UserAttributes.password);

            done();
        });
    });

    describe('statics', function() {
        describe('.authenticate', function() {
            describe('when user is not authorized', function() {
                it('user does not authenticate', function(done) {
                    var credentials = {
                        username: 'invalid',
                        password: user.password
                    };

                    var callback = function(error, isMatch) {
                        expect(isMatch).toEqual(false);

                        done();
                    };

                    User.authenticate(credentials, callback);
                });
            });

            describe('when user is authorized', function() {
                describe('when password is invalid', function() {
                    it('user does not authenticate', function(done) {
                        var credentials = {
                            username: user.username,
                            password: 'invalid'
                        };

                        var callback = function(error, ismatch) {
                            expect(ismatch).toEqual(false);

                            done();
                        };

                        User.authenticate(credentials, callback);
                    });
                });

                describe('when password is valid', function() {
                    it('user authenticates', function(done) {
                        var credentials = {
                            username: user.username,
                            password: user.password 
                        };

                        var callback = function(error, ismatch) {
                            expect(ismatch).toEqual(true);

                            done();
                        };

                        User.authenticate(credentials, callback);
                    });
                });
            });
        });
    });
});
