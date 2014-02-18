'use strict'

var kinvey = angular.module('Kinvey', ['ngResource']);

kiney.constant("KinveyConfig", {
    header: {
        authorization: {
            name: 'Authorization',
            value: 'Basic a2lkX1BURlJPZGtNcE06NzAxYzQ2ODk3MTU2NDk4MGIyMDA1NzUyZGZmZDNhOTc='
        },
        version: {
            name: 'X-Kinvey-API-Version',
            value: 2
        }
    },
    hostUrl: "https://baas.kinvey.com/appdata/kid_PTFROdkMpM"
});

kinvey.config(function ($httpProvider, KinveyConfig) {
    $httpProvider.defaults.headers.common[KinveyConfig.header.authorization.name] = KinveyConfig.header.authorization.value;
    $httpProvider.defaults.headers.common[KinveyConfig.header.version.name] = KinveyConfig.header.version.value;
});

kinvey.factory('KinveyResources', function($resource, KinveyConfig){
    var kinveyResources = {
        todos: $resource(KinveyConfig + '/todos')
    };

    return kinveyResources;
});
