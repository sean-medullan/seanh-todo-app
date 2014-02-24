'use strict';

var todoApp = angular.module("TodoApp", [ 'ngRoute', 'Kinvey']);

todoApp.config(function($routeProvider) {
	$routeProvider.when('/archived', {
		templateUrl : 'partials/archive.html',
		controller : 'TodoController',
        resolve: {
           todosData : todoAppCtrl.todosData
        }
	}).when('/trashed', {
		templateUrl : 'partials/trashed.html',
		controller : 'TodoController',
        resolve: {
           todosData : todoAppCtrl.todosData
        }
	}).when('/all', {
		templateUrl : 'partials/all.html',
		controller : 'TodoController',
        resolve: {
           todosData : todoAppCtrl.todosData
        }
	}).otherwise({
		redirectTo : '/all'
	})
});

