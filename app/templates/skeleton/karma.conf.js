// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-09-23 using
// generator-karma 1.0.0

module.exports = function (config) {
    'use strict';

    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // base path, that will be used to resolve files and exclude
        basePath: '.',

        // testing framework to use (jasmine/mocha/qunit/...)
        // as well as any additional frameworks (requirejs/chai/sinon/...)
        frameworks: [
            "jasmine"
        ],

        // list of files / patterns to load in the browser
        files: [
            // bower:js
            'bower_components/jquery/dist/jquery.js',
            'app/bower_components/jasmine-jquery/lib/jasmine-jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-aria/angular-aria.js',
            'bower_components/angular-cookies/angular-cookies.js',
            'bower_components/angular-messages/angular-messages.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'bower_components/angular-touch/angular-touch.js',
            'bower_components/angular-mocks/angular-mocks.js',
            // endbower
            "app/scripts/**/*.module.js",
            "app/scripts/**/!(*.module).js",
            "app/scripts/**/*.html"
            // "test/**/*.js"
        ],

        // list of files / patterns to exclude
        exclude: [],

        preprocessors: {
            'app/scripts/**/!(*.spec).js': ['coverage'],
            'app/scripts/**/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'app/',
            moduleName: 'templates'
        },

        // web server port
        port: 8080,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            "PhantomJS"
        ],

        // Which plugins to enable
        plugins: [
            "karma-phantomjs-launcher",
            "karma-jasmine",
            'karma-firefox-launcher',
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-ng-html2js-preprocessor'
        ],

        // How to report, by default.
        reporters: [
            'dots',
            'coverage'
        ],

        coverageReporter: {
            type: 'html',
            dir: 'dist/coverage/'
        },

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Uncomment the following lines if you are using grunt's server to run the tests
        // proxies: {
        //   '/': 'http://localhost:9000/'
        // },
        // URL root prevent conflicts with the site root
        // urlRoot: '_karma_'
    });
};
