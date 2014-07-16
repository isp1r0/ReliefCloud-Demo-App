'use strict';

/**
 * Module dependencies.
 */

var auth = require('tent-auth');
var discover = require('tent-discover');
var tentApp =  {
        name: 'Coordinat.is',
        url: 'http://coodinat.is',
        redirect_uri: 'http://localhost:3000/auth/tent/callback?id=',
        types: {
            read: [ 'https://tent.io/types/status/v0','https://coordinat.is/types/event/v0'],
            write: [ 'https://tent.io/types/status/v0','https://coordinat.is/types/event/v0']
        } ,
        notification_url: 'http://localhost:3000/notification',
        notification_types: [ 'https://tent.io/types/status/v0','https://coordinat.is/types/event/v0']

    };

/**
 * discover the tent entity callback
 */
exports.link = function(req, res) {
      

					var entity = req.body.entity; //get the entity 
					var user = req.user;
                    

                    console.log('entity %s', entity);    
                    console.log('user %s', user); 
                    console.log('Tent App %s', tentApp); 


                 // discover the entity to get the meta post
                // I use the tent-discover module , but you can replace
                // it with another one!

                            // check if the user did previously run through the auth process.
                            // if he did, we can skip the registration skip and directly obtain refreshed
                            // tokens ("login")
                            if((user.tent.entity) && user.tent.creds) {
                                 console.log('Previously Auth User is ', tentApp); 
                                
                                var url = auth.generateURL(user.tent.meta[0].post.content, user.tent.appID);
                                user.state = url.state;
                                res.redirect(url.url);

                            // start the registration process through which every user goes once
                            } else {

                                 discover(entity, function(err, meta) {
                                        if(err) return res.send(err);
                                        
                                        //set tent data to user db
                                        user.tent.meta = meta;
                                        user.tent.entity = entity;

                                        // we have to clone the app object, to not modify the global one
                                        var cApp = JSON.parse(JSON.stringify(tentApp));

                                        // the callback needs to identify to whom the code belongs
                                        cApp.redirect_uri += user.email;

                                        // register the app with the server
                                        // this step is skipped the next time
                                        auth.registerApp(meta.post.content, cApp,
                                            function(err, tempCreds, appID) {
                                                if(err) return res.send(err);
                                               

                                                // these temporary credentials,
                                                // only used during authentication
                                                user.tent.tempCreds = tempCreds;
                                                 user.tent.appID= appID;

                                                //finally generate the auth url ...
                                                var url = auth.generateURL(meta.post.content, appID);
                                                user.tent.state = url.state;
                                                        
                                                        // save the user
                                                        user.save(function(err) {
                                                          if (err)
                                                          throw err;
                                                         });

                                                // ... and direct the user there!
                                                res.redirect(url.url);                   
                                        });
                                    });

                            }



};

/**
 * tent callback and persist credentials
 */
exports.callback = function(req, res) {


                console.log('callback id %s', req.query.id);
                console.log('state ', req.query.state);
                console.log('callback Code %s', req.query.code);
                var user = req.user; // get the user out of session and pass to template
                var code = req.query.code;
                // check state from callback with state stored in User object
                console.log('userstate', user.tent.state);
                console.log('ccallbackstate', req.query.state);
                if(user.tent.state !== req.query.state)
                    return res.send('mismatching state');

                    auth.tradeCode(user.tent.meta.post.content, user.tent.tempCreds, code,
                    function(err, permaCreds) {
                            if(err) return res.send(err);

                            user.tent.creds = permaCreds;
                            user.tent.linked = true;        
                                     // save the user
                                     user.save(function(err) {
                                         if (err)
                                         throw err;
                                      });



                            // dadaaaaaaa!
                            res.redirect('/#!/settings/myaccount');
                    });



};

