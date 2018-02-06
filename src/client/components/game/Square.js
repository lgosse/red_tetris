import React from "react";
import global from "../../styles/global";
import gameStyle from "../../styles/gameStyle";

const Square = ({ color }) => (
  <div style={gameStyle.square(color)}>
    <div style={gameStyle.squareIn(color)} />
  </div>
);

export default Square;
