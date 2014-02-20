'use strict';

todoApp.controller('TodoController', function($scope, KinveyResource){

    $scope.app  = {
        name: "Apples are Awesome - To Do",
        todoItems: 	[]
    };
    
    $scope.app.getTodosStatus = "Getting Todos from Server..";
    $scope.app.todoItems = KinveyResource.todos.query({}, function(resp){
    	$scope.app.getTodosStatus = "Got it!";
    	$scope.app.completed = $scope.countCompleted(resp);
    	
    	
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
    		var itemToRemove = $scope.indexFound($scope.app.todoItems, item);
    		console.log("remove1");
    		console.log(itemToRemove);
    		if (itemToRemove != -1){
    			console.log($scope.app.todoItems);
    			
    	
    			// recount completed as well
    			$scope.app.completed = $scope.countCompleted($scope.app.todoItems);
				//console.log ("item removed");
				$scope.app.todoItems = $scope.app.todoItems.splice(itemToRemove,1);
				console.log($scope.app.todoItems);
				return $scope.app.todoItems;
			}

    	});
 
    };
    
	$scope.markDone = function(item){
		KinveyResource.todos.update({'id':item._id},item, function(resp){
			var itemToMark = $scope.indexFound($scope.app.todoItems, item);
			if (itemToMark != -1){
				$scope.app.todoItems[itemToMark].isComplete = item.isComplete;
				$scope.app.completed = $scope.countCompleted($scope.app.todoItems);
			//	console.log("item marked as done");
			}
		});
	};
		
	$scope.indexFound = function(items, item){
		var i = 0;
		for (i = 0; i< items.length; i++){
			if(items[i]._id ==  item._id)
			{
				console.log("item found!");
				return i;
			}
		}
		return -1; // not found
	};
	
	// there is need to check the list anytime it is obtained from the server
	$scope.countCompleted = function(items){
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
