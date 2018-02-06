import React from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import Square from "../../components/game/Square";
import Tetri from "../../components/game/Tetri";
import gameStyle from "../../styles/gameStyle";
import { rotatePiece, movePiece } from "../../actions/player";

export const Grid = ({ party, player, rotateit }) => {
  const grid = player.grid.map((line, i) => {
    const cols = line.map((col, j) => {
      return <Square color={col} key={j} />;
    });
    if (i == 18)
      return (
        <div style={gameStyle.line} key={i}>
          <div style={gameStyle.lineDestroying} />
          {cols}
        </div>
      );
    else
      return (
        <div style={gameStyle.line} key={i}>
          {cols}
        </div>
      );
  });

  const Calque = () => {
    //const piece = <div style={gameStyle.piece(player.piece)}><Square color={3}/></div>;
    return (
      <div style={gameStyle.calque}>
        <Tetri position={player.piece} tetri={player.piece.grid} />
      </div>
    );
  };

  return (
    <div
      tabIndex={"0"}
      onKeyDown={e => rotateit(e, player)}
      style={gameStyle.grid}
    >
      <Calque />
      {grid}
    </div>
  );
};

export const mapStateToGridProps = state => {
  return {
    party: state.party,
    player: state.player
  };
};

export const mapDispatchToGridProps = dispatch => {
  const rotateit = (event, player) => {
    event.stopPropagation();
    event.preventDefault();
    switch (event.keyCode) {
      case 39: // RIGHT
        dispatch(movePiece(1));
        break;
      case 37: // LEFT
        dispatch(movePiece(-1));
        break;
      case 40: // DOWN
        dispatch(movePiece(0));
        break;
      case 32: // SPACE
        break;
      case 38:
      case 68: // UP or D
        dispatch(rotatePiece(player, 1));
        break;
      case 65: // A
        dispatch(rotatePiece(player, -1));
        break;
      default:
        break;
    }
  };
  return { rotateit };
};

export default connect(mapStateToGridProps, mapDispatchToGridProps)(Grid);
