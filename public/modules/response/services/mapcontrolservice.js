'use strict';

//Map service 
angular.module('response').service('MapControlsService', function (InfoWindowService, MarkersService, NEW_TODO_ID) {

      this.editTodo = false;
      this.editTodoId = NEW_TODO_ID;
      this.newTodo = function () {
        this.editTodoById();
      };
      this.editTodoById = function (todoId) {
        this.editTodoId = todoId || NEW_TODO_ID;
        this.editTodo = true;
      };
      this.openInfoWindowByTodoId = function (todoId) {
        var marker = MarkersService.getMarkerByTodoId(todoId);
        if (marker) {
          InfoWindowService.setData(todoId, marker.getTitle(), marker.get("desc"));
          InfoWindowService.open(marker);
          return; 
        }
      };
      this.setCreateEvent = function () {
        this.showCreateEventForm = true;


      };
      this.setDrawingManager = function (myMap, mode) {

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

});









