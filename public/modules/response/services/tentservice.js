'use strict';

//Tent service simply returns the Tent Client
angular.module('response').service('TentService', function () {


var request = require('tent-request');
var client = request(user.tent.meta, user.tent.creds);

this.getClient = function () {
return client;
}

      





});







