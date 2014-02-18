'use strict';

var todoApp = angular.module("TodoApp", [ 'ngRoute', 'Kinvey']);

todoApp.controller('TodoController', function($scope, KinveyResource){

    $scope.app  = {
        name: "App Awesome - To Do",
        todoItems: []
    };

    $scope.createItem = function(title) {
        var todoItem = new KinveyResource.todos({
            title: title,
            _id: null,
            isComplete: false,
            isActive: true,
            isVisible: true
        });
        $scope.app.todoItems.push(todoItem)
        todoItem.$save();
    };

});
