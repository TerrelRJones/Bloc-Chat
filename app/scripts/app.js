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

blocChat.controller('roomsList', ['$scope', 'Room', function ($scope, Room) {
  $scope.rooms = Room.all;

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
      } else {
        $cookies.blocChatCurrentUser = nickname;
        $scope.newNickname = '';
        angular.element('#myModal2').modal('hide');
      }
    };

}]);

//Modal Controller

blocChat.controller('ModalDemoCtrl', ['$scope', '$modal', '$log',  function ($scope, $modal, $log) {


  $scope.newRoom = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'templates/createRoomModal.html',
      controller: function ($scope, $modalInstance, item) {
        $scope.items = items;
      },
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

}]);

// Firebase

blocChat.factory( 'Room' , ['$firebase' , function($firebaseArray) {

  var firebaseRef = new Firebase ('https://blazing-torch-5544.firebaseio.com/');
  var rooms = $firebaseArray(firebaseRef.child('rooms'));

  return {
    all: rooms
  };


}]);

