'use strict';

angular.module('ticTacToeApp')
  .controller('MainCtrl', function ($scope, Board) {
    $scope.gameInProgress = false;
    $scope.board;
    $scope.gameOver = false;
    var movesMade = 0;
    $scope.score = [0,0];
    $scope.gameHasBeenPlayedBefore = false;

    $scope.play = function(){
      $scope.gameHasBeenPlayedBefore = true;
      $scope.board = new Board(3);
      $scope.gameOver = false;
      $scope.playerMark = 'X';
      $scope.gameInProgress = true;
    };
    $scope.toggle = function(y, x){
      if (!$scope.board[y][x]){
        $scope.board[y][x] =  $scope.playerMark
        if (movesMade++ === $scope.board.length * $scope.board.length) gameOver(false);
        if (checkForVictory(y,x,$scope.playerMark)){
          gameOver($scope.playerMark);
        } else {
          $scope.playerMark = $scope.playerMark === 'X' ? 'O' : 'X';
        }
      }
    };
    function gameOver (winner){
      $scope.gameInProgress = false;
      $scope.gameOver = true;
      if (winner){
        winner === 'X' ? $scope.score[0]++ : $scope.score[1]++;
        $scope.endMessage = winner + '\'s Win!';
      } else {
        $scope.endMessage = 'Cat\'s Game.';
      }
    }
    function checkForVictory (y,x, player){ // tested manually.
      var l = $scope.board.length;
      var horizontal = true;
      var verticle = true;
      var posDiagonal = true;
      var negDiagonal = true;
      for (var i = 0; i < l; i++){
        if ($scope.board[y][i] !== player) horizontal = false;
        if ($scope.board[i][x] !== player) verticle = false;
        if ($scope.board[i][i] !== player) posDiagonal = false; // negative slope diagonal.
        if ($scope.board[i][l - i - 1] !== player) negDiagonal = false; //positive slope diagonal.
      }
      return horizontal || verticle || posDiagonal || negDiagonal;
    }
  });
