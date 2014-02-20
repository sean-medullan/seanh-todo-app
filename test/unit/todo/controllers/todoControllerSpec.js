'use strict';

describe('The "TodoController"', function() {

    var scope, ctrl, httpBackend, kinveyConfig, kinveyResourceUrls, mockKinvey;

    // Laod the modeule
    beforeEach(module('TodoApp', 'Kinvey'));

    // DI
    beforeEach(inject(function($rootScope, $controller, $httpBackend, $injector) {
    
    	
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        kinveyResourceUrls = $injector.get("KinveyResourceUrls");
        kinveyConfig = $injector.get("KinveyConfig");
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
    	beforeEach(function(){
   			httpBackend.when('GET', '/todos').respond([{title: 'todo1', isComplete:false, isVisible:true}, {title: 'todo2', isComplete:false, isVisible:true}]); 		
    		
    	});
    	 
        it('should have the "name" defined', function() {
        	httpBackend.expectGET(kinveyConfig.hostUrl+kinveyResourceUrls.todosX).respond([{title: 'todo1', isComplete:false, isVisible:true}, {title: 'todo2', isComplete:false, isVisible:true}]);        	
            expect(scope.app.name).toBeDefined();
            expect(angular.isDefined(scope.app.name)).toBeTruthy();
            httpBackend.flush();
        });

        it('should have a list of todo items', function() {
        	httpBackend.expectGET(kinveyConfig.hostUrl+kinveyResourceUrls.todosX).respond([{title: 'todo1', isComplete:false, isVisible:true}, {title: 'todo2', isComplete:false, isVisible:true}]);
            expect(angular.isDefined(scope.app.todoItems)).toBeTruthy();
             httpBackend.flush();
        });

        it('should have a list of todo items should be zero by default', function() {
        	httpBackend.expectGET(kinveyConfig.hostUrl+kinveyResourceUrls.todosX).respond([]);
            expect(scope.app.todoItems.length).toEqual(0);
             httpBackend.flush();
        });
    });

    describe('The "removeItem" function', function() {

        beforeEach(function() {
        	httpBackend.when('GET', '/todos').respond([{title: 'todo1', isComplete:false, isVisible:true}, {title: 'todo2', isComplete:false, isVisible:true}]); 	
        	
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
        });
        it('should be defined', function() {
        	
        	httpBackend.expectGET(kinveyConfig.hostUrl+kinveyResourceUrls.todosX).respond([{title: 'todo1', isComplete:false, isVisible:true}, {title: 'todo2', isComplete:false, isVisible:true}]);    	
            expect(scope.removeItem).toBeDefined();
            expect(angular.isFunction(scope.removeItem)).toBeTruthy();
            httpBackend.flush();
        });

        iit('should remove the item 0', function() {
        
        	httpBackend.expectGET(kinveyConfig.hostUrl+kinveyResourceUrls.todosX).respond(scope.app.todoItems);  
        	httpBackend.expectDELETE(kinveyConfig.hostUrl+kinveyResourceUrls.todosX+'/23').respond(200);
        	console.log("in test: " +scope.app.todoItems);
            scope.removeItem(scope.app.todoItems[0]);
            console.log("after remove in test: " + scope.app.todoItems);
            expect(scope.app.todoItems.length).toEqual(1);
            expect(scope.app.todoItems[0]._id).toEqual(9);
            httpBackend.flush();
        });

        it('should remove the item 1', function() {
            scope.removeItem(1);
            expect(scope.todoItems.length).toEqual(1);
            expect(scope.todoItems[0].id).toEqual(23);
        });

    });

    describe('The "createItem" function', function() {
        beforeEach(function() {
            scope.app.todoItems = [];
        });

        it('should be defined', function(){
            expect(scope.createItem).toBeDefined();
            expect(angular.isFunction(scope.createItem)).toBeTruthy();
        })

        it('should add the item to the list of "todoItems"', function() {
            var oldLength = scope.app.todoItems.length;
            var titleOfNewItem = "Newly created item";
            httpBackend.expect('POST', kinveyConfig.hostUrl + kinveyResourceUrls.todos).respond(200, {
                id: 134,
                title: titleOfNewItem
            });
            scope.createItem(titleOfNewItem);
            httpBackend.flush();
            expect(scope.app.todoItems.length).toEqual(oldLength+1);
            expect(scope.app.todoItems[scope.app.todoItems.length-1].title).toEqual(titleOfNewItem);
        })

    });
});

