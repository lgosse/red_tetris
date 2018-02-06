import React from "react";
import gameStyle from "../../styles/gameStyle";
import Square from "./Square";

const Line = ({ line }) => (
  <div style={{ display: "flex", width: "100px" }}>
    {line.map(
      (square, index) =>
        square ? (
          <Square key={index} color={square} />
        ) : (
          <div
            key={index}
            style={{
              width: "4vh",
              height: "4vh"
            }}
          />
        )
    )}
  </div>
);

const Tetri = ({ tetri, position }) => (
  <div style={gameStyle.pieces.all(position)}>
    {tetri.map((line, index) => <Line key={index} line={line} />)}
  </div>
);

export default Tetri;
