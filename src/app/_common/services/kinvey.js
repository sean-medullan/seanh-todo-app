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
        },
        allowedHeaders: {
        	name:'Access-Control-Allow-Methods',
        	value:'GET,POST,PUT,DELETE'
        }
        
    },
    hostUrl: "https://baas.kinvey.com/appdata/kid_PTFROdkMpM"
});

kinvey.constant("KinveyResourceUrls", {
    todos: '/todos/:id',
    todosX: '/todos'
    
});

kinvey.config(function ($httpProvider, KinveyConfig) {
    $httpProvider.defaults.headers.common[KinveyConfig.header.authorization.name] = KinveyConfig.header.authorization.value;
    $httpProvider.defaults.headers.common[KinveyConfig.header.version.name] = KinveyConfig.header.version.value;
    $httpProvider.defaults.headers.common[KinveyConfig.header.allowedHeaders.name] = KinveyConfig.header.allowedHeaders.value;
});

kinvey.factory('KinveyResource', function($resource, KinveyConfig, KinveyResourceUrls){
    var kinveyResources = {
        todos: $resource(KinveyConfig.hostUrl + KinveyResourceUrls.todos, {id:'@id'}, { 
        	'update': { method:'PUT' }
    	})
    };

    return kinveyResources;
});
