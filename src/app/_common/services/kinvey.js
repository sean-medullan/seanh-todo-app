'use strict'

var kinvey = angular.module('Kinvey', ['ngResource']);

kinvey.constant("KinveyConfig", {
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

kinvey.constant("KinveyResourceUrls", {
    todos: '/todos'
})

kinvey.config(function ($httpProvider, KinveyConfig) {
    $httpProvider.defaults.headers.common[KinveyConfig.header.authorization.name] = KinveyConfig.header.authorization.value;
    $httpProvider.defaults.headers.common[KinveyConfig.header.version.name] = KinveyConfig.header.version.value;
});

kinvey.factory('KinveyResource', function($resource, KinveyConfig, KinveyResourceUrls){
    var kinveyResources = {
        todos: $resource(KinveyConfig.hostUrl + KinveyResourceUrls.todos, {id:'@_id'}, {
			'update' : {method: 'PUT'}
		})
    };
    return kinveyResources;
});
