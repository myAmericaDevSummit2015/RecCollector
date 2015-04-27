module.exports.apply = function(dirname) {
    var localAppInfo = {};
    var localServices = {
        'mongolab': [
            {
                'credentials': {
                    'uri': 'mongodb://localhost/madc2015api'
                }
            }
        ],
        'text_to_speech': [
            {
                'credentials': {
                    'url': 'https://stream.watsonplatform.net/text-to-speech-beta/api',
                    'username': process.env.MADC2015API_T2S_USERNAME,
                    'password': process.env.MADC2015API_T2S_PASSWORD
                }
            }
        ]
    };

    global.__base = dirname + '/';
    global.__appInfo = JSON
        .parse(process.env.VCAP_APPLICATION || JSON.stringify(localAppInfo));
    global.__services = JSON
        .parse(process.env.VCAP_SERVICES || JSON.stringify(localServices));
    // TODO: Refactor out stuff from global that shouldn't be in scope
    // Probably should use app.set()
    global.__JWT_SECRET = process.env.MADC2015API_JWT_SECRET;
    global.__RIDB_KEY = process.env.RIDB_KEY
};
