import React from "react";
import { connect } from "react-redux";
import styled, { keyframes } from 'styled-components';
import Square from "../../components/game/Square";
import gameStyle from "../../styles/gameStyle";

export const Grid = ({party, player}) => {
    player.pgitiece = {
        x: 5,
        y: 5
    }
    player.grid = [
        [0,0,0,0,0, 0,0,0,0,0],
        [0,0,0,0,0, 0,0,0,0,0],
        [0,0,0,0,0, 0,0,0,0,0],
        [0,0,0,0,0, 0,0,0,0,0],
        [0,0,0,0,0, 0,0,0,0,0],
        [0,0,0,0,0, 0,0,0,0,0],
        [0,0,0,0,0, 0,0,0,0,0],
        [0,0,0,0,0, 0,0,0,0,0],
        [0,0,0,0,0, 0,0,0,0,0],
        [0,0,0,0,0, 0,0,0,0,0],

        [0,0,0,0,0, 0,0,0,0,0],
        [0,0,0,0,0, 0,0,0,0,0],
        [0,0,0,0,0, 0,0,0,0,0],
        [0,0,0,0,0, 0,0,0,0,0],
        [0,0,0,0,0, 0,0,0,0,0],
        [0,0,0,0,0, 0,0,0,0,4],
        [0,0,0,0,0, 0,1,0,0,4],
        [0,0,0,0,0, 0,1,0,0,4],
        [0,1,0,0,1, 1,1,2,2,4],
        [1,1,1,0,1, 1,1,0,2,2],        
    ];

    const grid = player.grid.map((line, i) => {
        const cols = line.map((col, j) => {
            return (
            <Square
                color={col}
                key={j}
            />
            );
        });
        if (i == 18)
            return <div style={gameStyle.line} key={i} ><div style={gameStyle.lineDestroying}></div>{cols}</div>;
        else
            return <div style={gameStyle.line} key={i} >{cols}</div>;        
    });

    const Calque = () => {
        const piece = <div style={gameStyle.piece(player)}><Square color={3}/></div>;
        return <div style={gameStyle.calque}>{piece}</div>;
    }
    
    return (
        <div style={gameStyle.grid}>
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
    return {};
};
  
export default connect(mapStateToGridProps, mapDispatchToGridProps)(
    Grid
);