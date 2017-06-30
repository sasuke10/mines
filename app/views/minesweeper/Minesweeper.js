import React, { Component } from 'react';
import { MdBrightnessHigh } from 'react-icons/lib/md';
import { v4 } from 'uuid';
import { createMatrixMinesweeper, generateBombs } from './minesweeper-data'

function colocaNumeroBombas(vari,varj,fini,finj,tablero){
    for(var i = vari; i <= fini; i++){
        for(var j = varj; j <= finj; j++){
           if(tablero[i][j] != "*"){
                tablero[i][j] = (parseInt(tablero[i][j])+1);
           }
        }
    }
}

function bombasAlrededor(tablero){
    for(var i = 0; i < 8; i++){
        for(var j = 0; j < 8; j++){
           if(tablero[i][j] == "*"){
                if(i == 0 && j == 0){
                    colocaNumeroBombas(i, j, i + 1, j + 1,tablero);
                }
                else if (i == 0 && (j > 0 && j < 7)) {
                    colocaNumeroBombas(i, j - 1, i + 1, j + 1,tablero);
                }
                else if(i == 0 && j == 7){
                    colocaNumeroBombas(i, j - 1, i + 1, j,tablero);
                }
                else if(j == 7 && (i > 0 && i < 7)){
                    colocaNumeroBombas(i - 1, j - 1, i + 1, j,tablero);
                }
                else if(i == 7 && j == 7){
                    colocaNumeroBombas(i - 1, j - 1, i, j,tablero);
                }
                else if(i == 7 && (j > 0 && j < 7)){
                    colocaNumeroBombas(i - 1, j - 1, i, j + 1,tablero);
                }
                else if(i == 7 && j == 0){
                    colocaNumeroBombas(i - 1, j, i, j + 1,tablero);
                }
                else if(j == 0 && (i > 0 && i < 7)){
                    colocaNumeroBombas(i - 1, j, i + 1, j + 1,tablero);
                }else{
                    colocaNumeroBombas(i - 1, j - 1, i + 1, j + 1,tablero);
                }
           }
        }
    }

    return tablero;
}

function createMatriz(num) {
  const row = new Array(num).fill({});
  const column = new Array(num).fill(row);

  return column;
}

function createBoard(matriz, boardData) {
    let board = [];
    matriz.map((item, i) => item.map((subItem, j) => {
        board = board.concat({ id: `${i}${j}`,indexI: i, indexJ: j, value: boardData[i][j] });
    }));
    return board;

}

export default class Minesweeper extends Component {

  constructor(){
    super();

    const tablero = bombasAlrededor(generateBombs(createMatrixMinesweeper()));
    const matriz = createMatriz(8);
    const minesweeper = createBoard(matriz, tablero);

    this.state = {
      minesweeper,
      openBox: [],
      tablero,
      gameOver: false,
    };

    this.generateNewGame = this.generateNewGame.bind(this);
    this.abrirAlrededor = this.abrirAlrededor.bind(this);
    this.setGameOver = this.setGameOver.bind(this);

  }

  generateNewGame() {
    const tablero = bombasAlrededor(generateBombs(createMatrixMinesweeper()));
    const matriz = createMatriz(8);
    const minesweeper = createBoard(matriz, tablero);
    this.setState({ minesweeper, openBox: [], tablero, gameOver: false});
  }

  abrirAlrededor(xi,xj){
    console.log(xi);
    console.log(xj);
    if(xi == 0 && xj == 0){
      this.abrirCeros(xi, xj, xi + 1, xj + 1, xi, xj);
    }
    else if(xi == 0 && (xj > 0 && xj < 7)){
      this.abrirCeros(xi, xj - 1, xi + 1, xj + 1, xi, xj);
    }
    else if(xi == 0 && xj == 7){
      this.abrirCeros(xi, xj - 1, xi + 1, xj, xi, xj);
    }
    else if(xj == 7 && (xi > 0 && xi < 7)){
      this.abrirCeros(xi - 1, xj - 1, xi + 1, xj, xi, xj);
    }
    else if(xi == 7 && xj == 7){
      this.abrirCeros(xi - 1, xj - 1, xi, xj, xi, xj);
    }
    else if(xi == 7 && (xj > 0 && xj < 7)){
      this.abrirCeros(xi - 1, xj - 1, xi, xj + 1, xi, xj);
    }
    else if(xi == 7 && xj == 0){
      this.abrirCeros(xi - 1, xj, xi, xj + 1, xi, xj);
    }
    else if(xj == 0 && (xi > 0 && xi < 7)){
      this.abrirCeros(xi - 1, xj, xi + 1, xj + 1, xi, xj);
    }else{
      this.abrirCeros(xi - 1, xj - 1, xi + 1, xj + 1, xi, xj);
    }
  }

  abrirCeros(vari,varj,fini,finj,cori,corj){
    const { openBox, tablero } = this.state;
    let array = [];
    array = array.concat(`${cori}${corj}`);
    for(var i = vari; i <= fini; i++){
          for(var j = varj; j <= finj; j++){
            if(tablero[i][j] == 0){
              if(i == cori && j == corj){
                //console.log(`${i}${j} It`s corner`);
                array = array.concat(`${i}${j}`);
              }else{
                if(tablero[i][j] == 0){
                  //console.log(`${i}${j} It`s zero`);
                  array = array.concat(`${i}${j}`);
                }
              }

            }else{
              if(tablero[i][j] == "*"){
                //console.log(`${i}${j} It´s mine`);
              }
            }
          }
      }

      return this.setState({ openBox: this.state.openBox.concat(array) });
  }

  setGameOver(){
    this.setState({ gameOver: true });
  }

  render() {
    const { minesweeper, openBox, gameOver } = this.state;

    console.log(openBox);

    const renderBoard = minesweeper.map(({ id, value, indexI, indexJ } = {}) => {
      const box = Object.is('*', value)
                ? <MdBrightnessHigh size={30} color='#C2C2C2' />
                : !Object.is(0, value)
                ? <span>{ value }</span>
                : undefined;

      const action = Object.is('*', value)
                   ? this.setGameOver
                   : () => this.abrirAlrededor(indexI, indexJ, minesweeper);

      const hideBox = openBox.includes(id) ? box : <span></span>;

      const classNameBox = !openBox.includes(id) ? 'buscaminas__item' : 'buscaminas__item buscaminas__item--open';

      const renderBox = gameOver ? box : hideBox;

      return <div className={ classNameBox } onClick={ action }>{ renderBox }</div>;
    });

    const messageGameOver = gameOver ? <div>Has perdido el juego</div> : undefined;

    return (
      <div>
        <div className='buscaminas'>
          { renderBoard }
        </div>
        <div onClick={ this.generateNewGame }>generarNuevo</div>
        { messageGameOver }
      </div>
    );
  }
}