'use strict';

todoApp.controller('TodoController', function($scope, KinveyResource) {

	var todoItems = [];
	
	$scope.app = {
		name : "App Awesome - To Do"
	};

	KinveyResource.todos.query({}, function(data) {
		todoItems = $scope.app.todoItems = data;
		$scope.completedItems = 0;
		for (var i = 0; i < data.length; i++) {
			if (data[i].isComplete) {
				$scope.completedItems++;
			}
		}
	}, function(error) {
	});

	$scope.addTodo = function(newTodo) {

		var todoItem = {
			title : newTodo.title,
			_id : null,
			isComplete : false,
			isActive : true,
			isVisible : true
		};
		// var kvTodoHandle = new KinveyResource.todos(todoItem);
		// todoItem.$save();

		//FIXME: broke this some how
		KinveyResource.todos.save(todoItem, function(data) {
			todoItems.push(data);
		});

		newTodo.title = "";
	};

	$scope.updateTodo = function(todo) {
		// return KinveyResource.todos.update({
		// id : todo._id
		// }, todo);

		todo.$update({
			id : todo._id
		}, function() {
		});
	};

	$scope.removeTodo = function(todo) {
		KinveyResource.todos.remove({
			id : todo._id
		}, function() {
			var index = todoItems.indexOf(todo);
			todoItems.splice(index, 1);
		});
	};

	//TODO: test updating a todo
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
