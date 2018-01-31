import React from "react";
import { connect } from "react-redux";
import styled, { keyframes } from 'styled-components';
import Square from "../../components/game/Square";

export const Grid = ({party, player}) => {
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

    const lineStyle = {
        height: '5%',
        display:'flex',
        justifyContent: 'stretch',
    };

    const pulse = keyframes`
        from {
            background-color: transparent;
        }
        to {
            background-color: rgba(255, 255, 0, 0.7);
        }
    `;

    const Flash = styled.div`
        z-index: 500;
        position: absolute;
        height: 4vh;
        width: 40vh;
        background-color: transparent;
        animation: ${pulse} 0.3s infinite;
        animation-direction: alternate;
    `;

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
            return <div style={lineStyle} key={i} ><Flash />{cols}</div>;
        else
            return <div style={lineStyle} key={i} >{cols}</div>;        
    });

    const styleGrid = {
        boxShadow: '0px 0px 40px black inset',
        height: '80vh',
        minHeight: '80vh',
        width: '40vh',
        minWidth: '40vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    };

    return (
        <div style={styleGrid}>
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