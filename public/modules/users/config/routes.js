'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/profile.html'
		}).
		state('myaccount', {
			url: '/settings/myaccount',
			templateUrl: 'modules/users/views/settings/myaccount.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/password.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/accounts.html'
		}).
		state('tent', {
			url: '/settings/tent',
			templateUrl: 'modules/users/views/settings/tent.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/signup.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/signin.html'
		});
	}
]);