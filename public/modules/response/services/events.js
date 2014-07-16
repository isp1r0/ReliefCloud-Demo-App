'use strict';

//Events service used to communicate Events REST endpoints
angular.module('response').factory('Events', ['$resource', function($resource) {
    return $resource('events/:eventId', {
        eventId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);