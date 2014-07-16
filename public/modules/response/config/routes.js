'use strict';

//Setting up route
angular.module('response').config(['$stateProvider',
	function($stateProvider) {
		// Events state routing
		$stateProvider.
		state('listEvents', {
			url: '/response/events',
			templateUrl: 'modules/response/views/list.html',
			controller: ['$scope', function($scope) {
				 $scope.showCreateEventForm = false; 
			}]
		}).
		state('createEvent', {
			url: '/response/events/create',
			templateUrl: 'modules/response/views/list.html',
			controller: ['$scope', function($scope) {
	
          $scope.showCreateEventForm = true; 
				}]
		}).
		state('viewEvent', {
			url: '/response/events/:eventId',
			templateUrl: 'modules/response/views/view.html'
		}).
		state('editEvent', {
			url: '/response/events/:eventId/edit',
			templateUrl: 'modules/response/views/edit.html'
		});
		// Asseesment routing, etc

 
  

	}
]);

