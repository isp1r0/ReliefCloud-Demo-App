'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Event = mongoose.model('Event');


var	_ = require('lodash');

var request = require('tent-request');




/**
 * Create a Event
 */
exports.create = function(req, res) {

	var event = new Event(req.body);
	var user = req.user; 


	//save events to the coordinatis DB but then post it to the users Tent server.....
	event.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				event: event
			});
		} else {
			res.jsonp(event);
				

			//create the client
			
			var client = request(user.tent.meta, user.tent.creds);

			
			var post = client.create('https://coordinat.is/types/event/v0#',
					
					{ 	publishedAt: Date.now()

					},
					 event, function (err, res, body) {
										if(err) return console.error('you got an error:' + err);
										console.log(res.statusCode);
										console.log('came back with this body content:' +body);
																
										}
			);//closeout the create client

		}
	});//closing out the save function


};


/**
 * Show the current Event
 */
exports.read = function(req, res) {
	res.jsonp(req.event);
};

/**
 * Update a Event
 */
exports.update = function(req, res) {
	var event = req.event;

	event = _.extend(event, req.body);

	event.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(event);
		}
	});
};

/**
 * Delete an Event
 */
exports.delete = function(req, res) {
	var event = req.event;

	event.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(event);
		}
	});
};

/**
 * List of Events
 */

exports.list = function(req, res) {

	Event.find().sort('-created').populate('user', 'displayName').exec(function(err, events) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(events);
		}
	});
};

/**
 * Event middleware
 */
exports.eventByID = function(req, res, next, id) {
	Event.findById(id).populate('user', 'displayName').exec(function(err, event) {
		if (err) return next(err);
		if (!event) return next(new Error('Failed to load Event ' + id));
		req.event = event;
		next();
	});
};

/**
 * Event authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.event.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};



/**
 * List Events from the Tent Endpoint
 */
exports.tentfeed = function(req, res) {

			var user = req.user; 
			//create the client
		
			var client = request(user.tent.meta, user.tent.creds);

			
			var feed = client.query({limit: 1, types: 'https://coordinat.is/types/event/v0'} , function (err, res, body) {
										if(err) return console.error('you got an error:' + err);
										console.log(res.statusCode);
										console.log('back from Tent request w/o error');
										console.log(JSON.stringify(body));
										return body;			
										}
			);//closeout the create client
console.log('this is the feed:' +feed);
			
};



/**
 * Endpoint for notification from tent servers
 */
exports.notification = function(err, req, res) {

										if(err) return console.error('you got an error:' + err);
										console.log(res.statusCode);
										console.log('came back with this body content:' +body);
																


};
