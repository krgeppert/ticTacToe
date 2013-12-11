'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('ticTacToeApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));
  $scope = {};
  $scope.board;

  function checkForVictory(y, x, player) { // tested manually.
    var l = $scope.board.length;
    var horizontal = true;
    var verticle = true;
    var posDiagonal = true;
    var negDiagonal = true;
    for (var i = 0; i < l; i++) {
      if ($scope.board[y][i] !== player) horizontal = false;
      if ($scope.board[i][x] !== player) verticle = false;
      if ($scope.board[i][i] !== player) posDiagonal = false; // negative slope diagonal.
      if ($scope.board[i][l - i - 1] !== player) negDiagonal = false; //positive slope diagonal.
    }
    return horizontal || verticle || posDiagonal || negDiagonal;
  }

  it('should win and lose in appropriate scenarios', function() {
      var X = 'X';
      var O = 'O';
      var winners = [
        {
          board: [
            [X, X, X],
            [X, X, X],
            [X, X, X]
          ],
          x: 2,
          y: 0,
          winner: X
        }, {
          board: [
            [X, 0, 0],
            [0, X, 0],
            [0, 0, X]
          ],
          x: 2,
          y: 2,
          winner: X
        }, {
          board: [
            [X, X, O],
            [0, 0, 0],
            [X, X, X]
          ],
          x: 0,
          y: 0,
          winner: X
        }, {
          board: [
            [0, 0, X],
            [0, X, 0],
            [X, 0, 0]
          ],
          x: 2,
          y: 0,
          winner: X
        }, {
          board: [
            [0, 0, X],
            [0, 0, X],
            [0, 0, X]
          ],
          x: 2,
          y: 0,
          winner: X
        }
      ];
      var losers = [{
        board: [
          [X, X, 0],
          [X, X, 0],
          [0, 0, 0]
        ],
        x: 1,
        y: 1,
        winner: X
      }, {
        board: [
          [O, X, X],
          [X, X, O],
          [0, O, O]
        ],
        x: 2,
        y: 2,
        winner: O
      }, {
        board: [
          [X, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],
        x: 0,
        y: 0,
        winner: X
      }];

    for (var i = 0; i < winners.length; i++) {
      $scope.board = winners[i].board;
      expect(checkForVictory(winners[i].y, winners[i].x, winners[i].winner)).toBe(true);
    }
    for (var i = 0; i < losers.length; i++) {
      expect(checkForVictory(losers[i])).toBe(false);
    }

  });
});