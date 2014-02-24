'use strict';

todoApp.controller('HomeController', function($scope, KinveyResource, $filter){
    $scope.app  = {
        name: "App Awesome - To Do",
        todoItems: []
    };

    $scope.getAllTodos = function() {
        KinveyResource.todos.query({}, function(todoItems){
            $scope.app.todoItems = todoItems;
        })
    };

    $scope.getAllTodos();
});


todoApp.controller('TodoController', function($scope, KinveyResource, $filter){

    $scope.app  = {
        name: "App Awesome - To Do",
        todoItems: []
    };

    /**
     *
     * @param {Object} todo
     */
    $scope.removeTodo = function(todo) {
        KinveyResource.todos.remove({
            id: todo._id
        }, function() {
            for(var i=0; i<=$scope.app.todoItems.length; i++) {
                if(todo._id == $scope.app.todoItems[i]._id) {
                    $scope.app.todoItems.splice(i, 1);
                    break;
                }
            }
        })
    };


    $scope.addTodo = function(todoTitle) {
        var todoResource = new KinveyResource.todos({
            isActive: true,
            isComplete: false,
            isVisible: true,
            title: todoTitle,
            _id: null
        });

        todoResource.$save(function(savedTodo){
            $scope.app.todoItems.push(savedTodo);
            $scope.todoTitle = "";
        }, function() {
            console.log('Server failed!')
        });
    };




    $scope.init = function() {
        if($scope.itemType=="active") {
            $scope.todos = $filter('activeTodos')($scope.todos);
        }else if($scope.itemType=="archived") {
            $scope.todos = $filter('archivedTodos')($scope.todos);
        }
    };

    $scope.$watch('todos', $scope.init);

    $scope.init();

});



todoApp.filter('archivedTodos', function($filter) {
    return function(todos) {
        return $filter('filter')(todos, {
            isActive: false
        })
    }
});

todoApp.filter('activeTodos', function() {
    return function(todos) {
        var activeTodos = [];
        angular.forEach(todos, function(todo) {
            if(todo.isActive) {
                activeTodos.push(todo)
            }
        });
        return activeTodos;
    }
});


todoApp.directive('todosList', function() {
    return {
        restrict : 'E',
        controller : 'TodoController',
        templateUrl : '/partials/todos.html',
        replace : true,
        scope : {
            todos: '=',
            itemType: '@'
        },
        link : function(scope, element, attrs) {
        }
    }
});