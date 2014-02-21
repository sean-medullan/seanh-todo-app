'use strict';

var todoApp = angular.module("TodoApp", ['ngRoute', 'Kinvey']);

todoApp.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
	$routeProvider.when('/archived', {
		templateUrl : 'app/todo/partials/archived-todos.html',
		controller : 'TodoController'
	}).when('/trashed', {
		templateUrl : 'app/todo/partials/deleted-todos.html',
		controller : 'TodoController'
	}).when('/all', {
		templateUrl : 'app/todo/partials/all-todos.html',
		controller : 'TodoController',
		resolve : {
			todoItems : function(TodoPromiseResource) {
				return TodoPromiseResource.getAllTodos();
			}
		}
	}).otherwise({
		redirectTo : '/all'
	});
	//$locationProvider.html5Mode(true);
}]);

