import React from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import Square from "../../components/game/Square";
import { Paragraph, Icon } from "../../components/helpers/Common";

import musicTetris from "../../../media/music.mp3";

import { Tetri } from "../../components/game/Tetri";
import gameStyle from "../../styles/gameStyle";
import globalStyle from "../../styles/global";
import {
  deleteTnt,
  testCollision,
  isLighting
} from "../../reducers/game/utils";
import { rotatePiece, movePiece, claimPiece } from "../../actions/game/pieces";
import {
  deleteLines,
  endParty,
  gridHasFocus,
  gridLoseFocus,
  notifyGridUpdate,
  tntExplode
} from "../../actions/game/board";
import { updateBoard } from "../../actions/game/board";
import { input } from "../../actions/game/inputs";
import { toggleMusic } from "../../actions/game/music";

export const MusicPlayer = ({ music, toggleSound }) => {
  return (
    <div
      onClick={toggleSound}
      style={{
        zIndex: "50000",
        position: "absolute",
        right: "10px",
        top: "10px"
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

export const FrontLayer = ({ board, piece }) =>
  board.end ? (
    <div
      style={{
        ...gameStyle.calque,
        ...gameStyle.endMessage
      }}
    >
      YOU LOSE
    </div>
  ) : (
    <div style={gameStyle.calque}>
      {piece ? <Tetri position={piece} tetri={piece.grid} /> : <div />}
    </div>
  );

export const LinesDestroying = ({ board, indexLine }) =>
  board.lines && board.lines.indexOf(indexLine) !== -1 ? (
    <div style={gameStyle.lineDestroying} />
  ) : (
    <div />
  );

export const Bomb = ({ mod, indexLine }) => (
  <div>
    {indexLine === mod.y ? (
      <div style={gameStyle.bomb.explode(mod.x, mod.y, 0)} />
    ) : (
      <div />
    )}
    <div
      style={gameStyle.bomb.explode(mod.x, mod.y, indexLine === mod.y ? 2 : 1)}
    />
  </div>
);

export const TntGoBlock = ({ indexColumn }) => (
  <div style={gameStyle.tnt.explode(indexColumn)}>
    <div style={gameStyle.tnt.anim}>
      <div style={gameStyle.tnt.base1} />
      <div style={gameStyle.tnt.base2} />
      <div style={gameStyle.tnt.circle} />
    </div>
  </div>
);

export const Mod = ({ mod, line, indexLine }) => {
  switch (mod.type) {
    case "bomb":
      return <Bomb mod={mod} indexLine={indexLine} />;

    case "tntGo": {
      return (
        <div>
          {Math.abs(mod.y - indexLine) <= 3 &&
            line.map((col, indexColumn) => {
              if (
                Math.abs(mod.y - indexLine) + Math.abs(mod.x - indexColumn) <=
                3
              ) {
                return (
                  <TntGoBlock key={indexColumn} indexColumn={indexColumn} />
                );
              }
              return <span key={indexColumn} />;
            })}
        </div>
      );
    }

    default:
      return <span />;
  }
};

export const GridContent = ({ board, mods, pieces }) => (
  <div>
    {board.grid.map((line, indexLine) => (
      <div style={{ ...gameStyle.line, position: "relative" }} key={indexLine}>
        <LinesDestroying board={board} indexLine={indexLine} />
        {Object.keys(mods)
          .map(key => <Mod key={key} mod={mods[key]} line={line} indexLine={indexLine} />)}
        {line.map(
          (column, indexColumn) =>
            column === 0 &&
            pieces.piece &&
            isLighting(board.grid, pieces.piece, indexColumn, indexLine) ? (
              <Square color={42} key={indexColumn} />
            ) : (
              <Square color={column} key={indexColumn} />
            )
        )}
      </div>
    ))}
  </div>
);

export const Grid = ({
  board,
  pieces,
  mods,
  music,
  rotateit,
  endGame,
  onFocus,
  onBlur,
  toggleSound
}) => {
  if (pieces.piece === null && board.ending && board.lines === null) {
    endGame(board);
  }

  const refCallback = ref =>
    board.hasFocusedOnce === false && ref && ref.focus();

  return (
    <div
      tabIndex={"0"}
      onKeyDown={e => rotateit(e, pieces.piece, board)}
      id="game"
      ref={refCallback}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{
        ...gameStyle.grid,
        position: "relative",
        outline: "none"
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
      <FrontLayer board={board} piece={pieces.piece} />
      <GridContent board={board} pieces={pieces} mods={mods} />
    </div>
  );
};

export const mapStateToGridProps = ({
  game: { board, pieces, mods },
  music
}) => ({
  board,
  pieces,
  mods,
  music
});

export const mapDispatchToGridProps = dispatch => ({
  toggleSound() {
    dispatch(toggleMusic());
  },
  rotateit(event, piece, board) {
    if (board.end || board.ending || piece === null) return;

    dispatch(input(event));
  },
  endGame(board) {
    dispatch(endParty({ ...board, ending: false }));
  },
  onFocus() {
    dispatch(gridHasFocus());
  },
  onBlur() {
    dispatch(gridLoseFocus());
  }
});

export default connect(mapStateToGridProps, mapDispatchToGridProps)(Grid);
