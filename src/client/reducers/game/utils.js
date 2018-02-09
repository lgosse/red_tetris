export const gridZero = (sizeX, sizeY) =>
  [...Array(sizeY ? sizeY : sizeX)].map(() => [...Array(sizeX)].map(() => 0));

const calcWeight = grid => {
  let weight = 0;
  grid.forEach((line, y) => {
    line.forEach((col, x) => {
      if (col !== 0) weight += x - parseInt(grid.length / 2);
    });
  });
  if (weight > 0) weight = -1;
  else if (weight < 0) weight = 1;
  return weight;
};

export const testCollision = (piece, grid) => {
  let collisionLocation = 0;
  let collision = false;

  piece.grid.forEach((line, y) => {
    line.forEach((col, x) => {
      if (col !== 0) {
        let pos = {
          x: x + piece.x,
          y: y + piece.y
        };
        if (
          pos.x < 0 ||
          pos.x >= grid[0].length ||
          pos.y < 0 ||
          pos.y >= grid.length ||
          grid[pos.y][pos.x] !== 0
        ) {
          if (x <= parseInt((piece.grid.length - 1) / 2)) collisionLocation--;
          if (x >= parseInt(piece.grid.length / 2)) collisionLocation++;
          collision = true;
        }
      }
    });
  });
  return { collide: collision, location: collisionLocation };
};

export const gridFusion = (piece, grid) => {
  let newGrid = [...grid];

  if (testCollision(piece, grid).collide) return null;
  piece.grid.forEach((line, y) => {
    line.forEach((col, x) => {
      if (col != 0) {
        newGrid[y + piece.y][x + piece.x] = col;
      }
    });
  });

  return newGrid;
};

export const checkLines = grid => {
  let lines = [];
  grid.forEach((line, y) => {
    let i = 0;
    line.forEach((col, x) => {
      if (col > 0 && col < 10) i++;
    });
    if (i === grid[0].length) {
      lines.push(y);
    }
  });

  if (lines.length === 0) return null;

  return lines;
};

export const deleteLinesF = (grid, lines) => {
  let newGrid = [];
  let newLines = [...lines];
  let y;
  let cur = grid.length - 1;
  for (y = grid.length - 1; y >= 0; y--) {
    let i;
    if ((i = newLines.indexOf(y)) === -1) {
      newGrid[cur] = [...grid[y]];
      newLines[i] = -1;
      cur--;
    }
  }
  while (cur >= 0) {
    newGrid[cur] = [];
    for (y = 0; y < grid[0].length; y++) {
      newGrid[cur].push(0);
    }
    cur--;
  }

  return newGrid;
};

export const isMod = piece => {
  const modTypes = {
    "10": "bomb"
  };
  let type = -1;
  piece.grid.findIndex(elem => {
    return (
      -1 !=
      elem.findIndex(value => {
        if (value >= 10) type = value;
        return value >= 10;
      })
    );
  });
  if (type != -1)
    return { type: modTypes[type], do: false, x: piece.x, y: piece.y };
  else return null;
};

export const deleteBomb = (mod, grid) => {
  if (!mod) return grid;
  let newGrid = deleteLinesF(grid, [mod.y]);
  newGrid.forEach((line, i) => {
    newGrid[i][mod.x] = 0;
  });
  return newGrid;
};

export const findPlace = (piece, grid, dir) => {
  if (dir > piece.grid.length / 2 || dir < -piece.grid.length / 2) return null;
  let test;
  if ((test = testCollision(piece, grid)).collide) {
    let pos;
    if (dir < 0 || (dir === 0 && test.location > 0)) {
      pos = findPlace({ ...piece, x: piece.x - 1 }, grid, dir - 1);
    } else if (dir > 0 || (dir === 0 && test.location < 0)) {
      pos = findPlace({ ...piece, x: piece.x + 1 }, grid, dir + 1);
    } else {
      let weight;
      if (dir == 0 && (weight = calcWeight(piece.grid)) != 0) {
        test = testCollision({ ...piece, x: piece.x + weight }, grid);
        if (test.collide) pos = null;
        else pos = { x: piece.x + weight };
      } else pos = null;
    }
    return pos;
  } else {
    return {
      x: piece.x,
      dir
    };
  }
};
