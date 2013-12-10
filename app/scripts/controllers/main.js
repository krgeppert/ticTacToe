'use strict';

angular.module('ticTacToeApp')
  .controller('MainCtrl', function ($scope, Board) {
    $scope.gameInProgress = false;
    $scope.playerMark = 'X';
    $scope.board = Board(3);

    $scope.play = function(){
      $scope.playerMark = 'X';
      $scope.gameInProgress = true;
    };
    $scope.toggle = function(y, x){
      $scope.board[y][x] = $scope.board[y][x] ? $scope.board[y][x] : $scope.playerMark;
      $scope.playerMark = $scope.playerMark === 'X' ? 'O' : 'X';
    };

  });
