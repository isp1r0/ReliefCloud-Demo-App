'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Event Schema
 */
var EventSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Event name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	country: {
		type: String,
		default: '',
		trim: true
	},
	eventTypes: {
		type: Array,
		default: '',
		required: 'At least one category is required',
		trim: true
	},
	isPublic: {
		type: Boolean,
		default: true
	},	
	location : { 
			latitude:{
				type: Number
			},
			longitude:{
				type: Number
			},
			zoom:{
				type: Number,
				default: 8
			}	
	},
	closed: {
			dateClosed:{
				type: Date
			},
			isClosed:{
				type: Boolean,
				default: false
			}	
	},
	children: {}, //this is where any child objects go - assessmentareas, servicesareas, offices, etc
});

mongoose.model('Event', EventSchema);




