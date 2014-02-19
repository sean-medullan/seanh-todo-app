'use strict';

todoApp.controller('TodoController', function($scope, KinveyResource){

    $scope.app  = {
        name: "App Awesome - To Do",
        todoItems: []
    };
    $scope.removeItem = function(index)
    {
    	//$scope.todoItems.splice(1);
    	$scope.todoItems.splice(index,1);
    };
    $scope.createItem = function(item)
    {

    	KinveyResource.todos.save(item,function(data){
    		
    		$scope.app.todoItems.push(data);
    	});
    };

});
