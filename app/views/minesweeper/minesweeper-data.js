export function createMatrixMinesweeper(){
    var board = [];
    for(var i = 0; i < 8; i++){
        board[i] = [0,0,0,0,0,0,0,0];
    }
    return board;
}

export function generateBombs(matrixMinesWeeper){
    var row = 0;
    var col = 0;

    row = Math.floor((Math.random()*7)+0);
    col = Math.floor((Math.random()*7)+0);

    for(var i = 0; i < 8; i++){
        while (matrixMinesWeeper[row][col] == "*"){
            row = Math.floor((Math.random()*7)+0);
            col = Math.floor((Math.random()*7)+0);
        }
        matrixMinesWeeper[row][col] = "*";
    }

    return matrixMinesWeeper;
}