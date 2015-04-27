module.exports.apply = function(app, rest) {
    var TextToSpeechController = require(
        __base + 'app/api/v1/controllers/textToSpeech'
    );

    app.use(rest.dispatcher(
        'GET',
        '/api/v1/text_to_speech/:text',
        TextToSpeechController.read
    ));
};
