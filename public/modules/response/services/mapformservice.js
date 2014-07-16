

'use strict';

//Map service 
angular.module('response').service('MapFormService', function () {

//create elements to be used by this service

var input = document.createElement("input"); //input element, text
input.setAttribute('type',"text");
input.setAttribute('placeholder',"Enter a Location");
input.setAttribute('data-ng-model',"eventCountry");
input.setAttribute('class',"controls");





      this.returnSearchBar = function (myMap) {

       
            myMap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    };


      this.returnEventTypeSelector = function (myMap) {



            var types = document.getElementById('type-selector');

            myMap.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

    };


          this.returnDrawingManager = function (myMap, mode) {

            var drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [
                google.maps.drawing.OverlayType.MARKER,
                google.maps.drawing.OverlayType.CIRCLE,
                google.maps.drawing.OverlayType.POLYGON,
                google.maps.drawing.OverlayType.POLYLINE,
                google.maps.drawing.OverlayType.RECTANGLE
              ]
            },
            markerOptions: {
              icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + '55FF00'
            },
            circleOptions: {
              fillColor: '#ffff00',
              fillOpacity: .5,
              strokeWeight: 1,
              clickable: true,
              editable: true,
              zIndex: 1
            }
          });
          drawingManager.setMap(myMap);


 
    };




 })