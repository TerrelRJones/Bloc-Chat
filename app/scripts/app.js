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

blocChat.controller('roomsList', ['$scope', '$cookies', '$window', 'Room', function ($scope, $cookies, $window, Room) {


  $scope.addRoom = function (newRoomName) {
      Room.add({name: newRoomName});

      $scope.newRoomName = '';
    };

  $scope.instantMessage = {

    message: 'Hey There!',
    userName: 'Terrel',
    pubdate: new Date()
  };

  //USERS
    $scope.addUser = function (nickname) {
      console.log(nickname);
      if (nickname === undefined) {
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
   console.log(rooms);
   return {
     all: rooms,
     add: function (room) {
       this.all.$add(room);
     }
   };


 });

