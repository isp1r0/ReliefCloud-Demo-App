'use strict';


angular.module('response').value('NEW_TODO_ID', -1);

// Events controller
angular.module('response').controller('ResponseController', ['$scope', '$timeout', '$state', '$stateParams', '$location',  'Authentication', 'MapService', 'MarkersService', 'MapFormService', 'InfoWindowService', 'MapControlsService', 'NEW_TODO_ID',  'TentService', 'Events',
    function($scope, $timeout, $state, $stateParams, $location, Authentication, MapService, MarkersService, MapFormService, InfoWindowService, MapControlsService, NEW_TODO_ID, TentService, Events) {


        $scope.authentication = Authentication;
        


        var client = TentService.getClient();


          $scope.eventTypes = [
            {name:'Conflict', icon:'modules/response/img/icons/earthquake.gif'},
            {name:'Drought', icon:'modules/response/img/icons/earthquake.gif'},
            {name:'Earthquake', icon:'modules/response/img/icons/earthquake.gif'},
            {name:'Epidemic', icon:'modules/response/img/icons/earthquake.gif'},
            {name:'Flood', icon:'modules/response/img/icons/earthquake.gif'},
            {name:'Hurricane', icon:'modules/response/img/icons/earthquake.gif'},
            {name:'Storm', icon:'modules/response/img/icons/earthquake.gif'},
            {name:'Tornado', icon:'modules/response/img/icons/earthquake.gif'},
            {name:'Tsunami', icon:'modules/response/img/icons/earthquake.gif'},
            {name:'Other', icon:'modules/response/img/icons/earthquake.gif'}
          ];







//MAP CODE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

      //var map = MapService.getMap();
      var geocoder = new google.maps.Geocoder();
      var bounds = new google.maps.LatLngBounds();







              $scope.$watch('eventCountry + bounds', function() {

                      geocoder.geocode( {'address' : $scope.eventCountry}, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            //map.setCenter(results[0].geometry.location);
                           // map.setZoom(3);
                            
                            addEventMarker.position = results[0].geometry.location;
                            $scope.latitude = addEventMarker.getPosition().lat();
                            $scope.longitude = addEventMarker.getPosition().lng();
                            $scope.bounds = results[0].geometry.bounds;
                            addEventMarker.setMap(MapService.getMap());
                            MapService.getMap().fitBounds(results[0].geometry.bounds)
                            $scope.$apply();
                        }
                    });

                   
               });




 




//for creating new event with marker

      var addPinImage;
        
      var addEventMarker;

      $scope.addEvent = {};

      // editMarker Setup Start

      addPinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + "55FF00",
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));

      addEventMarker = new google.maps.Marker({
        title: "Drag Me",
        draggable: true,
        clickable: false,
        icon: addPinImage,
        position: new google.maps.LatLng(0, 0)
      });   

      //addEventMarker.setMap(MapService.getMap());

      MarkersService.markers.push(addEventMarker);






              function addEventMarkerDragCallback (scope, myMarker) {
                return function () {
                  var pos = myMarker.getPosition();
                  scope.latitude = pos.lat();
                  scope.longitude = pos.lng();
                  if(!scope.$$phase) scope.$apply();
                };
              }
              google.maps.event.addListener(addEventMarker, 'drag', addEventMarkerDragCallback($scope, addEventMarker));

              function addEventMarkerDblClickCallback (scope) {
                return function () {
                  scope.$apply(function () {
                    scope.submitTodo();
                  });
                };
              }
              google.maps.event.addListener(addEventMarker, 'dblclick', addEventMarkerDblClickCallback($scope));

              $scope.$watch('addEvent.lat + addEvent.lng', function (newValue, oldValue) {
                if (newValue !== oldValue) { 
                  var pos = addEventMarker.getPosition(),
                    latitude = pos.lat(),
                    longitude = pos.lng();
                  if ($scope.addEvent.lat !== latitude || $scope.addEvent.lng !== longitude)
                    addEventMarker.setPosition(new google.maps.LatLng($scope.addEvent.lat || 0, $scope.addEvent.lng || 0));
                }
              });

      // editMarker Setup End












