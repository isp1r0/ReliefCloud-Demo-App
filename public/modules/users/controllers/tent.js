'use strict';

angular.module('users').controller('TentController', ['$scope', '$location', 'Authentication',
	function($scope, $location, Authentication) {
		
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

        //#######################
        // Get method to the server of the entity and discovery is done by a normal form action - controler used here only to confrim authenitcaion


	}
]);