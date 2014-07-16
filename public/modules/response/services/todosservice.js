'use strict';

//Map service 
angular.module('response').service('TodosService', function ($filter) {


      // nextId and list both have mock starting data
      this.nextId = 4;
      this.items = [
        {
          id: 1,
          completed: false,
          title: 'Play Tennis',
          desc: '',
          lat: 43.09278984218124,
          lng: -89.36774236078266
        }, {
          id: 2,
          completed: true,
          title: 'Buy Groceries',
          desc: 'Steak, Pasta, Spinach',
          lat: 43.06487353914984,
          lng: -89.41749499107603
        }, {
          id: 3,
          completed: false,
          title: 'Picnic Time',
          desc: 'Hang out with friends',
          lat: 43.0869882068853,
          lng: -89.42141638065578
        }
      ];
      this.filter = {};
      this.filtered = function () {
        return $filter('filter')(this.items, this.filter);
      };
      this.remainingCount = function () {
        return $filter('filter')(this.items, {completed: false}).length;
      };
      this.getTodoById = function (todoId) {
        var todo, i;
        for (i = this.items.length - 1; i >= 0; i--) {
          todo = this.items[i];
          if (todo.id === todoId) {
            return todo;
          }
        }
        return false;
      };
      this.addTodo = function (title, desc, lat, lng) {
        var newTodo = {
          id: this.nextId++,
          completed: false,
          title: title,
          desc: desc,
          lat: lat,
          lng: lng
        };
        this.items.push(newTodo);
      };
      this.updateTodo = function (todoId, title, desc, lat, lng, comp) {
        var todo = this.getTodoById(todoId);
        if (todo) {
          todo.title = title;
          todo.desc = desc;
          todo.lat = lat;
          todo.lng = lng;
          todo.completed = comp;
          todo.id = this.nextId++;
        }
      };
      this.prune = function () {
        var flag = false, i;
        for (var i = this.items.length - 1; i >= 0; i--) {
          if (this.items[i].completed) {
            flag = true;
            this.items.splice(i, 1);
          }
        }
        if (flag) this.nextId++;
      };
});











