'use strict';

angular.module('ticTacToeApp')
  .service('Board', function Board() {
    return function(size){
      var board = [];
      var row = [];
      for (var j = 0; j < size; j++){
        row.push(0);
      }
      for (var i = 0; i < size; i++){
        board.push(row.slice());
      }  
      return board;
    }
  });
