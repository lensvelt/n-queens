/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = []; //fixme
  //Inputs - board size (n)
  //Outputs - array representation of the board with size nxn, identifying all RC combinations where rooks can be placed without attacking each other
  //Constraints - board size, cannot have any row or column conflicts

  //Matric structure:
  //1 overall solution matrix containing:
  //nested array for each row
  //each of which contains a 0 or 1 
 

  
  //if n is 1, return [1]
  //if n > 1
    //pick a position where 1st rook goes
    //check row for conflicts AND check column conflicts using 1st rook's position
    //if row conflict is true, make whole row 0
  var board = new Board({n: n});
  var startRow = 0;
  var startCol = 0;
  var done = [];
  var count = 0;
  var validStartPoint;
  var currentRow = 0;
  //This will populate the entire board
  for (var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
    }
  }
  
  var scan = function() {
    for (var row = 0; row < n; row++) {
      currentRow = board.get(row);
      for (var col = 0; col < n; col++) {
        if (currentRow[col] === 1 && !search([row, col])) {          
          startRow = row;
          startCol = col;
          validStartPoint = true;
          break;
        }
      }
      if (validStartPoint) {
        break;
      }
    }
  };

  //remove all row conflicts for the specified start row
  var removeRowConflicts = function(startRow, startCol) {
    for (var col = 0; col < n; col++) {
      if (col !== startCol) {
        //board.togglePiece(startRow, col);
        board.get(startRow)[col] = 0;
      }
    }   
  };

  //remove all column conflicts for the specified start col
  var removeColConflicts = function(startRow, startCol) {
    for (var row = 0; row < n; row++) {
      if (row !== startRow) {
        //board.togglePiece(row, startCol);
        board.get(row)[startCol] = 0;

      }
    }   
  };

  var search = function(arrayPos) {
    var found = false;

    for (var i = 0; i < done.length; i++) {
      if (arrayPos[0] === done[i][0] && arrayPos[1] === done[i][1]) {
        found = true;
      }
    }

    return found;
  };

  //while (startRow < n && startCol < n) { 
  while (count < n) {
    validStartPoint = false;
    removeRowConflicts(startRow, startCol);
    removeColConflicts(startRow, startCol);
    done.push([startRow, startCol]);
    scan();
    count++;
  }

  //console.log(board.get(0) + '\n' + board.get(1) + '\n' + board.get(2) + '\n' + board.get(3));


  //Loops through the rows to push to solution array
  for (var rows = 0; rows < n; rows++) {
    solution.push(board.get(rows));
  }

  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme
  var n = 4;
  var board = new Board({n: n});
  var startRow = 3;
  var startCol = 3;
  var done = [];
  var count = 0;
  var validStartPoint;
  var currentRow = 0;

  var initBoard = function() {
  //This will populate the entire board
    for (var row = 0; row < n; row++) {
      for (var col = 0; col < n; col++) {
        board.togglePiece(row, col);
      }
    }
  };

  // scan will now start scanning the position after the inputted pos and stop when it hits the inputted pos again
  var scan = function(initRow, initCol) {
    debugger;
    var startRow2 = initRow;
    var startCol2 = initCol;
    var loopCount = 0;
    for (var row = startRow2; row < n; row++) {
      currentRow = board.get(row);
      for (var col = startCol2; col < n; col++) {
        if (row === n - 1 && col === n - 1 && loopCount === 0) {
          row = 0;
          col = 0;
          currentRow = board.get(row);
          loopCount++;
        }
        if (currentRow[col] === 1 && !search([row, col])) {          
          startRow = row;
          startCol = col;
          validStartPoint = true;
          break;
        }

        if (col >= n - 1) {
          startCol2 = 0;
        }

      }
      if (validStartPoint) {
        break;
      }
    }
  };

  //remove all row conflicts for the specified start row
  var removeRowConflicts = function(startRow, startCol) {
    for (var col = 0; col < n; col++) {
      if (col !== startCol) {
        //board.togglePiece(startRow, col);
        board.get(startRow)[col] = 0;
      }
    }   
  };

  //remove all column conflicts for the specified start col
  var removeColConflicts = function(startRow, startCol) {
    for (var row = 0; row < n; row++) {
      if (row !== startRow) {
        //board.togglePiece(row, startCol);
        board.get(row)[startCol] = 0;

      }
    }   
  };

  var search = function(arrayPos) {
    var found = false;

    for (var i = 0; i < done.length; i++) {
      if (arrayPos[0] === done[i][0] && arrayPos[1] === done[i][1]) {
        found = true;
      }
    }

    return found;
  };

  initBoard();
  //while (startRow < n && startCol < n) { 
  while (count < 2) {
    validStartPoint = false;
    removeRowConflicts(startRow, startCol);
    removeColConflicts(startRow, startCol);
    done.push([startRow, startCol]);
    scan(startRow, startCol);
    console.log('COUNT: ' + count + '\n' + board.get(0) + '\n' + board.get(1) + '\n' + board.get(2) + '\n' + board.get(3));
    count++;
  }

  console.log('FINAL: ' + count + '\n' + board.get(0) + '\n' + board.get(1) + '\n' + board.get(2) + '\n' + board.get(3));


  //console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  //return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
