import {
  PLAYER_UPDATE,
  PLAYER_SAVE,
  PLAYER_GET,
  PLAYER_PIECE_ROTATE,
  PLAYER_PIECE_MOVE,
  PLAYER_CLAIM_PIECE_SUCCESS
} from "../../actionsTypes";

const testCollision = (piece, grid) => {
  let res = false;
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
          res = true;
        }
      }
    });
  });
  return res;
};

const findPlace = (piece, grid, dir) => {
  if (testCollision(piece, grid)) {
    let pos;
    if (dir > 0) {
      if (dir < piece.grid.length)
        // Peut etre un test de trop, a verifier < ou <=
        pos = findPlace({ ...piece, x: piece.x + 1 }, grid, dir + 1);
      else pos = null;
    } else {
      if (dir < piece.grid.length)
        pos = findPlace({ ...piece, x: piece.x - 1 }, grid, dir + 1);
      else pos = null;
    }
    return pos;
  } else {
    return {
      x: piece.x,
      dir: dir
    };
  }
};

const getPlayer = () => {
  const playerItem = localStorage.getItem("player");
  if (playerItem) return playerItem;

  return "";
};

const savePlayer = action => {
  localStorage.setItem("player", action.player.nickname);
};

const initPlayer_test = () => {
  let playert = { nickname: "thomas" };
  playert.piece = {
    grid: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
    grid2: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
    x: 5,
    y: 5
  };
  //player.piece.grid = Pieces.rotate(player.piece.grid, -1);
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
    [1, 1, 1, 0, 1, 1, 1, 0, 2, 2]
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
    case PLAYER_UPDATE: {
      return {
        ...state,
        ...action.player
      };
    }

    case PLAYER_SAVE: {
      savePlayer(action);
      return state;
    }

    case PLAYER_GET: {
      return {
        ...state,
        nickname: getPlayer()
      };
    }

    case PLAYER_PIECE_ROTATE: {
      let newGrid = gridZero(action.player.piece.grid.length);
      action.player.piece.grid.forEach((line, y) => {
        line.forEach((col, x) => {
          if (col != 0) {
            newGrid[
              y +
                (action.player.piece.grid.length - 1) *
                  ((1 - action.direction) / 2) +
                action.direction * x -
                y
            ][
              x +
                (action.player.piece.grid.length - 1) *
                  ((action.direction + 1) / 2) -
                x -
                y * action.direction
            ] = col;
          }
        });
      });
      const posLeft = findPlace(
        { ...state.piece, grid: newGrid },
        state.grid,
        -1
      );
      const posRight = findPlace(
        { ...state.piece, grid: newGrid },
        state.grid,
        1
      );
      let pos;
      if (posLeft === null) pos = posRight;
      else if (posRight === null) {
        pos = posLeft;
      } else {
        pos = posLeft.dir < posRight.dir ? posLeft : posRight;
      }
      console.log(pos);
      if (pos === null) {
        return state;
      } else {
        return {
          ...state,
          piece: {
            ...state.piece,
            grid: newGrid,
            ...pos
          }
        };
      }
    }

    case PLAYER_PIECE_MOVE: {
      const pos = {
        x: state.piece.x + action.direction,
        y: action.direction === 0 ? state.piece.y + 1 : state.piece.y
      };
      const res = testCollision({ ...state.piece, ...pos }, state.grid);
      if (res) return state;
      else {
        return {
          ...state,
          piece: {
            ...state.piece,
            ...pos
          }
        };
      }
    }

    case PLAYER_CLAIM_PIECE_SUCCESS: {
      return {
        ...state,
        nextPieces: state.nextPieces
          ? state.nextPieces.concat(action.pieces)
          : action.pieces
      };
    }

    default:
      return state;
  }
};

export default player;
