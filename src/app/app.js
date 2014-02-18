'use strict';

var todoApp = angular.module("TodoApp", [ 'ngRoute', 'ngResource']);

todoApp.controller('TodoController', function($scope){

    $scope.app  = {
        name: "Sean's App",
        todoItems: new Array()
    };

    var todoItem = {
        title: '',
        _id: null,
        isComplete: false,
        isActive: true,
        isVisible: true
    };

});
