'use strict';

var todoApp = angular.module("TodoApp", ['ngRoute', 'Kinvey']);

todoApp.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/archived', {
		templateUrl : 'partials/phone-list.html',
		controller : 'TodoController'
	}).when('/trashed', {
		templateUrl : 'partials/phone-detail.html',
		controller : 'TodoController'
	}).when('/all', {
		templateUrl : 'partials/phone-detail.html',
		controller : 'TodoController'
	}).otherwise({
		redirectTo : '/all'
	});
}]); 