import {
  PLAYER_UPDATE,
  PLAYER_SAVE,
  PLAYER_GET,
  PLAYER_PIECE_ROTATE,
  PLAYER_PIECE_MOVE,
  PLAYER_DELETE_LINES,
} from '../../actionsTypes';

const testCollision = (piece, grid) => {
  let collisionLocation = 0;
  let collision = false;
  piece.grid.forEach((line, y) => {
    line.forEach((col, x) => {
      if (col !== 0) {
        let pos = {
          x: x + piece.x,
          y: y + piece.y,
        };
        if (pos.x < 0 || pos.x >= grid[0].length || pos.y < 0 || pos.y >= grid.length || grid[pos.y][pos.x] !== 0) {
          if (x <= parseInt((piece.grid.length - 1) / 2)) collisionLocation--;
          if (x >= parseInt(piece.grid.length / 2)) collisionLocation++;
          collision = true;
        }
      }
    });
  });
  return { collide: collision, location: collisionLocation };
};

const checkLines = grid => {
  let lines = [];
  grid.forEach((line, y) => {
    let i = 0;
    line.forEach((col, x) => {
      if (col !== 0) i++;
    });
    if (i === grid[0].length) {
      lines.push(y);
    }
  });
  if (lines.length === 0) return null;
  return lines;
};

const deleteLines = (grid, lines) => {
  let newGrid = [];
  let y;
  let cur = grid.length - 1;
  for (y = grid.length - 1; y >= 0; y--) {
    let i;
    if ((i = lines.indexOf(y)) === -1) {
      newGrid[cur] = [...grid[y]];
      lines[i] = -1;
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
  console.log(newGrid);
  return newGrid;
};

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

const gridFusion = (piece, grid) => {
  let newGrid = [...grid];
  piece.grid.forEach((line, y) => {
    line.forEach((col, x) => {
      if (col != 0) {
        if (y + piece.y < 0) return null;
        newGrid[y + piece.y][x + piece.x] = col;
      }
    });
  });
  return newGrid;
};

const findPlace = (piece, grid, dir) => {
  if (dir > piece.grid.length / 2 || dir < -piece.grid.length / 2) return null;
  let test;
  if ((test = testCollision(piece, grid)).collide) {
    let pos;
    if (dir < 0 || (dir === 0 && test.location > 0)) {
      pos = findPlace({ ...piece, x: piece.x - 1 }, grid, dir - 1);
    } else if (dir > 0 || (dir === 0 && test.location < 0)) pos = findPlace({ ...piece, x: piece.x + 1 }, grid, dir + 1);
    else {
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
    };
  }
};

const getPlayer = () => {
  const playerItem = localStorage.getItem('player');
  if (playerItem) return playerItem;

  return '';
};

const savePlayer = action => {
  localStorage.setItem('player', action.player.nickname);
};

const initPlayer_test = () => {
  let playert = { nickname: 'thomas' };
  playert.piece = {
    grid: [[5, 5, 0], [0, 5, 5], [0, 0, 0]],
    grid2: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
    x: 5,
    y: 5,
    end: false,
  };

  // player.piece.grid = Pieces.rotate(player.piece.grid, -1);
  playert.grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 4],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 4],
    [0, 1, 0, 0, 1, 1, 1, 2, 2, 4],
    [1, 1, 1, 0, 1, 1, 1, 0, 2, 2],
  ];
  return playert;
};

const gridZero = size => {
  let grid = [];
  let i, j;
  for (i = 0; i < size; i++) {
    grid[i] = [];
    for (j = 0; j < size; j++) {
      grid[i][j] = 0;
    }
  }
  return grid;
};

const player = (state = initPlayer_test(), action) => {
  switch (action.type) {
  case PLAYER_UPDATE:
    return {
      ...state,
      ...action.player,
    };
  case PLAYER_SAVE: {
    savePlayer(action);
    return state;
  }
  case PLAYER_GET:
    return {
      ...state,
      nickname: getPlayer(),
    };

  case PLAYER_PIECE_ROTATE: {
    let newGrid = gridZero(action.player.piece.grid.length);
    action.player.piece.grid.forEach((line, y) => {
      line.forEach((col, x) => {
        if (col != 0) {
          newGrid[y + (action.player.piece.grid.length - 1) * ((1 - action.direction) / 2) + action.direction * x - y][
              x + (action.player.piece.grid.length - 1) * ((action.direction + 1) / 2) - x - y * action.direction
            ] = col;
        }
      });
    });
    const pos = findPlace({ ...state.piece, grid: newGrid }, state.grid, 0);
    if (pos === null) {
      return state;
    } else {
      return {
        ...state,
        piece: {
          ...state.piece,
          grid: newGrid,
          ...pos,
        },
      };
    }
  }

  case PLAYER_DELETE_LINES: {
    console.log('OK');
    if (state.lines !== null) {
      const newGrid = deleteLines(state.grid, state.lines);
      return {
        ...state,
        grid: newGrid,
        lines: null,
      };
    }
    return state;
  }

  case PLAYER_PIECE_MOVE: {
    const pos = {
      x: state.piece.x + action.direction,
      y: action.direction === 0 ? state.piece.y + 1 : state.piece.y,
    };
    const res = testCollision({ ...state.piece, ...pos }, state.grid);
    if (res.collide) {
      if (action.direction === 0) {
        let newGrid = gridFusion(state.piece, state.grid);
        let lines = checkLines(newGrid);

          /*
        let newPiece = {
          grid: [[5, 5, 0], [0, 5, 5], [0, 0, 0]],
          x: 5,
          y: 0,
        }; piece: claimPiece();
          */
        if (newGrid === null) return { ...state, piece: null, lines, ending: true };

          // testCollision(newPiece, newGrid).collide
        return {
          ...state,
          grid: newGrid,
          piece: null,
          lines,
        };
      } else return state;
    } else {
      return {
        ...state,
        piece: {
          ...state.piece,
          ...pos,
        },
      };
    }
  }

  default:
    return state;
  }
};

export default player;
