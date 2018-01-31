import React from "react";
import global from "../../styles/global";

const Square = (props) => {
    const colors = [
        ['transparent'],
        ['red'],
        ['white'],
        ['blue'],
        ['green']
    ];
    const squareStyle = {
        zIndex: props.color == 0 ? '0' : '2',
        display: 'inline-flex',
        width: '10%',
        height: '100%',
        backgroundColor: colors[props.color],
        border: props.color == 0 ? 'none' : '1px solid black'
    };
    const squareInStyle = {
        margin: props.color == 0 ? '0px' : '4%',      
        width: props.color == 0 ? '100%' : '92%',
        height: props.color == 0 ? '100%' : '92%',
        border: props.color == 0 ? '1px solid rgba(0, 0, 0, 0.2)' : '1vh solid rgba(255, 255, 255, 0.2)',
        borderRight: props.color == 0 ? '1px solid rgba(0, 0, 0, 0.2)' : '1vh solid rgba(0, 0, 0, 0.2)',
        borderBottom: props.color == 0 ? '1px solid rgba(0, 0, 0, 0.2)' : '1vh solid rgba(0, 0, 0, 0.2)'        
    };

    return (
        <div style={squareStyle}>
            <div style={squareInStyle}></div>
        </div>
    );
};

export default Square;