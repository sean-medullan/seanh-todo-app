'use strict';

var todoAppCtrl = todoApp.controller('TodoController', function($scope, KinveyResource, HelperService, todosData){

    $scope.app  = {
        name: "App Awesome - To Do",
        todoItems: []
    };
	
	$scope.app.todoItems = todosData;
    
    var archivedTodos = function(){
        $scope.archiveTodoItems=[];
        for(var i=0; i<todosData.length; i++){
				if(todosData[i].isActive == false){
					 $scope.archiveTodoItems.push(todosData[i]);
				}
			}
    };
    archivedTodos();
    
	$scope.createItem = function(title) {
        var todoItem = new KinveyResource.todos({
            title: title,
            _id: null,
            isComplete: false,
            isActive: true,
            isVisible: true
        });
        $scope.app.todoItems.push(todoItem)
        todoItem.$save(), function(){
			alert("Successfuly created!");
		}, function(){
			alert("Create was unsuccessful");
		};
    };
});



todoApp.factory('HelperService', function(){
    return  {
        totalCount: function(data){
			var completedItems = 0;
			for(var i=0; i<data.length; i++){
				if(data[i].isComplete == true){
					completedItems++;
				}
			}
			return completedItems;
		}	
    };
});

todoApp.directive('todoList', function(){
   return {
       restrict: 'E',
       controller: 'TodoDirectiveController',
       scope: {
           todos: '=',
           option: '@'
        },
       templateUrl: '../partials/todo-list.html',
       link: function(scope, element){
           
       }
   }; 
});

todoApp.controller('TodoDirectiveController', function($scope, KinveyResource, HelperService){
    $scope.completedItems = HelperService.totalCount($scope.todos);
    
    $scope.toShow = function(){
        if($scope.option != "archive"){
            return true;
        }
    };
    
    $scope.updateTodos = function(item){
		item.$update({_id : item._id}, function() {
            alert("Successfuly Updated!");
            $scope.completedItems = HelperService.totalCount($scope.todos);
            console.log($scope.completedItems);
			}, function(){
				alert("Update was unsuccessful");
            });
	};
	
	$scope.removeItem = function(index){		
		$scope.todos[index].$remove({_id : $scope.todos[index]._id}, function() {
				$scope.todos.splice(index,1);
				alert("Successfuly Removed!");
				$scope.completedItems = HelperService.totalCount($scope.todos);
			}, function(){
				alert("Delete was unsuccessful");
			});
	};
    
    $scope.archiveTodos = function(item){
        if(item){
            item.isActive = false;
            $scope.updateTodos(item);
        }  
    };
});

todoAppCtrl.todosData = function(KinveyResource, $q) {
    var deferred = $q.defer();
    var todos;
    KinveyResource.todos.query(function(data) {
       todos = data;
       deferred.resolve(todos);
   });
   return deferred.promise;
};

