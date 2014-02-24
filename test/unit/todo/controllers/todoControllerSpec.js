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
        kinveyConfig = $injector.get("KinveyConfig")
        ctrl = $controller('TodoController', {
            $scope : scope
        });
    }));

    afterEach(function(){
        //Ensures all request i expect to have been called, have been called
        httpBackend.verifyNoOutstandingExpectation();
        // Ensures no requests were made, that i didn't expect
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('The "app" object', function() {
        it('should have the "name" defined', function() {
            httpBackend.expect('GET', 'https://baas.kinvey.com/appdata/kid_PTFROdkMpM/todos?').respond(200);
			expect(scope.app.name).toBeDefined();
            expect(angular.isDefined(scope.app.name)).toBeTruthy();
			httpBackend.flush(); 
        });

        it('should have a list of todo items', function() {
            httpBackend.expect('GET', 'https://baas.kinvey.com/appdata/kid_PTFROdkMpM/todos?').respond(200);
			expect(angular.isDefined(scope.app.todoItems)).toBeTruthy();
        	httpBackend.flush(); 
		});

        it('should have a list of todo items should be zero by default', function() {
            httpBackend.expect('GET', 'https://baas.kinvey.com/appdata/kid_PTFROdkMpM/todos?').respond(200);
			expect(scope.app.todoItems.length).toEqual(0);
			httpBackend.flush(); 
        });
    });

    describe('The "removeItem" function', function() {

        beforeEach(function() {
            scope.todoItems = [{
                title : 'This is an item',
                id : 23,
                isComplete : false,
                isActive : true,
                isVisible : true
            }, {
                title : 'This is a second item',
                id : 9,
                isComplete : true,
                isActive : true,
                isVisible : true
            }];
        })
        it('should be defined', function() {
            expect(scope.removeItem).toBeDefined();
            expect(angular.isFunction(scope.removeItem)).toBeTruthy();
        });

        it('should remove the item at the index 0', function() {
            scope.removeItem(0);
            expect(scope.todoItems.length).toEqaul(1);
            expect(scope.todoItems[0].id).toEqaul(9);
        });

        it('should remove the item at the index 1', function() {
            scope.removeItem(1);
            expect(scope.todoItems.length).toEqaul(1);
            expect(scope.todoItems[0].id).toEqaul(23);
        });

    });

    describe('The "createItem" function', function() {
        beforeEach(function() {
            scope.app.todoItems = [];
        });

        it('should be defined', function(){
			httpBackend.expect('GET', 'https://baas.kinvey.com/appdata/kid_PTFROdkMpM/todos?').respond(200);
            expect(scope.createItem).toBeDefined();
            expect(angular.isFunction(scope.createItem)).toBeTruthy();
			httpBackend.flush();        
		});

        it('should add the item to the list of "todoItems"', function() {
            var oldLength = scope.app.todoItems.length;
            var titleOfNewItem = "Newly created item";
            httpBackend.expect('GET', 'https://baas.kinvey.com/appdata/kid_PTFROdkMpM/todos?').respond(200);
			httpBackend.expect('POST', kinveyConfig.hostUrl + kinveyResourceUrls.todos).respond(200, {
                id: 134,
                title: titleOfNewItem
            });
            scope.createItem(titleOfNewItem);
            httpBackend.flush();
            expect(scope.app.todoItems.length).toEqual(oldLength+1);
            expect(scope.app.todoItems[scope.app.todoItems.length-1].title).toEqual(titleOfNewItem);
        });

    });

	describe('The "updateStatus" function', function(){
		it('should be defined', function(){
			httpBackend.expect('GET', 'https://baas.kinvey.com/appdata/kid_PTFROdkMpM/todos?').respond(200);
            expect(scope.updateStatus).toBeDefined();
            expect(angular.isFunction(scope.updateStatus)).toBeTruthy();
			httpBackend.flush();
        });
		
	
	});
});

