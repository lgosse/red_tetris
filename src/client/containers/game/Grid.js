import React from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import Square from '../../components/game/Square';
import { Paragraph, Icon } from '../../components/helpers/Common';

import musicTetris from '../../../media/music.mp3';

import { Tetri, Bomb } from '../../components/game/Tetri';
import gameStyle from '../../styles/gameStyle';
import globalStyle from '../../styles/global';
import {
  deleteTnt,
  testCollision,
  isLighting
} from '../../reducers/game/utils';
import { rotatePiece, movePiece, claimPiece } from '../../actions/game/pieces';
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
import { toggleMusic } from '../../actions/game/music';

const MusicPlayer = ({ music, toggleSound }) => {
  return (
    <div
      onClick={toggleSound}
      style={{
        zIndex: '50000',
        position: 'absolute',
        right: '10px',
        top: '10px'
      }}
    >
      <Icon
        className="music"
        size="30px"
        clickable
        primary={!music}
        accent={music}
      />
      <audio src={musicTetris} muted={!music} autoPlay loop />
    </div>
  );
};

const Calque = ({ board, piece }) => {
  if (board.end === true) {
    return (
      <div
        style={{
          ...gameStyle.calque,
          ...gameStyle.endMessage
        }}
      >
        YOU LOSE
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
  music,
  rotateit,
  endGame,
  tntExplodeDispatch,
  onFocus,
  onBlur,
  toggleSound
}) => {
  const grid = board.grid.map((line, i) => {
    const cols = line.map((col, j) => {
      if (
        col === 0 &&
        pieces.piece &&
        isLighting(board.grid, pieces.piece, j, i)
      )
        return <Square color={42} key={j} />;
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
        position: 'relative',
        outline: 'none'
      }}
    >
      <MusicPlayer music={music} toggleSound={toggleSound} />

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
  game: { board, pieces, mods },
  music
}) => ({
  party,
  board,
  pieces,
  mods,
  music
});

export const mapDispatchToGridProps = dispatch => {
  const tntExplodeDispatch = (grid, mod) => {
    dispatch(tntExplode(grid, mod));
  };

  const toggleSound = () => {
    dispatch(toggleMusic());
  };

  const rotateit = (event, piece, board) => {
    if (board.end || board.ending || piece === null) return;

    dispatch(input(event));
  };

  const endGame = board => {
    dispatch(endParty({ ...board, ending: false }));
  };

  const onFocus = () => dispatch(gridHasFocus());
  const onBlur = () => dispatch(gridLoseFocus());

  return {
    rotateit,
    endGame,
    tntExplodeDispatch,
    onFocus,
    onBlur,
    toggleSound
  };
};

export default connect(mapStateToGridProps, mapDispatchToGridProps)(Grid);
