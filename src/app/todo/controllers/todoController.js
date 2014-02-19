'use strict';

todoApp.controller('TodoController', function($scope, KinveyResource, TodoService) {

	var todoItems = TodoService.getTodos();

	$scope.app = {
		name : "App Awesome - To Do",
		todoItems : todoItems
	};

	$scope.addTodo = function(newTodo) {
		var todo = {
			name : newTodo.name,
			completed : false
		};

		TodoService.addTodo(todo);

		newTodo.name = "";
	};

	// $scope.updateTodo = function(todo) {
	// for (var i=0; i < todoItems.length; i++) {
	// if (todoItems[i].id == todo.id) {
	// todoItems[i] = todo;
	// return;
	// }
	// };
	// };

	$scope.removeTodo = function(todo) {
		TodoService.removeTodo(todo);
	};

	$scope.completedCount = function(todo) {
		var completedCount = 0;
		for (var i = 0; i < todoItems.length; i++) {
			if (todoItems[i].completed) {
				completedCount++;
			}
		};
		return completedCount;
	};

});

todoApp.factory('TodoService', function() {
	var todoItems = [{
		id : 1,
		name : "first todo",
		completed : false
	}, {
		id : 2,
		name : "second todo",
		completed : true
	}];

	return {
		getTodos : function() {
			return todoItems;
		},
		addTodo : function(todo) {
			todo.id = todoItems.length;
			todoItems.push(todo);
		},
		removeTodo : function(todo) {
			for (var i = 0; i < todoItems.length; i++) {
				if (todoItems[i].id == todo.id) {
					todoItems.splice(i, 1);
					return;
				}
			};
		},
	};
});
