'use strict';

todoApp.controller('TodoController', function($scope, KinveyResource){

    $scope.app  = {
        name: "App Awesome - To Do",
        todoItems: []
    };
	
	$scope.app.todoItems = KinveyResource.todos.query({}, 
		function(data) {
			$scope.completedItems = 0;
			for(var i=0; i<data.length; i++){
				if(data[i].isComplete == true){
					$scope.completedItems++;
				}
			}
		}, 	function(error) {}
	);
	$scope.createItem = function(title) {
        var todoItem = new KinveyResource.todos({
            title: title,
            _id: null,
            isComplete: false,
            isActive: true,
            isVisible: true
        });
        $scope.app.todoItems.push(todoItem)
        todoItem.$save();
    };
	
	$scope.updateStatus = function(item){
		console.log(item.isComplete);
		 item.$update({_id : item._id}, 
			function() {});
	};
});
