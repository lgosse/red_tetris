import React from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import Square from '../../components/game/Square';
import { Paragraph } from '../../components/helpers/Common';

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
import {
  deleteLines,
  endParty,
  gridHasFocus,
  gridLoseFocus
} from '../../actions/game/board';
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

export const Grid = ({
  party,
  board,
  pieces,
  mods,
  rotateit,
  endGame,
  onFocus,
  onBlur
}) => {
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

  const refCallback = ref =>
    board.hasFocusedOnce === false && ref && ref.focus();

  return (
    <div
      tabIndex={'0'}
      onKeyDown={e => rotateit(e, pieces.piece, board)}
      id="game"
      ref={refCallback}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{
        ...gameStyle.grid,
        outline: 'none'
      }}
    >
      {!board.focus ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            marginBottom: '-200%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}
        >
          <Paragraph gameFont size="12px" bold color="accent">
            CLICK TO PLAY
          </Paragraph>
        </div>
      ) : (
        <div />
      )}

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
        event.preventDefault();
        event.stopPropagation();
        break;
      case 37: // LEFT
        dispatch(movePiece(-1));
        event.preventDefault();
        event.stopPropagation();
        break;
      case 40: // DOWN
        dispatch(movePiece(0));
        event.preventDefault();
        event.stopPropagation();
        break;
      case 32: // SPACE
        break;
      case 38:
      case 68: // UP or D
        dispatch(rotatePiece(1));
        event.preventDefault();
        event.stopPropagation();
        break;
      case 65: // A
        dispatch(rotatePiece(-1));
        event.preventDefault();
        event.stopPropagation();
        break;
      case 69: // E
        endGame(board);
        event.preventDefault();
        event.stopPropagation();
        break;
      default:
        break;
    }
  };

  const endGame = board => {
    dispatch(endParty({ ...board, ending: false }));
  };

  const onFocus = () => dispatch(gridHasFocus());
  const onBlur = () => dispatch(gridLoseFocus());

  return { rotateit, endGame, onFocus, onBlur };
};

export default connect(mapStateToGridProps, mapDispatchToGridProps)(Grid);
