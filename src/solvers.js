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
  var solution = undefined; //fixme
  //Inputs - board size (n)
  //Outputs - array representation of the board with size nxn, identifying all RC combinations where rooks can be placed without attacking each other
  //Constraints - board size, cannot have any row or column conflicts

  //Matric structure:
  //1 overall solution matrix containing:
  //nested array for each row
  //each of which contains a 0 or 1 
 
  var board = new Board({n: n});
  
  //if n is 1, return [1]
  //if n > 1
    //pick a position where 1st rook goes
    //check row for conflicts AND check column conflicts using 1st rook's position
    //if row conflict is true, make whole row 0

  if (n === 1) {
    return [1];    
  } else {
    var startRow = 0;
    var startCol = 0;
  }

  var done = [];

  //This will populate the entire board
  for (var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
    }
  }

  while (startRow < n && startCol < n) { 
    removeRowConflicts(startRow, startCol);
    removeColConflicts(startRow, startCol);
    done.push([startRow, startCol]);
    scan();
  }



  var scan = function(){
    for (var row = 0; row < n; row++) {
      for(var col = 0; col < n; col++) {
        if(board.get(row)[col] === 1 && done.indexOf([row,col]) === -1) {
          startRow = row;
          startCol = col;
          break;
        }
      }
    }
  }; 





  //remove all row conflicts for the specified start row
  var removeRowConflicts = function(startRow, startCol) {
    for (var col = 0; col < n; col++) {
      if (col !== startCol) {
        board.togglePiece(startRow, col);
      }
    }   
  };
  //remove all column conflicts for the specified start col
  var removeColConflicts = function(startRow, startCol) {
    for (var row = 0; row < n; row++) {
      if (row !== startRow) {
        board.togglePiece(row, startCol);
      }
    }   
  };


  
  }






  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
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
