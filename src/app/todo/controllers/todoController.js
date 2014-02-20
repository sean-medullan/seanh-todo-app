'use strict';

todoApp.controller('TodoController', function($scope, KinveyResource){

    $scope.app  = {
        name: "Apples are Awesome - To Do",
        todoItems: 	[]
    };
    
    $scope.app.getTodosStatus = "Getting Todos from Server..";
    $scope.app.todoItems = KinveyResource.todos.query({}, function(resp){
    	$scope.app.getTodosStatus = "Got it!";
    	$scope.app.completed = countCompleted(resp);
    	
    	
    });
    
    $scope.app.total = $scope.app.todoItems.length;
    $scope.app.completed = 0;
    
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
    		//console.log ("Item added");
    	});
    };
    
    $scope.removeItem = function(item){
    	/*var index = $scope.app.todoItems.indexOf(id);
    	$scope.app.todoItems.splice(index,1);*/
    	
    	KinveyResource.todos.remove({'id':item._id}, function(resp){
    		var status = resp;
    		var itemToRemove = indexFound($scope.app.todoItems, item);
    		if (itemToRemove != -1){
    			$scope.app.todoItems.splice(itemToRemove,1);
    			// recount completed as well
    			$scope.app.completed = countCompleted($scope.app.todoItems);
				//console.log ("item removed");
			}

    	});
 
    };
    
	$scope.markDone = function(item){
		KinveyResource.todos.update({'id':item._id},item, function(resp){
			var itemToMark = indexFound($scope.app.todoItems, item);
			if (itemToMark != -1){
				$scope.app.todoItems[itemToMark].isComplete = item.isComplete;
				$scope.app.completed = countCompleted($scope.app.todoItems);
			//	console.log("item marked as done");
			}
		});
	};
		
	var indexFound = function(items, item){
		var i = 0;
		for (i = 0; i< items.length; i++){
			if(items[i]._id ==  item._id)
			{
				//console.log("item found!");
				return i;
			}
		}
		return -1; // not found
	};
	
	// there is need to check the list anytime it is obtained from the server
	var countCompleted = function(items){
		var i = 0;
		var countCompleted = 0;
		for (i = 0; i< items.length; i++){
			if(items[i].isComplete ==  true)
			{
				countCompleted++;
			}
		}
		return countCompleted; 
	};
      

});
