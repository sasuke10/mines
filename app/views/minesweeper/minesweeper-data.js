export function createMatrixMinesweeper(){
    var matrixMinesWeeper = [];
    for(var i = 0; i < 8; i++){
        matrixMinesWeeper[i] = [0,0,0,0,0,0,0,0];
    }
    return matrixMinesWeeper;
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

function putBomb(vari,varj,endi,endj,matrixMinesWeeper){
    for(var i = vari; i <= endi; i++){
        for(var j = varj; j <= endj; j++){
           if(matrixMinesWeeper[i][j] != "*"){
                matrixMinesWeeper[i][j] = (parseInt(matrixMinesWeeper[i][j])+1);
           }
        }
    }
}

export function bombsAround(matrixMinesWeeper){
    for(var i = 0; i < 8; i++){
        for(var j = 0; j < 8; j++){
           if(matrixMinesWeeper[i][j] == "*"){
                if(i == 0 && j == 0){
                    putBomb(i, j, i + 1, j + 1,matrixMinesWeeper);
                }
                else if (i == 0 && (j > 0 && j < 7)) {
                    putBomb(i, j - 1, i + 1, j + 1,matrixMinesWeeper);
                }
                else if(i == 0 && j == 7){
                    putBomb(i, j - 1, i + 1, j,matrixMinesWeeper);
                }
                else if(j == 7 && (i > 0 && i < 7)){
                    putBomb(i - 1, j - 1, i + 1, j,matrixMinesWeeper);
                }
                else if(i == 7 && j == 7){
                    putBomb(i - 1, j - 1, i, j,matrixMinesWeeper);
                }
                else if(i == 7 && (j > 0 && j < 7)){
                    putBomb(i - 1, j - 1, i, j + 1,matrixMinesWeeper);
                }
                else if(i == 7 && j == 0){
                    putBomb(i - 1, j, i, j + 1,matrixMinesWeeper);
                }
                else if(j == 0 && (i > 0 && i < 7)){
                    putBomb(i - 1, j, i + 1, j + 1,matrixMinesWeeper);
                }else{
                    putBomb(i - 1, j - 1, i + 1, j + 1,matrixMinesWeeper);
                }
           }
        }
    }

    return matrixMinesWeeper;
}

export function createMatrixBoard(num) {
  const row = new Array(num).fill({});
  const column = new Array(num).fill(row);

  return column;
}

export function createBoard(matrixBoard, matrixMinesWeeper) {
    let board = [];
    matrixBoard.map((item, i) => item.map((subItem, j) => {
        board = board.concat({ id: `${i}${j}`,indexI: i, indexJ: j, value: matrixMinesWeeper[i][j] });
    }));
    return board;

}
