'use strict';

todoApp.controller('TodoController', function($scope, KinveyResource){

    $scope.app  = {
        name: "App Awesome - To Do",
        todoItems: 	[]
    };
    
    $scope.app.getTodosStatus = "Getting Todos from Server";
    $scope.app.todoItems = KinveyResource.todos.query({}, function(resp){
    	$scope.app.getTodosStatus = "OK";
    	
    	
    });
    
    $scope.total = $scope.app.todoItems.length;
    $scope.id = 1;
    
    $scope.createItem = function(todo){
    	var todo = { title: todo, isComplete: false, isVisible: true, isActive:true };
    	/*$scope.app.todoItems.push(   		
    		{ name: todo,
    		  isComplete: false,
    		  id: $scope.id
    		});
    	*/
    	KinveyResource.todos.save(todo, function(resp){
    		var status = resp;
    		$scope.app.todoItems.push(resp);
    	});
    };
    
    $scope.removeItem = function(item){
    	/*var index = $scope.app.todoItems.indexOf(id);
    	$scope.app.todoItems.splice(index,1);*/
    	
    	KinveyResource.todos.remove({'id':item._id}, function(resp){
    		var status = resp;
    		var index = $scope.app.todoItems.indexOf(item._id);
    		$scope.app.todoItems.splice(index,1);
    	});
    	console.log ("item removed");
    };
    
	$scope.markDone = function(item){
		var _item = item;
		KinveyResource.todos.update({'id':item._id}, function(resp){
				var i = 0;
				for (i = 0; i< $scope.app.todoItems.length; i++){
					if($scope.app.todoItems[i]._id ==  _item._id)
					{
						$scope.app.todoItems[i].isComplete = item.isComplete;
						console.log("item marked as done");
					}
				}
				 
				
		});
		
    	
    	
    };    

});
