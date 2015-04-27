module.exports = function(grunt) {
    [
        'grunt-contrib-jshint',
        'grunt-mocha-test',
        'grunt-exec'
    ].forEach(function(task) {
        grunt.loadNpmTasks(task);
    });

    grunt.initConfig({
        jshint: {
            app: [
                '*.js',
                'app/lib/*.js',
                'app/api/**/**/*.js'
            ],
            specs: [
                'spec/lib/*.js',
                'spec/support/**/*.js',
                'spec/api/**/**/*.js'
            ],
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                }
            },
            src: ['spec/api/v1/**/*Spec.js']
        },
        exec: {}
    });

    grunt.registerTask('lint', 'jshint');
    grunt.registerTask('spec', 'mochaTest');
};
