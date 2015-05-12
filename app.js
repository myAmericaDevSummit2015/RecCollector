/*jshint node:true*/
'use strict';

var globals = require('./config/globals'),
    connect = require('connect'),
    bodyParser = require('body-parser'),
    rest = require('connect-rest'),
    // TODO: Remove Settings and break into its parts
    Settings = require('./config/settings'),
    Database = require('./config/database'),
    Seeds = require('./config/seeds'),
    Authentication = require('./config/authentication'),
    CrossDomain = require('./config/crossDomain'),
    Routes = require('./config/routes');

var app = connect()
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json());

var initialize = function() {
    globals.apply(__dirname);

    var initAuthentication = function() {
        Authentication.apply(app);
    };

    var initSettings = function() {
        Settings.apply(app, rest);
    };

    var initDatabase = function() {
        Database.connect();
        Seeds.apply();
    };

    var initRoutes = function() {
        CrossDomain.apply(app);
        Routes.apply(app, rest);
    };

    initAuthentication();
    initSettings();
    initDatabase();
    initRoutes();
};

var start = function() {
    var host = (process.env.VCAP_APP_HOST || 'localhost');
    var port = (process.env.VCAP_APP_PORT || 3001);

    var listen = function() {
        app.listen(port, host);
    };

    var log = function() {
        console.log('App started on port ' + port);
    };

    listen();
    log();
};

initialize();
start();
