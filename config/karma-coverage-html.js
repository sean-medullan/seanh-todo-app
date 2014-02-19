module.exports = function (config) {

    config.set({

        basePath: '../',

        files: [
            'test/lib/angular/angular.js',
            'test/lib/angular/evTrigger.js',
            'test/lib/angular/angular-mocks.js',
            'test/lib/jQuery/jquery.min.js',
            'test/lib/angular/angular-mocks.js',
            'test/lib/angular/localStorageModule.js',
            'test/lib/moment/moment.min.js',
            'test/lib/angular/angular-resource.js',
            'test/lib/bootstrap/ui-bootstrap-0.6.0.js',
            'test/lib/bootstrap/ui-bootstrap-tpls-0.6.0.js',
            'test/lib/i18next/i18next.js',
            'test/lib/i18next/ng-i18next.js',
            'test/lib/PinesNotify/jquery.pnotify.js',
            'src/app/app.js',
            'src/app/environmentConfig.js',
            'test/unitTestEnvConfig.js',
            'src/app/**/**/*.js',
            'test/unit/**/*.js',
            'test/lib/**/*.js',
            'src/partials/**/*.html'
        ],


        frameworks: ['jasmine'],

        autoWatch: true,

        browsers: ['PhantomJS'],

        preprocessors: {
            'src/app/**/*.js': 'coverage',
            'src/partials/**/*.html': 'ng-html2js'
        },

        ngHtml2JsPreprocessor :  {
            // strip this from the file path
            stripPrefix : 'src/',
            prependPrefix: '/'
        },

        singleRun: false,

        logLevel: config.LOG_ERROR,

        reporters: ['coverage'],

        coverageReporter: {
            type: ['html'],
            dir: 'coverage/'
        }

    });
};

