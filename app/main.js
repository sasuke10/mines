import React from 'react';
import Minesweeper from 'views/minesweeper/Minesweeper';
import { render } from 'react-dom';
import 'sass/minesweeper.scss';

render(
  <Minesweeper />,
  document.querySelector('.app')
);