// END MAP CODE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++





        // Create new Event
        $scope.create = function() {



       	// Create new Event object
            var event = new Events({
                name: this.name,
                description: this.description,
                country: this.country,
                eventTypes: this.selectedEventTypes,
                isPublic: this.isPublic,
                location:{
                        latitude: this.latitude,
                        longitude: this.longitude,
                        zoom: this.zoom
                }
            });


            //post the new event to the users tent server
            var post = client.create('https://coordinat.is/types/event/v0#',
                    
                    {publishedAt: Date.now()},
                    event, 
                    function (err, res, body) {
                        if(err) {
                            $scope.error = err;
                            $scope.$apply();
                            return
                        } 
                        // Redirect after save
                        $location.path('events/' + body.post.id); 
                        $scope.feeback ='Event has been created'
                        $scope.$apply();                                      
                    }
            );//closeout the create client

                                                            /**
                                                                *Scaffolded CODE FOR SAVING SERVER MONGO OBJECT via ENVENT FACTORY SERVICE
                                                            
                                                             // Redirect after save
                                                            event.$save(function(response) {
                                                                $location.path('events/' + response._id);
                                                            });
                                                            **/


            // Clear form fields
            this.name = '';
        
        };


        // Remove existing Event
        $scope.remove = function(event) {

            if (confirm('Are you sure you want to delete this event?  The event will be removed from your organizations server')) {

                    //post the new event to the users tent server
                    var post = client.delete($scope.event.id, function (err, res, body) {
                                      if(err) {
                                        $scope.error = err;
                                        $scope.$apply();
                                        return
                                      } 
                                    // Redirect after delete
                                    $location.path('events'); 
                                    $scope.feeback ='Event has been deleted'
                                    $scope.$apply();                                      
                                }
                    );//closeout the create client


            } else {
                
                return
            }






        };

        // Update existing Event
        $scope.update = function() {


        // Create new Event object
            var updatedEvent = new Events({
                name: $scope.event.content.name,
                description: $scope.event.content.description,
                country: $scope.event.content.country,
                eventTypes: $scope.event.content.selectedEventTypes,
                isPublic: $scope.event.content.isPublic,
                location:{
                        latitude: $scope.event.content.location.latitude,
                        longitude: $scope.event.content.location.longitude,
                        zoom: $scope.event.content.location.zoom
                }
            });


            //post the new event to the users tent server
            var post = client.update($scope.event.id, $scope.event.version.id, 'https://coordinat.is/types/event/v0#',
                    {publishedAt: Date.now()},
                    updatedEvent, 
                    function (err, res, body) {
                        if(err) {
                            $scope.error = err;
                            console.log('Error ----- ' + err);
                            $scope.$apply();
                            return
                        } 
                        // Redirect after save
                        $location.path('events'); 
                        $scope.feeback ='Event has been updated'
                        console.log('Back from TENT ----- Event has been updated ');
                        $scope.$apply();                                      
                    }
            );//closeout the create client



/**
                    var req = client.update(
                        //id
                        $scope.event.id,
                        //parent id
                        $scope.event.version.id,
                        //type
                        $scope.event.type,
                        //meta data
                        {permissions:{public: $scope.event.isPublic},
                        //updated event
                          {name: $scope.event.name,
                          description: $scope.event.description,
                          country: $scope.event.country,
                          eventTypes: $scope.event.selectedEventTypes,
                          isPublic: $scope.event.isPublic,
                          location:{
                                    latitude: $scope.event.latitude,
                                    longitude: $scope.event.longitude,
                                    zoom: $scope.event.zoom
                                    }
                          },                      
                        //callback
                        function (err, res, body) {
                            if(err) {
                                $scope.error = err;
                                $scope.$apply();
                                return
                            } 
                            // Redirect after update
                            $location.path('events/' + res._id); 
                            $scope.feeback ='Event has been updated'
                            $scope.$apply();                                      
                            }
                    );//closeout the create client

**/



        };



        // Find existing Event
        $scope.findOneTent = function() {

            var itemId = $stateParams.eventId;
            console.log(itemId);

            var q = client.get(itemId , function (err, res, body) {
                          if(err) {
                            $scope.error = err;
                            $scope.$apply();
                            return
                          } 

                          $scope.event = body.post;
                          //TODO Fix this  ----  $scope.SelectedEventTypes = body.post.content.eventTypes[0];
                          
                          $scope.$apply();
                                        
            });//closeout the create client

          






            
        };

        // Find a list of Events from the Tent Server Endpoint
        $scope.getFeed = function() {

        
            var feedLength = $stateParams.feedLength;

            if (!feedLength) {
                var feedLength = 10;
            }

            var q=client.query({limit: feedLength, types: 'https://coordinat.is/types/event/v0'} , function (err, res, body) {
                  if(err) return $scope.error = err;
                  
                   $scope.events = body;
                    
                    _.each(body.posts, function(post){ 
                        
                            var marker,
                            markerOptions,

                            //latitude = post.content.location.latitude && parseFloat(post.content.location.latitude, 10) || 0;
                            //longitude = post.content.location.longitude && parseFloat(post.content.location.longitude, 10) || 0;
                            
                          markerOptions = {
                            map: MapService.getMap(),
                            title: post.content.name,
                            position: new google.maps.LatLng(post.content.location.latitude, post.content.location.longitude)
                          };
                          marker = new google.maps.Marker(markerOptions);
                          marker.setValues({
                            id: post.id,
                            desc: post.content.description
                          });
                          MarkersService.markers.push(marker);


                    });
/**
                var marker,
                markerOptions,
                todo = todos[todoIndex];

              markerOptions = {
                map: map,
                title: todo.title,
                position: new google.maps.LatLng(todo.lat, todo.lng)
              };
              marker = new google.maps.Marker(markerOptions);
              marker.setValues({
                id: todo.id,
                desc: todo.desc
              });
              MarkersService.markers.push(marker);

**/






                   $scope.$apply();
             });//closeout the create client


     

        };






    }
]);


