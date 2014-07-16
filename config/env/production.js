'use strict';

module.exports = {
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/coordinatis',
	facebook: {
		clientID: 'APP_ID',
		clientSecret: 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {
		clientID: 'CONSUMER_KEY',
		clientSecret: 'CONSUMER_SECRET',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	google: {
		clientID: 'APP_ID',
		clientSecret: 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: 'APP_ID',
		clientSecret: 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	},
	tentApp: {
        name: 'Coordinat.is',
        url: 'http://coodinat.is',
        redirect_uri: 'http://localhost:3000/auth/tent/callback?id=',
        types: {
            read: [ 'https://tent.io/types/status/v0','https://coordinat.is/types/event/v0'],
            write: [ 'https://tent.io/types/status/v0','https://coordinat.is/types/event/v0']
        } 
    }
};