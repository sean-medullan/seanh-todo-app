'use strict';

describe('The "TodoController"', function() {

    var scope, ctrl, httpBackend, kinveyConfig, kinveyResourceUrls;

    // Laod the modeule
    beforeEach(module('TodoApp', 'Kinvey'));

    // DI
    beforeEach(inject(function($rootScope, $controller, $httpBackend, $injector) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        kinveyResourceUrls = $injector.get("KinveyResourceUrls")
        kinveyConfig = $injector.get("KinveyConfig");
        httpBackend.expect("GET", kinveyConfig.hostUrl + "/sean-todos").respond(200, [])
        ctrl = $controller('TodoController', {
            $scope : scope
        });
        httpBackend.flush();
    }));

    afterEach(function() {
        //Ensures all request i expect to have been called, have been called
        httpBackend.verifyNoOutstandingExpectation();
        // Ensures no requests were made, that i didn't expect
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('The "app" object', function() {
        it('should have the "name" defined', function() {
            expect(scope.app.name).toBeDefined();
            expect(angular.isDefined(scope.app.name)).toBeTruthy();
        });

        it('should have a list of todo items', function() {
            expect(angular.isDefined(scope.app.todoItems)).toBeTruthy();
        });

        it('should have a list of todo items should be zero by default', function() {
            expect(scope.app.todoItems.length).toEqual(0);
        });
    });

    describe('The "removeTodo" function', function() {

        beforeEach(function() {
            scope.app = {
            };
            scope.app.todoItems = [{
                title : 'This is an item',
                _id : 23,
                isComplete : false,
                isActive : true,
                isVisible : true
            }, {
                title : 'This is a second item',
                _id : 9,
                isComplete : true,
                isActive : true,
                isVisible : true
            }];
        })
        it('should be defined', function() {
            expect(scope.removeTodo).toBeDefined();
            expect(angular.isFunction(scope.removeTodo)).toBeTruthy();
        });

        it('should remove the item at the index 0', function() {
            httpBackend.expect("DELETE", kinveyConfig.hostUrl + '/sean-todos/23').respond(200, {});
            scope.removeTodo(scope.app.todoItems[0]);
            httpBackend.flush();
            expect(scope.app.todoItems.length).toEqual(1);
            expect(scope.app.todoItems[0]._id).toEqual(9);
        });

        it('should remove the item at the index 1', function() {
            httpBackend.expect("DELETE", kinveyConfig.hostUrl + '/sean-todos/9').respond(200, {});
            scope.removeTodo(scope.app.todoItems[1]);
            httpBackend.flush();
            expect(scope.app.todoItems.length).toEqual(1);
            expect(scope.app.todoItems[0]._id).toEqual(23);
        });

    });

    describe('The "addTodo" function', function() {
        beforeEach(function() {
            scope.app.todoItems = [];
        });

        it('should be defined', function() {
            expect(scope.addTodo).toBeDefined();
            expect(angular.isFunction(scope.addTodo)).toBeTruthy();
        })
        it('should add the item to the list of "todoItems"', function() {
            var oldLength = scope.app.todoItems.length;
            var titleOfNewItem = "Newly created item";
            httpBackend.expect('POST', kinveyConfig.hostUrl + "/sean-todos").respond(200, {
                id : 134,
                title : titleOfNewItem
            });
            scope.addTodo(titleOfNewItem);
            httpBackend.flush();
            expect(scope.app.todoItems.length).toEqual(oldLength + 1);
            expect(scope.app.todoItems[scope.app.todoItems.length - 1].title).toEqual(titleOfNewItem);
        });

        it('should do some stuff when it fails to create to the todo item', function() {
            var oldLength = scope.app.todoItems.length;
            var titleOfNewItem = "Newly created item";
            httpBackend.expect('POST', kinveyConfig.hostUrl + "/sean-todos").respond(500, {});
            scope.addTodo(titleOfNewItem);
            httpBackend.flush();
            expect(scope.app.todoItems.length).toEqual(oldLength);
        })
    });
});

describe('The Todo Filters', function() {

    var filter, activeTodo, archivedTodo;

    beforeEach(module('TodoApp'));

    beforeEach(inject(function($filter) {
        filter = $filter;
    }));

    beforeEach(function() {
        activeTodo = {
            _id : 13,
            isActive : true
        };
        archivedTodo = {
            _id : 12,
            isActive : false
        };
    })
    describe('The "archivedTodos" filter', function() {
        it('should only return archived items', function() {
            var todos = [activeTodo, archivedTodo];
            expect(filter('archivedTodos')(todos)).toEqual([archivedTodo]);
        })
    })
    describe('The "activeTodos" filter', function() {
        it('should only return active items', function() {
            var todos = [activeTodo, archivedTodo];
            expect(filter('activeTodos')(todos)).toEqual([activeTodo]);
        })
    })
})
