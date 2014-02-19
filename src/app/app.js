'use strict';

var todoApp = angular.module("TodoApp", ['ngRoute', 'Kinvey']);

todoApp.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
	$routeProvider.when('/archived', {
		templateUrl : 'app/todo/partials/todo-list.html',
		controller : 'TodoController'
	}).when('/trashed', {
		templateUrl : 'app/todo/partials/todo-list.html',
		controller : 'TodoController'
	}).when('/all', {
		templateUrl : 'app/todo/partials/todo-list.html',
		controller : 'TodoController'
	}).otherwise({
		redirectTo : '/all'
	});
	$locationProvider.html5Mode(true);
}]);

