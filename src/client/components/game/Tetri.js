import React from "react";
import gameStyle from "../../styles/gameStyle";
import Square from "./Square";

import { isMod } from "../../reducers/game/utils";

const Line = ({ line }) => (
  <div style={{ display: "flex" }}>
    {line.map(
      (square, index) =>
        square ? (
          <Square key={index} color={square} />
        ) : (
          <div
            key={index}
            style={{
              width: "4vh",
              height: "4vh",
            }}
          />
        )
    )}
  </div>
);

const reduceColumnsEndTetri = tetri =>
  !tetri.reduce(
    (lineAccumulator, line) =>
      line.reduce(
        (blockAccumulator, block, index) =>
          index === line.length - 1 ? !!block : true
      ) || lineAccumulator,
    false
  )
    ? tetri.map(line =>
        line.filter((block, index) => index !== line.length - 1)
      )
    : tetri;

const reduceTetri = tetri => reduceColumnsEndTetri(tetri);

export const Tetri = ({ tetri, position }) => {
  return (
    <div style={gameStyle.pieces.all(position)}>
      {reduceTetri(tetri).map((line, index) => (
        <Line key={index} line={line} />
      ))}
    </div>
  );
};
