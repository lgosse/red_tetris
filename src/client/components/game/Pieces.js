import React from "react";
import Square from "./Square";
import gameStyle from "../../styles/gameStyle";

const gridZero = (size) => {
    let grid = [];
    let i, j;
    for (i = 0; i < size; i++) {
        grid[i] = [];
        for (j = 0; j < size; j++) {
            grid[i][j] = 0;
        }
    }
    return grid;
}

const Pieces = {
    draw: (grid) => {
        let color = null;
        let squares = [];
        let key = 0;
        grid.forEach((line, y) => {
            line.forEach((col, x) => {
                if (col !== 0) {
                    if (color === null)
                        color = 't' + col;
                    squares.push(<div key={key++} style={gameStyle.piece({x: x, y: y})}><Square color={col} /></div>);
                }
            });
        });
        return (
            <div style={gameStyle.pieces[color]}>{squares}</div>
        );
    },
    rotate: (grid, dir) => {
        let newGrid = gridZero(grid.length);
        grid.forEach((line, y) => {
            line.forEach((col, x) => {
                if (col != 0) {
                    newGrid[y + (grid.length - 1) * ((1 - dir) / 2) + (dir * x) - y][x + (grid.length - 1) * ((dir + 1) / 2) - x - (y * dir)] = col;
                }
            });
        });
        return (newGrid);
    }
};

export default Pieces;