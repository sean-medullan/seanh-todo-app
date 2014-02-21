'use strict';

todoApp.controller('TodoController', function($scope, TodoPromiseResource, $route) {

	$scope.app = {
		name : "App Awesome - To Do",
		todoItems : $route.current.locals.todoItems
	};

	$scope.addTodo = function(newTodo) {
		var todoItem = {
			title : newTodo.title,
			_id : null,
			isComplete : false,
			isActive : true,
			isVisible : true
		};
		TodoPromiseResource.saveTodo(todoItem).then(function(savedTodo) {
			$scope.app.todoItems.push(savedTodo);
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

	$scope.updateTodo = function(todoItem) {
		TodoPromiseResource.updateTodo(todoItem._id, todoItem).then(function(savedTodo) {
		}, function(resp) {
			console.log(resp);
		});
	};

	$scope.removeTodo = function(todoItem) {
		// TodoPromiseResource.deleteTodo(todoItem._id).then(function(resp) {
		// console.log(resp);
		// var index = $scope.app.todoItems.indexOf(todoItem);
		// $scope.app.todoItems.splice(index, 1);
		// }, function(resp) {
		// console.log(resp);
		// });
		todoItem.isVisible = false;
		TodoPromiseResource.updateTodo(todoItem._id, todoItem).then(function(savedTodo) {
			var index = $scope.app.todoItems.indexOf(todoItem);
			$scope.app.todoItems.splice(index, 1);
		}, function(resp) {
			console.log(resp);
		});
	};

	$scope.archiveTodo = function(todoItem) {
		todoItem.isActive = false;
		TodoPromiseResource.updateTodo(todoItem._id, todoItem).then(function(savedTodo) {
			var index = $scope.app.todoItems.indexOf(todoItem);
			$scope.app.todoItems.splice(index, 1);
		}, function(resp) {
			console.log(resp);
		});
	};

	$scope.isCompleteCount = function(todo) {
		var isCompleteCount = 0;
		for (var i = 0; i < $scope.app.todoItems.length; i++) {
			if ($scope.app.todoItems[i].isComplete) {
				isCompleteCount++;
			}
		};
		return isCompleteCount;
	};

});

todoApp.filter('deletedTodos', function() {
	return function(input, uppercase) {
		return function(input) {
			var filtered = [];
			for (var i = 0; i < input.length; i++) {
				if (!input[i].isVisible) {
					filtered.push(input[i]);
				}
			};
			return filtered;
		};
	};
});

todoApp.filter('archivedTodos', function() {
	return function(input) {
		var filtered = [];
		for (var i = 0; i < input.length; i++) {
			if (!input[i].isActive) {
				filtered.push(input[i]);
			}
		};
		return filtered;
	};
});

todoApp.filter('allTodos', function() {
	return function(input) {
		var filtered = [];
		for (var i = 0; i < input.length; i++) {
			if (input[i].isActive && input[i].isVisible ) {
				filtered.push(input[i]);
			}
		};
		return filtered;
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
			todo.$update({
				id : todo._id
			}, function(resp) {
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
