import React from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import Square from '../../components/game/Square';
import { Paragraph } from '../../components/helpers/Common';

import { Tetri, Bomb } from '../../components/game/Tetri';
import gameStyle from '../../styles/gameStyle';
import globalStyle from '../../styles/global';
import { deleteTnt } from '../../reducers/game/utils';
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
  gridLoseFocus,
  notifyGridUpdate,
  tntExplode
} from '../../actions/game/board';
import { updateBoard } from '../../actions/game/board';
import { setMod } from '../../actions/game/mods';
import { input } from '../../actions/game/inputs';

const Calque = ({ board, piece }) => {
  if (board.end === true) {
    return (
      <div
        style={{
          ...gameStyle.calque,
          ...gameStyle.endMessage
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
  tntExplodeDispatch,
  onFocus,
  onBlur
}) => {
  const grid = board.grid.map((line, i) => {
    const cols = line.map((col, j) => {
      return <Square color={col} key={j} />;
    });

    const linesDestroying =
      board.lines && board.lines.indexOf(i) !== -1 ? (
        <div style={gameStyle.lineDestroying} />
      ) : null;

    const mod = () => {
      if (mods) {
        switch (mods.type) {
          case 'bomb': {
            return (
              <div>
                {i === mods.y ? (
                  <div style={gameStyle.bomb.explode(mods.x, mods.y, 0)} />
                ) : (
                  <div />
                )}
                <div
                  style={gameStyle.bomb.explode(
                    mods.x,
                    mods.y,
                    i === mods.y ? 2 : 1
                  )}
                />
              </div>
            );
            break;
          }

          case 'tntGo': {
            let tnt = [];
            if (Math.abs(mods.y - i) <= 3) {
              line.map((col, j) => {
                if (Math.abs(mods.y - i) + Math.abs(mods.x - j) <= 3)
                  tnt.push(
                    <div key={i + '' + j} style={gameStyle.tnt.explode(j)}>
                      <div style={gameStyle.tnt.anim}>
                        <div style={gameStyle.tnt.base1} />
                        <div style={gameStyle.tnt.base2} />
                        <div style={gameStyle.tnt.circle} />
                      </div>
                    </div>
                  );
              });
            }
            return tnt;
            break;
          }

          default:
            return null;
            break;
        }
      } else return null;
    };

    return (
      <div style={{ ...gameStyle.line, position: 'relative' }} key={i}>
        {linesDestroying}
        {mod()}
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
        <div style={gameStyle.focusMessage}>
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
  game: { board, pieces, mods }
}) => ({
  party,
  board,
  pieces,
  mods
});

export const mapDispatchToGridProps = dispatch => {
  const tntExplodeDispatch = (grid, mod) => {
    dispatch(tntExplode(grid, mod));
  };

  const rotateit = (event, piece, board) => {
    if (board.end || board.ending || piece === null) return;

    dispatch(input(event));
    // switch (event.keyCode) {
    //   case 39: // RIGHT
    //     dispatch(movePiece(1));
    //     event.preventDefault();
    //     event.stopPropagation();
    //     break;
    //   case 37: // LEFT
    //     dispatch(movePiece(-1));
    //     event.preventDefault();
    //     event.stopPropagation();
    //     break;
    //   case 40: // DOWN
    //     dispatch(movePiece(0));
    //     event.preventDefault();
    //     event.stopPropagation();
    //     break;
    //   case 32: // SPACE
    //     dispatch(movePiece(20));
    //     event.stopPropagation();
    //     event.preventDefault();
    //     break;
    //   case 38:
    //   case 68: // UP or D
    //     dispatch(rotatePiece(1));
    //     event.preventDefault();
    //     event.stopPropagation();
    //     break;
    //   case 65: // A
    //     dispatch(rotatePiece(-1));
    //     event.preventDefault();
    //     event.stopPropagation();
    //     break;
    //   case 69: // E
    //     endGame(board);
    //     event.preventDefault();
    //     event.stopPropagation();
    //     break;
    //   default:
    //     break;
    // }
  };

  const endGame = board => {
    dispatch(endParty({ ...board, ending: false }));
  };

  const onFocus = () => dispatch(gridHasFocus());
  const onBlur = () => dispatch(gridLoseFocus());

  return { rotateit, endGame, tntExplodeDispatch, onFocus, onBlur };
};

export default connect(mapStateToGridProps, mapDispatchToGridProps)(Grid);
