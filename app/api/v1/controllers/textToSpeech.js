var watson = require('watson-developer-cloud');

var textToSpeech;

var initTextToSpeech = function() {
    var credentials = __services.text_to_speech[0].credentials;
    var options = {
        version: 'v1',
        username: credentials.username,
        password: credentials.password
    };

    textToSpeech = new watson.text_to_speech(options); 
};

var synthesizeAndRender = function(options, request, response) {
    var synthesizedSpeech = textToSpeech.synthesize(options);

    synthesizedSpeech.on('response', function(eventResponse) {
        if(request.params.text.download) {
            var contentDisposition = 'attachment; filename=transcript.ogg';

            eventResponse.headers['content-disposition'] = contentDisposition;
        }
    });

    synthesizedSpeech.pipe(response);
};

var render = function(request, response) {
    var options = {
        text: request.params.text,
        voice: 'VoiceEnUsMichael',
        accept: 'audio/ogg; codecs=opus'
    };

    synthesizeAndRender(options, request, response);
};

module.exports = {
    read: function(request, response) {
        // TODO: Render HTTP Error
        if(!request.user) throw new Error('Unauthorized');
        if(!request.params.text) throw new Error('Missing text param');
        
        initTextToSpeech();

        render(request, response);
    }
};
