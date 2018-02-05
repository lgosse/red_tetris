import React from 'react';
import Square from './Square';
import gameStyle from '../../styles/gameStyle';

const Pieces = props => {
  let color = null;
  let squares = [];
  let key = 0;
  props.grid.forEach((line, y) => {
    line.forEach((col, x) => {
      if (col !== 0) {
        if (color === null) color = 't' + col;
        squares.push(
          <div key={key++} style={gameStyle.piece({ x, y })}>
            <Square color={col} />
          </div>
        );
      }
    });
  });
  return <div style={{ ...gameStyle.pieces[color], ...gameStyle.pieces.all(props.position) }}>{squares}</div>;
};

export default Pieces;
