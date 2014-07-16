'use strict';

//Map service 
angular.module('response').service('MarkersService', function () {

      this.markers = [];
      this.getMarkerByEventId = function (eventId) {
        var marker, i;
        for (i = this.markers.length - 1; i >= 0; i--) {
          marker = this.markers[i];
          if (marker.get("id") === eventId) {
            return marker;
          }
        }
        return false;
      };

      this.getMarkerByTodoId = function (todoId) {
        var marker, i;
        for (i = this.markers.length - 1; i >= 0; i--) {
          marker = this.markers[i];
          if (marker.get("id") === todoId) {
            return marker;
          }
        }
        return false;
      };


});











