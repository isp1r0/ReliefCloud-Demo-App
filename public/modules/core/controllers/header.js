'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;



		$scope.menu = [{
			title: 'Demo',
			link: 'response/events',
			uiRoute: '/response/events'
		}, {
			
			title: 'Blog',
			link: 'articles',
			uiRoute: '/articles'

		}];

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};
	}
]);