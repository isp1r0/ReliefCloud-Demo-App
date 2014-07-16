'use strict';

//Map service 
angular.module('response').directive('coordinatisMap', function ($compile) {
 
 return {
        controller: function ($scope, $location, MapService, MapControlsService, InfoWindowService, MarkersService) {

          if ($location.path() === '') {
            $location.path('/events');
          }

          $scope.location = $location;
          $scope.infow = InfoWindowService;
          $scope.controls = MapControlsService;


          this.registerInfoWindow = function (myInfoWindow) {
            InfoWindowService.registerInfoWindow(myInfoWindow);
          };

          this.registerMap = function (myMap) {
            MapService.setMap(myMap);
            
          };


 
        },
        link: function (scope, elem, attrs, ctrl) {
          var mapOptions,
            latitude = attrs.latitude,
            longitude = attrs.longitude,
            infoWindowTemplate,
            infoWindowElem,
            infowindow,
            todosControlTemplate,
            todosControlElem,
            editTodoControlTemplate,
            editTodoControlElem,
            mapStyles,
            map;

          latitude = latitude && parseFloat(latitude, 10) || 37;
          longitude = longitude && parseFloat(longitude, 10) || 3;

          infoWindowTemplate = document.getElementById('infoWindowTemplate').innerHTML.trim();
          infoWindowElem = $compile(infoWindowTemplate)(scope);
          infowindow = new google.maps.InfoWindow({
            content: infoWindowElem[0]
          });

          ctrl.registerInfoWindow(infowindow);


          mapOptions = {
            zoom: 2,
            disableDefaultUI: true,
            center: new google.maps.LatLng(latitude, longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: mapStyles
          };


 

          

          google.maps.visualRefresh = true;

          map = new google.maps.Map(elem[0], mapOptions);

          ctrl.registerMap(map);


              eventFilterTemplate = document.getElementById('eventFilter').innerHTML.trim();
              eventFilterElem = $compile(eventFilterTemplate)(scope);
                map.controls[google.maps.ControlPosition.TOP_LEFT].push(eventFilterElem[0]);
          


          



//




          /**
           * use code below to render html elements


          todosControlTemplate = document.getElementById('todosControlTemplate').innerHTML.trim();
          todosControlElem = $compile(todosControlTemplate)(scope);
          map.controls[google.maps.ControlPosition.TOP_LEFT].push(todosControlElem[0]);

          editTodoControlTemplate = document.getElementById('editTodoControlTemplate').innerHTML.trim();
          editTodoControlElem = $compile(editTodoControlTemplate)(scope);
          map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(editTodoControlElem[0]);

           */
        }

  };
    });    