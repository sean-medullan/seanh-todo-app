'use strict';

todoApp.controller('TodoController', function($scope, KinveyResource){

    $scope.app  = {
        name: "App Awesome - To Do",
        todoItems: []
    };

    $scope.counter = 0;
    $scope.add = function(amount) { $scope.counter += amount; };

    // $scope.addItem = function() {
    // 	$scope.todoItems.push({
    // 		name: $scope.itemName
    // 	});

    // 	$scope.itemName = "";
    // };
});
