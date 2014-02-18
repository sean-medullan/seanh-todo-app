module.exports = function (config) {
    config.set({
        basePath: '../',

        frameworks: ['jasmine'],

        files: [
            'test/lib/jQuery/jquery.min.js',
            'test/lib/angular/angular.js',
            'test/lib/angular/angular-mocks.js',
            'test/lib/angular/angular-resource.js',
            'test/lib/angular/angular-route.js',
            'test/lib/angular/localStorageModule.js',
            'test/lib/moment/moment.min.js',
            'test/lib/bootstrap/ui-bootstrap-0.6.0.js',
            'test/lib/bootstrap/ui-bootstrap-tpls-0.6.0.js',
            'test/lib/i18next/i18next.js',
            'test/lib/i18next/ng-i18next.js',
            'test/lib/jQuery/jquery-ui-1.10.0.min.js',
            'test/lib/PinesNotify/jquery.pnotify.js',
            'test/lib/underscore/underscore-min.js',
            'src/app/app.js',
            'src/app/environmentConfig.js',
            'test/unitTestEnvConfig.js',
            'src/app/**/**/*.js',
            'test/unit/**/*.js',
            'test/lib/**/*.js',
            'src/partials/**/*.html' // allow serialization of html in nested folders
        ],


        autoWatch: true,

        browsers: ['PhantomJS'],

        preprocessors: {
            'src/partials/**/*.html': 'ng-html2js' //'html2js'
        },

        ngHtml2JsPreprocessor :  {
            // strip this from the file path
            stripPrefix : 'src/',
            prependPrefix: '/'
        },

        reporters: ['progress', 'junit'],

        singleRun: false,

        logLevel: config.LOG_ERROR,

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};

