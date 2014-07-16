'use strict';



module.exports = function(app) {
	// User Routes
	var tent = require('../../app/controllers/tent');


	// Route to Discovery in Tent Controller
	app.post('/auth/tent/link', tent.link);

	// Route to Callback function
	app.get('/auth/tent/callback', tent.callback);

	
};
