'use strict';

var path = require('path'),
	rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	app: {
		title: 'Coordinatis',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	root: rootPath,
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'coordinatis',
	sessionCollection: 'sessions'
};