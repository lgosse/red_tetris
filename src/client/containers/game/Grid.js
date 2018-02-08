import React from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import Square from '../../components/game/Square';

// import Pieces from '../../components/game/Pieces';
import { Tetri, Bomb } from '../../components/game/Tetri';
import gameStyle from '../../styles/gameStyle';
import globalStyle from '../../styles/global';
import {
  rotatePiece,
  movePiece,
  updatePlayer,
  claimPiece
} from '../../actions/game/pieces';
import { deleteLines, endParty } from '../../actions/game/board';
import { updateBoard } from '../../actions/game/board';
import { setMod } from '../../actions/game/mods';

const Calque = ({ board, piece }) => {
  if (board.end === true) {
    return (
      <div
        style={{
          ...gameStyle.calque,
          textAlign: 'center',
          marginTop: '35vh',
          fontSize: '5vh',
          fontFamily: globalStyle.font.family.game,
          color: 'white'
        }}
      >
        YOU LOOSE
      </div>
    );
  } else if (!piece) {
    return <div />;
  } else {
    return (
      <div style={gameStyle.calque}>
        <Tetri position={piece} tetri={piece.grid} />
      </div>
    );
  }
};

export const Grid = ({ party, board, pieces, mods, rotateit, endGame }) => {
  const grid = board.grid.map((line, i) => {
    const cols = line.map((col, j) => {
      return <Square color={col} key={j} />;
    });

    if (mods) {
      switch (mods.type) {
        case 'bomb': {
          return (
            <div style={gameStyle.line} key={i}>
              <div style={gameStyle.bomb(mods.x, mods.y)} />
              {cols}
            </div>
          );
          break;
        }
        default:
          break;
      }
    }

    if (board.lines && board.lines.indexOf(i) !== -1) {
      return (
        <div style={gameStyle.line} key={i}>
          <div style={gameStyle.lineDestroying} />
          {cols}
        </div>
      );
    } else
      return (
        <div style={gameStyle.line} key={i}>
          {cols}
        </div>
      );
  });

  if (pieces.piece === null && board.ending && board.lines === null) {
    endGame(board);
  }

  return (
    <div
      tabIndex={'0'}
      onKeyDown={e => rotateit(e, pieces.piece, board)}
      style={gameStyle.grid}
    >
      <Calque board={board} piece={pieces.piece} />
      {grid}
    </div>
  );
};

export const mapStateToGridProps = ({
  party,
  game: { board, pieces },
  mods
}) => ({
  party,
  board,
  pieces,
  mods
});

export const mapDispatchToGridProps = dispatch => {
  const rotateit = (event, piece, board) => {
    if (board.end || board.ending || piece === null) return;

    switch (event.keyCode) {
      case 39: // RIGHT
        dispatch(movePiece(1));
        event.stopPropagation();
        event.preventDefault();
        break;
      case 37: // LEFT
        dispatch(movePiece(-1));
        event.stopPropagation();
        event.preventDefault();
        break;
      case 40: // DOWN
        dispatch(movePiece(0));
        event.stopPropagation();
        event.preventDefault();
        break;
      case 32: // SPACE
        break;
      case 38:
      case 68: // UP or D
        dispatch(rotatePiece(1));
        event.stopPropagation();
        event.preventDefault();
        break;
      case 65: // A
        dispatch(rotatePiece(-1));
        event.stopPropagation();
        event.preventDefault();
        break;
      case 69: // E
        endAnimation(board);
        event.stopPropagation();
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  const endGame = board => {
    dispatch(endParty({ ...board, ending: false }));
  };

  // const endAnimationSub = (board, grid, x, y) => {
  //   while (x >= 0) {
  //     grid[grid.length - 1 - y][grid[0].length - 1 - x] = 8;
  //     grid[y][x] = 8;
  //     x--;
  //     y--;
  //   }
  //   return grid;
  // };

  // const endAnimation = board => {
  //   let newGrid = [...board.grid];
  //   let newBoard = { ...board, grid: newGrid };
  //   let x = 0;
  //   let y = board.grid.length - 1;
  //   let interval = setInterval(() => {
  //     newBoard = { ...newBoard, grid: endAnimationSub(board, newGrid, x, y) };
  //     dispatch(updateBoard(newBoard));
  //     x++;
  //     if (x === board.grid[0].length) {
  //       y--;
  //       x--;
  //     }
  //     if (y < board.grid.length / 2) clearInterval(interval);
  //   }, 100);
  // };

  return { rotateit, endGame };
};

export default connect(mapStateToGridProps, mapDispatchToGridProps)(Grid);
