import React from "react";
import global from "../../styles/global";
import gameStyle from "../../styles/gameStyle";

const Square = (props) => {
    return (
        <div style={gameStyle.square(props.color)}>
            <div style={gameStyle.squareIn(props.color)}></div>
        </div>
    );
};

export default Square;