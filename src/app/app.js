'use strict';

var todoApp = angular.module("TodoApp", [ 'ngRoute', 'Kinvey']);
todoApp.controller('TodoController', function($scope, KinveyResource){

    $scope.app  = {
        name: "App Awesome - To Do",
        todoItems: []
    };
	
	
});

