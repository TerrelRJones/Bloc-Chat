(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
blocChat = angular
.module('blocChat',  [
  'ui.router',
  'firebase',
  'ngCookies'
  ])

.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
  .state('home', {
    url: "/home",
    controller: 'roomsList',
    templateUrl: "templates/home.html"
  });

})

.run(['$cookies', function($cookies) {
    if (!$cookies.blocChatCurrentUser || $cookies.blocChatCurrentUser === '' ) {
      angular.element('#myModal2').modal({backdrop:'static'});
      angular.element('#myModal2').modal('show');
    }

  }]);

// RoomsList Controller

blocChat.controller('roomsList', ['$firebaseArray', '$scope', '$cookies', '$window', 'Room', 'Message', function ($firebaseArray, $scope, $cookies, $window, Room, Message) {
  $scope.rooms = Room.all;

  $scope.deleteRoom = function (room) {
      Room.remove(room);
    };

     $scope.addMessage = function (room) {
      var message = {
        text: $scope.messageText,
        time: $window.moment().format('h:mm a'),
        name: $cookies.blocChatCurrentUser
      };

      Message.add(room, message);
      $scope.messageText = '';
    };

        $scope.getMessagesForRoom = function (room) {
      $scope.currentRoom = room;
      $scope.currentRoomName = room.name;

      var currentRoomMessagesRef = new $window.Firebase($scope.rooms.$ref() + '/' + room.$id + '/messages/');
      $scope.roomMessages = $firebaseArray(currentRoomMessagesRef);
    };

  $scope.addRoom = function (newRoomName) {
      Room.add({name: newRoomName});

      $scope.newRoomName = '';
    };

//  $scope.instantMessage = {

//    message: 'Hey There!',
//    userName: 'Terrel',
//    pubdate: new Date()
//  };

  //USERS
    $scope.addUser = function (nickname) {
      console.log(nickname);
      if (nickname === null) {
        angular.element('#myModal2').modal({backdrop:'static'});
        angular.element('#myModal2').modal('show');
      }

      else {
        $cookies.blocChatCurrentUser = nickname;
        $scope.newNickname = '';
        angular.element('#myModal2').modal('hide');
      }
    };

}]);

// Firebase

 blocChat.factory( 'Room' , function($firebaseArray, $window) {

 var ref = new $window.Firebase('https://blazing-torch-5544.firebaseio.com/rooms/');
   // create an AngularFire reference to the data
   var rooms = $firebaseArray(ref);

   return {
     all: rooms,
     add: function (room) {
       this.all.$add(room);
     },
     remove: function (room) {
       this.all.$remove(room);
     }
   };

 });

 blocChat.factory( 'Message' , function($firebaseArray, $window) {
    return {
      all: function (roomId) {
       var ref = new $window.Firebase('https://blazing-torch-5544.firebaseio.com/rooms/'+roomId+'/messages/');
       return $firebaseArray(ref);
      },
      add: function (room, message) {
        this.all(room.$id).$add(message);
      },
      remove: function (room, message) {
        this.all(room.$id).$remove(message);
      }
    };


 });
},{}]},{},[1]);