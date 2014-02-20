'use strict';

todoApp.controller('TodoController', function($scope, TodoPromiseResource) {

	var todoItems = [];

	$scope.app = {
		name : "App Awesome - To Do"
	};

	$scope.app.todoItems = TodoPromiseResource.getAllTodos();
	$scope.app.todoItems.then(function(todos) {
		console.log(todos);
		todoItems = todos;
	}, function(resp) {
		console.log(resp);
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
		TodoPromiseResource.saveTodo(todoItem).then(function(resp) {
			console.log(resp, todoItem);
			todoItems.push(todoItem);
		}, function(resp) {
			console.log(resp);
		});

		newTodo.title = "";
	};

	$scope.editingTodo = function(todo) {
		$scope.app.originalTodo = angular.extend({}, todo);
	};

	$scope.revertEditing = function(todo) {
		// return KinveyResource.todos.update({
		// id : todo._id
		// }, todo);

		todo = $scope.app.originalTodo;
	};

	$scope.updateTodo = function(todo) {
		// return KinveyResource.todos.update({
		// id : todo._id
		// }, todo);

		TodoPromiseResource.saveTodo(todoItem).then(function(resp) {
			console.log(resp, todoItem);
		}, function(resp) {
			console.log(resp);
		});

		// todo.$update({
		// id : todo._id
		// }, function() {
		// });
	};

	$scope.removeTodo = function(todoItem) {
		TodoPromiseResource.deleteTodo(todoItem._id).then(function(resp) {
			console.log(resp);
			var index = todoItems.indexOf(todo);
			todoItems.splice(index, 1);
		}, function(resp) {
			console.log(resp);
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

todoApp.factory('TodoPromiseResource', function(KinveyResource, $q) {

	return {
		getTodo : function(id) {
			var deferred = $q.defer();
			KinveyResource.todos.get({
				id : id
			}, function(todo) {
				deferred.resolve(todo);
			}, function(resp) {
				deferred.reject(resp);
			});
			return deferred.promise;
		},
		getAllTodos : function() {
			var deferred = $q.defer();
			KinveyResource.todos.query({}, function(todos) {
				deferred.resolve(todos);
			}, function(resp) {
				deferred.reject(resp);
			});
			return deferred.promise;
		},
		saveTodo : function(todo) {
			var deferred = $q.defer();
			KinveyResource.todos.save(todo, function(resp) {
				deferred.resolve(resp);
			}, function(resp) {
				deferred.reject(resp);
			});
			return deferred.promise;
		},
		updateTodo : function(id, todo) {
			var deferred = $q.defer();
			KinveyResource.todos.save(todo, function(resp) {
				deferred.resolve(resp);
			}, function(resp) {
				deferred.reject(resp);
			});
			return deferred.promise;
		},
		deleteTodo : function(id) {
			var deferred = $q.defer();
			KinveyResource.todos.remove({
				id : id
			}, function(resp) {
				deferred.resolve(resp);
			}, function(resp) {
				deferred.reject(resp);
			});
			return deferred.promise;
		},
	};

});

todoApp.directive('todoEscape', function() {
	var ESCAPE_KEY = 27;
	return function(scope, elem, attrs) {
		elem.bind('keydown', function(event) {
			if (event.keyCode === ESCAPE_KEY) {
				scope.$apply(attrs.todoEscape);
			}
		});
	};
});
