import React, { Component } from 'react';
import { MdBrightnessHigh } from 'react-icons/lib/md';
import { v4 } from 'uuid';
import {
  createMatrixMinesweeper,
  generateBombs,
  bombsAround,
  createMatrixBoard,
  createBoard,
  openAround
} from './minesweeper-data';

export default class Minesweeper extends Component {

  constructor(){
    super();

    const matrixMinesWeeper = bombsAround(generateBombs(createMatrixMinesweeper()));
    const matrixBoard = createMatrixBoard(8);
    const minesweeper = createBoard(matrixBoard, matrixMinesWeeper);

    this.state = {
      minesweeper,
      openBox: [],
      matrixMinesWeeper,
      gameOver: false,
    };

    this.generateNewGame = this.generateNewGame.bind(this);
    this.openAround = this.openAround.bind(this);
    this.setGameOver = this.setGameOver.bind(this);

  }

  generateNewGame() {
    const matrixMinesWeeper = bombsAround(generateBombs(createMatrixMinesweeper()));
    const matrixBoard = createMatrixBoard(8);
    const minesweeper = createBoard(matrixBoard, matrixMinesWeeper);
    this.setState({ minesweeper, openBox: [], matrixMinesWeeper, gameOver: false});
  }

  openAround(xi,xj){
    if(xi == 0 && xj == 0){
      this.openZeros(xi, xj, xi + 1, xj + 1, xi, xj);
    }
    else if(xi == 0 && (xj > 0 && xj < 7)){
      this.openZeros(xi, xj - 1, xi + 1, xj + 1, xi, xj);
    }
    else if(xi == 0 && xj == 7){
      this.openZeros(xi, xj - 1, xi + 1, xj, xi, xj);
    }
    else if(xj == 7 && (xi > 0 && xi < 7)){
      this.openZeros(xi - 1, xj - 1, xi + 1, xj, xi, xj);
    }
    else if(xi == 7 && xj == 7){
      this.openZeros(xi - 1, xj - 1, xi, xj, xi, xj);
    }
    else if(xi == 7 && (xj > 0 && xj < 7)){
      this.openZeros(xi - 1, xj - 1, xi, xj + 1, xi, xj);
    }
    else if(xi == 7 && xj == 0){
      this.openZeros(xi - 1, xj, xi, xj + 1, xi, xj);
    }
    else if(xj == 0 && (xi > 0 && xi < 7)){
      this.openZeros(xi - 1, xj, xi + 1, xj + 1, xi, xj);
    }else{
      this.openZeros(xi - 1, xj - 1, xi + 1, xj + 1, xi, xj);
    }
  }

  openZeros(vari,varj,fini,finj,cori,corj){
    const { openBox, matrixMinesWeeper } = this.state;
    let array = [];
    array = array.concat(`${cori}${corj}`);
    for(var i = vari; i <= fini; i++){
          for(var j = varj; j <= finj; j++){
            if(matrixMinesWeeper[i][j] == 0){
              if(i == cori && j == corj){       //It`s corner
                array = array.concat(`${i}${j}`);
              }else{
                if(matrixMinesWeeper[i][j] == 0){      //It`s zero
                  array = array.concat(`${i}${j}`);
                }
              }
            }else{
              if(matrixMinesWeeper[i][j] == "*"){       //It´s mine
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
                   : () => this.openAround(indexI, indexJ);

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