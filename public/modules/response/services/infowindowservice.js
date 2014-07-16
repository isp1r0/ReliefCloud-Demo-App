'use strict';

//Map service 
angular.module('response').service('InfoWindowService', function (MapService) {


      var infowindow;
      this.data = {};
      this.registerInfoWindow = function (myInfoWindow) {
        infowindow = myInfoWindow;
      };
      this.setData = function (todoId, todoTitle, todoDesc) {
        this.data.id = todoId;
        this.data.title = todoTitle;
        this.data.desc = todoDesc;
      };
      this.open = function (marker) {
        infowindow.open(MapService.getMap(), marker);
      };
      this.close = function () {
        if (infowindow) {
          infowindow.close();
          this.data = {};
        }
      };


  
});










