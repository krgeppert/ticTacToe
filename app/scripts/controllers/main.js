'use strict';

angular.module('ticTacToeApp')
  .controller('MainCtrl', function ($scope, Board) {
    var undoTimer = 3;
    var movesMade = 0;
    var timer;
    var lastMove;

    $scope.gameInProgress = false;
    $scope.board;
    $scope.gameOver = false;
    $scope.score = [0,0];
    $scope.gameHasBeenPlayedBefore = false;
    $scope.undoAllowed = false;

    $scope.play = function(){
      movesMade = 0;
      $scope.gameHasBeenPlayedBefore = true;
      $scope.board = new Board(3);
      $scope.gameOver = false;
      $scope.playerMark = 'X';
      $scope.gameInProgress = true;
    };
    $scope.toggle = function(y, x){
      lastMove = [y,x];
      if (!$scope.board[y][x]){
        resetUndoButton();
        $scope.board[y][x] =  $scope.playerMark
        if (++movesMade === $scope.board.length * $scope.board.length) gameOver(false);
        if (checkForVictory(y,x,$scope.playerMark)){
          gameOver($scope.playerMark);
        } else {
          $scope.playerMark = $scope.playerMark === 'X' ? 'O' : 'X';
        }
      }
    };
    $scope.undoMove = function(){
      movesMade--;
      $scope.board[lastMove[0]][lastMove[1]] = 0;
      $scope.playerMark = $scope.playerMark === 'X' ? 'O' : 'X';
    }
    function resetUndoButton(){
      if (timer) clearTimeout(timer);
      $scope.undoAllowed = true;
      timer = setTimeout(function(){
        $scope.undoAllowed = false;
        $scope.$digest();
      }, undoTimer * 1000);
    }
    function gameOver (winner){
      $scope.undoAllowed = false;
      clearTimeout(timer);  
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
