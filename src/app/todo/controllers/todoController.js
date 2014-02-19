'use strict';

todoApp.controller('TodoController', function($scope, TodoService) {

	var todoItems = TodoService.getTodos();

	$scope.app = {
		name : "App Awesome - To Do",
		todoItems : todoItems
	};

	$scope.addTodo = function(newTodo) {
		var todo = {
			title : newTodo.title,
			isComplete : false
		};

		if (TodoService.saveTodo(todo)) {
			todoItems.push(todo);
		}

		newTodo.title = "";
	};

	$scope.updateTodo = function(todo) {
		TodoService.updateTodo(todo);
	};

	$scope.removeTodo = function(todo) {
		TodoService.removeTodo(todo);
		//FIXME: not working
		$scope.app.todoItems = TodoService.getTodos();
	};

	$scope.isCompleteCount = function(todo) {
		var isCompleteCount = 0;
		for (var i = 0; i < todoItems.length; i++) {
			if (todoItems[i].isComplete) {
				isCompleteCount++;
			}
		};
		return isCompleteCount;
	};

});

todoApp.factory('TodoService', function(KinveyResource) {

	return {
		getTodos : function() {
			return KinveyResource.todos.query();
		},
		saveTodo : function(todo) {
			return KinveyResource.todos.save(todo);
		},
		removeTodo : function(todo) {
			KinveyResource.todos.remove({
				id : todo._id
			});
		},
		updateTodo : function(todo) {
			return KinveyResource.todos.update({ id:todo._id }, todo);
		}, 
	};
});

todoApp.filter('archivedTodos', function() {
	return function(input, uppercase) {
		var out = "";
		for (var i = 0; i < input.length; i++) {
			out = input.charAt(i) + out;
		}
		// conditional based on optional argument
		if (uppercase) {
			out = out.toUpperCase();
		}
		return out;
	};
});
